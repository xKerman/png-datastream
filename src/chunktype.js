// -*- coding: utf-8 -*-

import PNGError from './pngerror.js';

const ANCILLARY_BIT = 0;
const PRIVATE_BIT = 1;
const RESERVED_BIT = 2;
const SAFE_TO_COPY_BIT = 3;

/**
 * PNG chunk type in the spec
 *
 * @see https://www.w3.org/TR/PNG/#5Chunk-naming-conventions
 */
export default class ChunkType {
    /**
     * create `ChunkType` from string
     * @example
     * const type = new ChunkType('IHDR');
     *
     * @public
     * @param {String} aType
     * @throws {PNGError}
     */
    constructor(aType) {
        this.setType(aType);
    }

    /**
     * @private
     * @param {String} aType
     * @throws {PNGError}
     */
    setType(aType) {
        if (!/^[A-Za-z]{4}$/.test(aType)) {
            throw new PNGError(`got invalid chunk type: ${ aType }`);
        }
        /**
         * @private
         * @type {String}
         */
        this.type = aType;
    }

    /**
     * check if this chunk type is critical or ancillary
     *
     * @public
     * @return {boolean} - `true` if this is critical, `false` otherwise
     */
    isCritical() {
        return this.isUpperCaseAt(ANCILLARY_BIT);
    }

    /**
     * check if this chunk type is public or private
     *
     * @public
     * @return {boolean} - `true` if this is public, `false` otherwise
     */
    isPublic() {
        return this.isUpperCaseAt(PRIVATE_BIT);
    }

    /**
     * check if this chunk type is reserved or not
     *
     * @public
     * @return {boolean} - `true` if this is reserved in the spec, `false` otherwise
     */
    isReserved() {
        return this.isUpperCaseAt(RESERVED_BIT);
    }

    /**
     * check if this chunk type is safe to copy or not
     *
     * @public
     * @return {boolean} - `true` if this is safe to copy, `false` otherwise
     */
    isSafeToCopy() {
        return !this.isUpperCaseAt(SAFE_TO_COPY_BIT);
    }

    /**
     * @private
     * @param {number} aIndex
     * @return {boolean}
     */
    isUpperCaseAt(aIndex) {
        return (this.type.charCodeAt(aIndex) & 0xFF & 0x20) === 0;
    }

    /**
     * @public
     * @return {Array<number>}
     */
    toBytes() {
        return this.type.split('').map(c => c.charCodeAt(c));
    }

    /**
     * @public
     * @override
     * @return {String}
     */
    toString() {
        return this.type;
    }
}
