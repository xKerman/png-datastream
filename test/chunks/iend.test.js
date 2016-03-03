// -*- coding: utf-8 -*-

import assert from 'power-assert';

import IEND from '../../src/chunks/iend.js';
import Chunk from '../../src/chunk.js';


/**
 * @test {IEND}
 */
describe('IEND chunk', () => {
    /**
     * @test {IEND#constructor}
     */
    it('should be created by calling constructor', () => {
        const iend = new IEND();
        assert(iend instanceof IEND);
    });

    /**
     * @test {IEND#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for IEND chunk', () => {
            const iend = new IEND();
            const buffer = iend.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'IEND');
        });
    });

    /**
     * @test {IEND.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create IEND chunk from the buffer which is created by IEND#toArrayBuffer', () => {
            const actual = new IEND();
            const chunk = Chunk.fromArrayBuffer(actual.toArrayBuffer());
            const expected = IEND.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
