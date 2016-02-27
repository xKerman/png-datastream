// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import ColourType from '../colourtype.js';
import PNGError from '../pngerror.js';


const WIDTH_BYTES = 4;
const HEIGHT_BYTES = 4;
const BIT_DEPTH_BYTES = 1;
const COLOUR_TYPE_BYTES = 1;
const COMPRESSION_METHOD_BYTES = 1;
const FILTER_METHOD_BYTES = 1;
const INTERLACE_METHOD_BYTES = 1;

/**
 * IHDR (Image header) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11IHDR
 * @implements {ChunkInterface}
 */
export default class IHDR extends ChunkInterface {
    /**
     * @public
     * @param {number} aWidth
     * @param {number} aHeight
     * @param {number} aBitDepth
     * @param {ColourType} aColourType
     * @param {number} aCompressionMethod - only 0 is acceptable
     * @param {number} aFilterMethod - only 0 is acceptable
     * @param {number} anInterlaceMethod - only 0 or 1 is acceptable
     */
    constructor(aWidth, aHeight, aBitDepth, aColourType, aCompressionMethod, aFilterMethod, anInterlaceMethod) {
        super();
        this.setWidth(aWidth);
        this.setHeight(aHeight);
        this.setColourType(aColourType);
        this.setBitDepth(aBitDepth);
        this.setCompressionMethod(aCompressionMethod);
        this.setFilterMethod(aFilterMethod);
        this.setInterlaceMethod(anInterlaceMethod);
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('IHDR');
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() +
            WIDTH_BYTES +
            HEIGHT_BYTES +
            BIT_DEPTH_BYTES +
            COLOUR_TYPE_BYTES +
            COMPRESSION_METHOD_BYTES +
            FILTER_METHOD_BYTES +
            INTERLACE_METHOD_BYTES;
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const buffer = new ArrayBuffer(WIDTH_BYTES + HEIGHT_BYTES + BIT_DEPTH_BYTES + COLOUR_TYPE_BYTES + COMPRESSION_METHOD_BYTES + FILTER_METHOD_BYTES + INTERLACE_METHOD_BYTES);
        const view = new DataView(buffer);
        let offset = 0;

        view.setUint32(offset, this.width);
        offset += WIDTH_BYTES;

        view.setUint32(offset, this.height);
        offset += HEIGHT_BYTES;

        view.setUint8(offset, this.bitDepth);
        offset += BIT_DEPTH_BYTES;

        view.setUint8(offset, this.colourType.valueOf());
        offset += COLOUR_TYPE_BYTES;

        view.setUint8(offset, this.compressionMethod);
        offset += COMPRESSION_METHOD_BYTES;

        view.setUint8(offset, this.filterMethod);
        offset += FILTER_METHOD_BYTES;

        view.setUint8(offset, this.interlaceMethod);
        offset += INTERLACE_METHOD_BYTES;

        return buffer;
    }

    /**
     * factory method that create `IHDR` from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {IHDR}
     * @throws {PNGError} - if the given `aBuffer` is not valid for IHDR chunk
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength < 4 + 4 + 1 + 1 + 1 + 1 + 1) {
            throw new PNGError('invalid byte length for IHDR chunk');
        }
        let offset = 0;
        const view = new DataView(aBuffer);

        const width = view.getUint32(offset);
        offset += WIDTH_BYTES;

        const height = view.getUint32(offset);
        offset += HEIGHT_BYTES;

        const bitDepth = view.getUint8(offset);
        offset += BIT_DEPTH_BYTES;

        const colourType = ColourType.fromInt(view.getUint8(offset));
        offset += COLOUR_TYPE_BYTES;

        const compressionMethod = view.getUint8(offset);
        offset += COMPRESSION_METHOD_BYTES;

        const filterMethod = view.getUint8(offset);
        offset += FILTER_METHOD_BYTES;

        const interlaceMethod = view.getUint8(offset);
        offset += INTERLACE_METHOD_BYTES;

        return new IHDR(
            width,
            height,
            bitDepth,
            colourType,
            compressionMethod,
            filterMethod,
            interlaceMethod
        );
    }

    /**
     * @public
     * @type {number}
     */
    get width() {
        return this._width;
    }

    /**
     * @private
     * @param {number} aWidth
     * @throws {PNGError}
     */
    setWidth(aWidth) {
        if (aWidth < 1 || aWidth > Math.pow(2, 32) - 1) {
            throw new PNGError(`invalid width, got: ${ aWidth }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._width = aWidth;
    }

    /**
     * @public
     * @type {number}
     */
    get height() {
        return this._height;
    }

    /**
     * @private
     * @param {number} aHeight
     * @throws {PNGError}
     */
    setHeight(aHeight) {
        if (aHeight < 1 || aHeight > Math.pow(2, 32) - 1) {
            throw new PNGError(`invalid height, got: ${ aHeight }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._height = aHeight;
    }

    /**
     * @public
     * @type {ColourType}
     */
    get colourType() {
        return this._colourType;
    }

    /**
     * @private
     * @param {ColourType} aColourType
     * @throws {PNGError}
     */
    setColourType(aColourType) {
        if (!(aColourType instanceof ColourType)) {
            throw new PNGError('invalid colour type');
        }
        /**
         * @private
         * @type {ColourType}
         */
        this._colourType = aColourType;
    }

    /**
     * @public
     * @type {number}
     */
    get bitDepth() {
        return this._bitDepth;
    }

    /**
     * @private
     * @param {number} aBitDepth
     * @throws {PNGError}
     */
    setBitDepth(aBitDepth) {
        if (!this.colourType.isAllowedBitDepth(aBitDepth)) {
            throw new PNGError(`got not allowed bit depth for colour type, bit depth: ${ aBitDepth }, colour type: ${ this.colourType }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._bitDepth = aBitDepth;
    }

    /**
     * @public
     * @type {number}
     */
    get compressionMethod() {
        return this._compressionMethod;
    }

    /**
     * @private
     * @param {number} aCompressionMethod
     * @throws {PNGError}
     */
    setCompressionMethod(aCompressionMethod) {
        if (aCompressionMethod !== 0) {
            throw new PNGError(`invalid compression method, got: ${ aCompressionMethod }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._compressionMethod = aCompressionMethod;
    }

    /**
     * @public
     * @type {number}
     */
    get filterMethod() {
        return this._filterMethod;
    }

    /**
     * @private
     * @param {number} aFilterMethod
     * @throws {PNGError}
     */
    setFilterMethod(aFilterMethod) {
        if (aFilterMethod !== 0) {
            throw new PNGError(`invalid filter method, got: ${ aFilterMethod }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._filterMethod = aFilterMethod;
    }

    /**
     * @public
     * @type {number}
     */
    get interlaceMethod() {
        return this._interlaceMethod;
    }

    /**
     * @private
     * @param {number} anInterlaceMethod
     * @throws {PNGError}
     */
    setInterlaceMethod(anInterlaceMethod) {
        if (anInterlaceMethod !== 0 && anInterlaceMethod !== 1) {
            throw new PNGError(`invalid filter method, got: ${ anInterlaceMethod }`);
        }
        /**
         * @private
         * @type {number}
         */
        this._interlaceMethod = anInterlaceMethod;
    }
}
