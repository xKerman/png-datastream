// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';


const MAX_KEYWORD_LEN = 79;

/**
 * tEXt (Textual data) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11tEXt
 * @implements {ChunkInterface}
 */
export default class tEXt extends ChunkInterface {
    /**
     * @public
     * @param {string} aKeyword - keyword (must not contain null character)
     * @param {string} aTextString - text string (must not contain null character)
     */
    constructor(aKeyword, aTextString) {
        super();
        this.setKeyword(aKeyword);
        this.setTextString(aTextString);
    }

    /**
     * @private
     * @param {string} aString
     * @throws {PNGError} - if input `aString` is invalid
     */
    validateString(aString) {
        if (typeof aString !== 'string') {
            throw new PNGError('invalid argument, string expected');
        }
        if (aString.indexOf('\x00') !== -1) {
            throw new PNGError(`contains null character, got: ${ aString }`);
        }
        for (let i = 0, len = aString.length; i < len; ++i) {
            if (aString.charCodeAt(i) > 0xFF) {
                throw new PNGError(`invalid character for ISO-8859-1, got: ${ aString }`);
            }
        }
    }

    /**
     * @public
     * @type {string}
     */
    get keyword() {
        return this._keyword;
    }

    /**
     * @private
     * @param {string} aKeyword
     * @throws {PNGError}
     */
    setKeyword(aKeyword) {
        this.validateString(aKeyword);
        const len = aKeyword.length;
        if (len < 1) {
            throw new PNGError(`too short for tEXt keyword, got: ${ aKeyword }`);
        }
        if (len > MAX_KEYWORD_LEN) {
            throw new PNGError(`too long for tEXt keyword, got: ${ aKeyword }`);
        }
        /**
         * @private
         * @type {string}
         */
        this._keyword = aKeyword;
    }

    /**
     * @public
     * @type {string}
     */
    get textString() {
        return this._textString;
    }

    /**
     * @private
     * @param {string} aTextString
     * @throws {PNGError}
     */
    setTextString(aTextString) {
        this.validateString(aTextString);
        /**
         * @private
         * @type {string}
         */
        this._textString = aTextString;
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() +
            this.keyword.length +
            1 +                 // for null separator
            this.textString.length;
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('tEXt');
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const view = new Uint8Array(this.keyword.length + 1 + this.textString.length);
        let offset = 0;
        for (let i = 0, len = this.keyword.length; i < len; ++i) {
            view[i] = this.keyword.charCodeAt(i);
        }

        offset += this.keyword.length;
        view[offset] = 0;
        ++offset;

        for (let i = 0, len = this.textString.length; i < len; ++i) {
            view[i + offset] = this.textString.charCodeAt(i);
        }

        return view.buffer;
    }

    /**
     * factory method that create `tEXt` chunk from `ArrayBuffer`
     *
     * @param {ArrayBuffer} aBuffer
     * @return {tEXt}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        const view = new Uint8Array(aBuffer);
        const key = [];
        let offset = 0;
        const len = view.length;
        while (offset < len) {
            if (view[offset] === 0) {
                break;
            }
            key.push(String.fromCharCode(view[offset]));
            ++offset;
        }

        // skip null separator
        ++offset;

        const text = [];
        while (offset < len) {
            text.push(String.fromCharCode(view[offset]));
            ++offset;
        }

        return new tEXt(key.join(''), text.join(''));
    }
}
