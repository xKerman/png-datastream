// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import IDAT from '../../src/chunks/idat.js';


/**
 * @test {IDAT}
 */
describe('IDAT chunk', () => {
    /**
     * @test {IDAT#constructor}
     */
    it('should be created by calling constructor', () => {
        const idat = new IDAT(new ArrayBuffer(1));
        assert(idat instanceof IDAT);
    });

    /**
     * @test {IDAT#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for IDAT chunk', () => {
            const idat = new IDAT(new ArrayBuffer(1));
            const buffer = idat.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'IDAT');
        });
    });

    /**
     * @test {IDAT.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create IDAT chunk from the buffer which is createc by IDAT#toArrayBuffer', () => {
            const actual = new IDAT(new ArrayBuffer(1));
            const chunk = Chunk.fromArrayBuffer(actual.toArrayBuffer());
            const expected = IDAT.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
