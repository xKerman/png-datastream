// -*- coding: utf-8 -*-

import PNGError from './pngerror.js';

const SIGNATURE_VALUES = [137, 80, 78, 71, 13, 10, 26, 10];

/**
 * PNG signature defined in the spec
 *
 * @see https://www.w3.org/TR/PNG/#5PNG-file-signature
 */
export default class Signature {
    /**
     * create `ArrayBuffer` for this signature
     *
     * @public
     * @return {ArrayBuffer}
     */
    toArrayBuffer() {
        const result = new ArrayBuffer(SIGNATURE_VALUES.length);
        const view = new Uint8Array(result);
        view.set(SIGNATURE_VALUES);
        return result;
    }

    /**
     * factory method that create `Signature` from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {Signature}
     * @throws {PNGError} - if the given `aBuffer` is not valid for PNG signature
     */
    static fromArrayBuffer(aBuffer) {
        this.verify(aBuffer);
        return new Signature();
    }

    /**
     * @private
     * @param {ArrayBuffer} aBuffer
     * @throws {PNGError}
     */
    static verify(aBuffer) {
        const view = new Uint8Array(aBuffer);
        if (view.length !== SIGNATURE_VALUES.length) {
            throw new PNGError('invalid PNG signature');
        }

        SIGNATURE_VALUES.forEach((v, i) => {
            if (view[i] !== v) {
                throw new PNGError('invalid PNG signature');
            }
        });
    }
}
