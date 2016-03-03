// -*- coding: utf-8 -*-

import Chunk from './chunk.js';
import IDAT from './chunks/idat.js';
import IHDR from './chunks/ihdr.js';
import IEND from './chunks/iend.js';
import PLTE from './chunks/plte.js';
import tEXt from './chunks/text.js';
import tIME from './chunks/time.js';
import PNGError from './pngerror.js';
import Signature from './signature.js';


const definitions = {
    'IDAT': IDAT,
    'IHDR': IHDR,
    'IEND': IEND,
    'PLTE': PLTE,
    'tEXt': tEXt,
    'tIME': tIME
};

/**
 * PNG datastream defined in spec
 *
 * @see https://www.w3.org/TR/PNG/#4Concepts.Format
 */
export default class Datastream {
    /**
     * @public
     * @param {Signature} aSignature
     * @param {Array<ChunkInterface>} aChunks
     * @throws {PNGError}
     */
    constructor(aSignature, aChunks) {
        this.setSignature(aSignature);
        this.setChunks(aChunks);
    }

    /**
     * @public
     * @type {Signature}
     */
    get signature() {
        return this._signature;
    }

    /**
     * @public
     * @type {Array<ChunkInterface>}
     */
    get chunks() {
        return this._chunks;
    }

    /**
     * @private
     * @param {Signature} aSignature
     * @throws {PNGError}
     */
    setSignature(aSignature) {
        if (!(aSignature instanceof Signature)) {
            throw new PNGError('unexpected PNG signature');
        }
        /**
         * @private
         * @type {Signature}
         */
        this._signature = aSignature;
    }

    /**
     * @private
     * @param {Array<ChunkInterface>} aChunks
     * @throws {PNGError}
     */
    setChunks(aChunks) {
        /**
         * @private
         * @type {Array<ChunkInterface>}
         */
        this._chunks = aChunks;
    }

    /**
     * create `ArrayBuffer` for this PNG datastream
     *
     * @public
     * @return {ArrayBuffer}
     */
    toArrayBuffer() {
        const sig = this.signature.toArrayBuffer();
        const chunks = this.chunks.map(chunk => chunk.toArrayBuffer());
        const length = sig.byteLength + chunks.reduce((acc, c) => acc + c.byteLength, 0);
        const buffer = new ArrayBuffer(length);
        const view = new Uint8Array(buffer);
        let offset = 0;

        const sigView = new Uint8Array(sig);
        for (let i = 0, len = sigView.length; i < len; ++i) {
            view[i + offset] = sigView[i];
        }
        offset += sigView.length;

        chunks.forEach(chunk => {
            const chunkView = new Uint8Array(chunk);
            for (let i = 0, len = chunkView.length; i < len; ++i) {
                view[i + offset] = chunkView[i];
            }
            offset += chunkView.length;
        });

        return buffer;
    }

    /**
     * factory method that create PNG datastream from `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {Datastream}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        const sigLength = 8;
        const signature = Signature.fromArrayBuffer(aBuffer.slice(0, sigLength));
        let remains = aBuffer.slice(sigLength);

        const chunks = [];
        let chunk = null;
        do {
            chunk = Chunk.fromArrayBuffer(remains);
            remains = remains.slice(chunk.length);
            if (chunk.type in definitions) {
                chunk = definitions[chunk.type].fromArrayBuffer(chunk.data);
            } else if (chunk.isCritical()) {
                throw new PNGError(`encountered an unknown critical chunk, got: ${ chunk.type }`);
            }
            chunks.push(chunk);
        } while (!(chunk instanceof IEND));

        if (remains.byteLength !== 0) {
            throw new PNGError('found data after IEND chunk');
        }

        return new Datastream(signature, chunks);
    }
}
