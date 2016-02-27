// -*- coding: utf-8 -*-

import { Zlib } from 'zlibjs/bin/crc32.min.js';

import ChunkInterface from './chunkinterface.js';
import ChunkType from './chunktype.js';
import PNGError from './pngerror.js';


const MAX_DATA_LEN = Math.pow(2, 31) - 1;

/**
 * PNG chunk defined in the spec
 *
 * this class is used to represent unknown (or not implemented) PNG chunk
 *
 * @see https://www.w3.org/TR/PNG/#5Chunk-layout
 * @implements {ChunkInterface}
 */
export default class Chunk extends ChunkInterface {
    /**
     * create `Chunk` for given `aType` and `aData`
     * @example
     * const chunk = new Chunk(new ChunkType('IEND'), new ArrayBuffer(0));
     *
     * @public
     * @param {ChunkType} aType
     * @param {ArrayBuffer} aData
     */
    constructor(aType, aData) {
        super();
        this.setType(aType);
        this.setData(aData);
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return this._type;
    }

    /**
     * @public
     * @type {ArrayBuffer}
     */
    get data() {
        return this._data;
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        return this._data;
    }

    /**
     * @private
     * @param {ChunkType} aType
     */
    setType(aType) {
        if (!(aType instanceof ChunkType)) {
            throw new PNGError(`got invalid chunk type: ${ aType }`);
        }
        /**
         * @private
         * @type {ChunkType}
         */
        this._type = aType;
    }

    /**
     * @private
     * @param {ArrayBuffer} aData
     */
    setData(aData) {
        if (!(aData instanceof ArrayBuffer)) {
            throw new PNGError('got unexpected chunk data type');
        }
        if (aData.byteLength > MAX_DATA_LEN) {
            throw new PNGError('chunk data is too long');
        }
        /**
         * @private
         * @type {ArrayBuffer}
         */
        this._data = aData;
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() + this.data.byteLength;
    }

    /**
     * factory method that create `Chunk` from given `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {Chunk}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength < Chunk.emptyChunkLength()) {
            throw new PNGError('invalid byte length for chunk');
        }
        let offset = 0;
        const view = new DataView(aBuffer);
        const length = view.getUint32(offset);
        offset += ChunkInterface.LENGTH_PART_BYTES;

        const typeBytes = [
            view.getUint8(offset + 0),
            view.getUint8(offset + 1),
            view.getUint8(offset + 2),
            view.getUint8(offset + 3)
        ];
        const type = typeBytes
                  .map(byte => String.fromCharCode(byte))
                  .join('');
        offset += ChunkInterface.TYPE_PART_BYTES;

        if (aBuffer.byteLength < Chunk.emptyChunkLength() + length) {
            throw new PNGError('invalid byte length for chunk');
        }
        const data = aBuffer.slice(offset, offset + length);
        offset += length;
        const crc = view.getUint32(offset);
        const actual = Zlib.CRC32.update(
            new Uint8Array(data),
            Zlib.CRC32.calc(typeBytes)
        );
        if (crc !== actual) {
            throw new PNGError(`checksum error at ${ offset }, expected: ${ crc }, got: ${ actual }`);
        }

        return new Chunk(new ChunkType(type), data);
    }

    /**
     * return chunk length whose data is empty
     *
     * @private
     * @return {number}
     */
    static emptyChunkLength() {
        return (new Chunk(new ChunkType('IEND'), new ArrayBuffer(0))).length;
    }
}
