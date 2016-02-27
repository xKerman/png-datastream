// -*- coding: utf-8 -*-

import PNGError from './pngerror.js';

/**
 * PNG ColourType enum definition
 *
 * can be accessed as following:
 * - `ColourType.Greyscale`
 * - `ColourType.Truecolour`
 * - `ColourType.IndexedColour`
 * - `ColourType.GreyscaleWithAlpha`
 * - `ColourType.TruecolourWithAlpha`
 *
 * also can be created by calling `fromInt` factory method
 * @example
 * const colourType = ColourType.fromInt(0) // ColourType.Greyscale
 *
 * @see https://www.w3.org/TR/PNG/#6Colour-values
 */
class ColourType {
    /**
     * @private
     * @param {String} aName
     * @param {number} aValue
     * @param {number[]} anAllowedBitDepths
     */
    constructor(aName, aValue, anAllowedBitDepths) {
        /**
         * @private
         * @type {String}
         */
        this.name = aName;
        /**
         * @private
         * @type {number}
         */
        this.value = aValue;
        /**
         * @private
         * @type {number[]}
         */
        this.allowedBitDepths = anAllowedBitDepths;
    }

    /**
     * factory method for this enum class
     *
     * @public
     * @param {number} aValue - colour type number defined in PNG spec
     * @return {ColourType}
     * @throws {PNGError} - when the given `aValue` is not defined for colour type in PNG spec
     */
    static fromInt(aValue) {
        switch (aValue) {
        case 0:
            return types.Greyscale;
        case 2:
            return types.Truecolour;
        case 3:
            return types.IndexedColur;
        case 4:
            return types.GreyscaleWithAlpha;
        case 6:
            return types.TruecolourWithAlpha;
        default:
            throw new PNGError(`invalid colour type, got: ${ aValue }`);
        }
    }

    /**
     * check if given bit depth is allowed for this colour type
     * @example
     * ColourType.Truecolour.isAllowedBitDepth(8) // true
     * ColourType.Truecolour.isAllowedBitDepth(1) // false
     *
     * @public
     * @param {number} aBitDepth - PNG bit depth
     * @return {boolean} - `true` if the given `aBitDepth` is allowed, `false` otherwise
     */
    isAllowedBitDepth(aBitDepth) {
        return this.allowedBitDepths.indexOf(aBitDepth) !== -1;
    }

    /**
     * @public
     * @override
     * @return {number} - colour type value for this
     */
    valueOf() {
        return this.value;
    }

    /**
     * @public
     * @override
     * @return {String} - colour type name for this
     */
    toString() {
        return this.name;
    }
}

const types = {
    Greyscale: new ColourType('Greyscale', 0, [1, 2, 4, 8, 16]),
    Truecolour: new ColourType('Truecolour', 2, [8, 16]),
    IndexedColur: new ColourType('Indexed-colour', 3, [1, 2, 4, 8]),
    GreyscaleWithAlpha: new ColourType('Greyscale with alpha', 4, [8, 16]),
    TruecolourWithAlpha: new ColourType('Truecolour with alpha', 6, [8, 16])
};
Object.keys(types).forEach(key => {
    ColourType[key] = Object.freeze(types[key]);
});
Object.freeze(ColourType);

export default ColourType;
