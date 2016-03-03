// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import RGB from '../../src/rgb.js';
import PLTE from '../../src/chunks/plte.js';


/**
 * @test {PLTE}
 */
describe('PLTE chunk', () => {
    /**
     * @test {PLTE#constructor}
     */
    it('should be created by calling constructor', () => {
        const table = [new RGB(1, 2, 3), new RGB(255, 254, 253)];
        const plte = new PLTE(table);
        assert(plte instanceof PLTE);
    });

    /**
     * @test {PLTE#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should return ArrayBuffer for PLTE chunk', () => {
            const table = [new RGB(1, 2, 3), new RGB(4, 5, 6)];
            const plte = new PLTE(table);
            const chunk = Chunk.fromArrayBuffer(plte.toArrayBuffer());

            assert(chunk.type.toString() === 'PLTE');
            assert(chunk.data.byteLength === table.length * 3);
        });
    });

    /**
     * @test {PLTE.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create PLTE chunk from the buffer which is created by PLTE#toArrayBuffer', () => {
            const table = [new RGB(1, 2, 3), new RGB(4, 5, 6)];
            const actual = new PLTE(table);
            const chunk = Chunk.fromArrayBuffer(actual.toArrayBuffer());
            const expected = PLTE.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
