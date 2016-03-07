// -*- coding: utf-8 -*-

import PNGError from './pngerror.js';

const COLOUR_MIN = 0;

/**
 * utility class for RGB colour
 */
export default class RGB {
    /**
     * @public
     * @param {number} aRed
     * @param {number} aGreen
     * @param {number} aBlue
     */
    constructor(aRed, aGreen, aBlue) {
        this.setRed(aRed);
        this.setGreen(aGreen);
        this.setBlue(aBlue);
    }

    /**
     * @private
     * @param {number} aValue
     * @throws {PNGError}
     */
    validate(aValue) {
        if (aValue < COLOUR_MIN) {
            throw new PNGError(`invalid colour value, got: ${ aValue }`);
        }
    }

    /**
     * @private
     * @param {number} aRed
     * @throws {PNGError}
     */
    setRed(aRed) {
        this.validate(aRed);
        /**
         * @private
         * @type {number}
         */
        this._red = aRed;
    }

    /**
     * @private
     * @param {number} aGreen
     * @throws {PNGError}
     */
    setGreen(aGreen) {
        this.validate(aGreen);
        /**
         * @private
         * @type {number}
         */
        this._green = aGreen;
    }

    /**
     * @private
     * @param {number} aBlue
     * @throws {PNGError}
     */
    setBlue(aBlue) {
        this.validate(aBlue);
        /**
         * @private
         * @type {number}
         */
        this._blue = aBlue;
    }

    /**
     * red value for this colour
     *
     * @public
     * @type {number}
     */
    get red() {
        return this._red;
    }

    /**
     * green value for this colour
     *
     * @public
     * @type {number}
     */
    get green() {
        return this._green;
    }

    /**
     * blue value for this colour
     *
     * @public
     * @type {number}
     */
    get blue() {
        return this._blue;
    }
}
