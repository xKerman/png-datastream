// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';


/**
 * IDAT (Image data) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11IDAT
 * @implements {ChunkInterface}
 */
export default class IDAT extends ChunkInterface {
    /**
     * @public
     * @param {ArrayBuffer} aData
     */
    constructor(aData) {
        super();
        /**
         * @private
         * @type {ArrayBuffer}
         */
        this._data = aData;
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('IDAT');
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() + this.data.byteLength;
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
     * factory method that create `IDAT` from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {IDAT}
     */
    static fromArrayBuffer(aBuffer) {
        return new IDAT(aBuffer);
    }
}
