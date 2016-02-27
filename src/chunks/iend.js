// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';


/**
 * IEND (Image trailer) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11IEND
 * @implements {ChunkInterface}
 */
export default class IEND extends ChunkInterface {
    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('IEND');
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength();
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        return new ArrayBuffer(0);
    }

    /**
     * factory method that create `IEND` from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {IEND}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength !== 0) {
            throw new PNGError('invalid byte length for IEND chunk');
        }
        return new IEND();
    }
}
