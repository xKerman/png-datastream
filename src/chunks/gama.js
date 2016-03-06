// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';


const GAMMA_BYTES = 4;
const GAMMA_COEFFICIENT = 100000;

/**
 * gAMA (Image gamma) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11gAMA
 * @implements {ChunkInterface}
 */
export default class gAMA extends ChunkInterface {
    /**
     * @public
     * @param {number} aGamma - gamma value
     */
    constructor(aGamma) {
        super();
        this.setGamma(aGamma);
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() + GAMMA_BYTES;
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('gAMA');
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const buffer = new ArrayBuffer(GAMMA_BYTES);
        const view = new DataView(buffer);
        view.setUint32(0, Math.round(this.gamma * GAMMA_COEFFICIENT));
        return buffer;
    }

    /**
     * factory method that create `gAMA` chunk from given `ArrayBuffer`
     *
     * @param {ArrayBuffer} aBuffer
     * @return {gAMA}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength < GAMMA_BYTES) {
            throw new PNGError(`too short data part for gAMA chunk`);
        }
        const view = new DataView(aBuffer);
        const gamma = view.getUint32(0) / GAMMA_COEFFICIENT;
        return new gAMA(gamma);
    }

    /**
     * @public
     * @type {number}
     */
    get gamma() {
        return this._gamma;
    }

    /**
     * @private
     * @param {number} aGamma
     * @throws {PNGError}
     */
    setGamma(aGamma) {
        if (!Number.isFinite(aGamma)) {
            throw new PNGError(`non finite value for gAMA chunk, got: ${ aGamma }`);
        }
        this._gamma = aGamma;
    }
}
