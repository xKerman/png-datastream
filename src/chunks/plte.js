// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';
import RGB from '../rgb.js';


/**
 * PLTE (Palette) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11PLTE
 * @implements {ChunkInterface}
 */
export default class PLTE extends ChunkInterface {
    /**
     * @public
     * @param {Array<RGB>} aTable
     */
    constructor(aTable) {
        super();
        /**
         * @private
         * @type {Array<RGB>}
         */
        this._table = aTable;
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('PLTE');
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() + this.table.length * 3;
    }

    /**
     * return palette table
     *
     * @public
     * @type {Array<RGB>}
     */
    get table() {
        return this._table;
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const len = this.table.length;
        const buffer = new ArrayBuffer(len * 3);
        const view = new Uint8Array(buffer);
        for (let i = 0, max = 3 * len; i < max; i += 3) {
            const color = this.table[i / 3];
            view[i + 0] = color.red;
            view[i + 1] = color.green;
            view[i + 2] = color.blue;
        }

        return buffer;
    }

    /**
     * factory method that create `PLTE` from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {PLTE}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength % 3 !== 0) {
            throw new PNGError('invalid buffer for PLTE chunk');
        }

        const table = [];
        const view = new Uint8Array(aBuffer);
        for (let i = 0, len = view.length; i < len; i += 3) {
            const rgb = new RGB(
                view[i + 0],
                view[i + 1],
                view[i + 2]
            );
            table.push(rgb);
        }
        return new PLTE(table);
    }
}
