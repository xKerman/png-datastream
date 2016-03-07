// -*- coding: utf-8 -*-

import PNGError from './pngerror.js';

/**
 * 2D floating point
 *
 * @example
 * const p = new Point(3.0, 4.0);
 * p.x === 3.0; // true
 * p.y === 4.0; // true
 */
export default class Point {
    /**
     * @public
     * @param {number} aX
     * @param {number} aY
     */
    constructor(aX, aY) {
        this.setX(aX);
        this.setY(aY);
    }

    /**
     * @public
     * @type {number}
     */
    get x() {
        return this._x;
    }

    /**
     * @private
     * @param {number} aX
     * @throws {PNGError}
     */
    setX(aX) {
        if (!Number.isFinite(aX)) {
            throw new PNGError(`invalid value for Point#x, got: ${ aX }`);
        }
        this._x = aX;
    }

    /**
     * @public
     * @type {number}
     */
    get y() {
        return this._y;
    }

    /**
     * @private
     * @param {number} aY
     * @throws {PNGError}
     */
    setY(aY) {
        if (!Number.isFinite(aY)) {
            throw new PNGError(`invalid value for Point#x, got: ${ aY }`);
        }
        this._y = aY;
    }
}
