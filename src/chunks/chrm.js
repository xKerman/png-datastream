// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';
import Point from '../point.js';


const X_BYTES = 4;
const Y_BYTES = 4;
const CHRM_COEFFICIENT = 100000;

/**
 * cHRM (Primary chromaticities and white point) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11cHRM
 * @implements {ChunkInterface}
 */
export default class cHRM extends ChunkInterface {
    /**
     * @public
     * @param {Point} aWhite
     * @param {Point} aRed
     * @param {Point} aGreen
     * @param {Point} aBlue
     */
    constructor(aWhite, aRed, aGreen, aBlue) {
        super();
        this.setWhite(aWhite);
        this.setRed(aRed);
        this.setGreen(aGreen);
        this.setBlue(aBlue);
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() + 4 * (X_BYTES + Y_BYTES);
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('cHRM');
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const buffer = new ArrayBuffer(4 * (X_BYTES + Y_BYTES));
        const view = new DataView(buffer);

        const points = [this.white, this.red, this.green, this.blue];
        points.forEach((point, i) => {
            const offset = i * (X_BYTES + Y_BYTES);
            view.setUint32(offset, Math.round(point.x * CHRM_COEFFICIENT));
            view.setUint32(offset + X_BYTES, Math.round(point.y * CHRM_COEFFICIENT));
        });

        return buffer;
    }

    /**
     * factory method that create `cHRM` chunk from given `ArrayBuffer`
     *
     * @param {ArrayBuffer} aBuffer
     * @return {cHRM}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength < 4 * (X_BYTES + Y_BYTES)) {
            throw new PNGError('too short for cHRM chunk data part');
        }
        const view = new DataView(aBuffer);

        const points = [];
        for (let i = 0; i < 4; ++i) {
            const offset = i * (X_BYTES + Y_BYTES);
            const point = new Point(
                view.getUint32(offset) / CHRM_COEFFICIENT,
                view.getUint32(offset + X_BYTES) / CHRM_COEFFICIENT
            );
            points.push(point);
        }

        return new cHRM(points[0], points[1], points[2], points[3]);
    }

    /**
     * @public
     * @type {Point}
     */
    get white() {
        return this._white;
    }

    /**
     * @private
     * @param {Point} aWhite
     * @throws {PNGError}
     */
    setWhite(aWhite) {
        if (!(aWhite instanceof Point)) {
            throw new PNGError('got invalid instance for cHRM white point');
        }
        this._white = aWhite;
    }

    /**
     * @public
     * @type {Point}
     */
    get red() {
        return this._red;
    }

    /**
     * @private
     * @param {Point} aRed
     * @throws {PNGError}
     */
    setRed(aRed) {
        if (!(aRed instanceof Point)) {
            throw new PNGError('got invalid instance for cHRM red point');
        }
        this._red = aRed;
    }

    /**
     * @public
     * @type {Point}
     */
    get green() {
        return this._green;
    }

    /**
     * @private
     * @param {Point} aGreen
     * @throws {PNGError}
     */
    setGreen(aGreen) {
        if (!(aGreen instanceof Point)) {
            throw new PNGError('got invalid instance for cHRM green point');
        }
        this._green = aGreen;
    }

    /**
     * @public
     * @type {Point}
     */
    get blue() {
        return this._blue;
    }

    /**
     * @private
     * @param {Point} aBlue
     * @throws {PNGError}
     */
    setBlue(aBlue) {
        if (!(aBlue instanceof Point)) {
            throw new PNGError('got invalid instance for cHRM blue point');
        }
        this._blue = aBlue;
    }
}
