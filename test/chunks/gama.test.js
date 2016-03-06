// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import gAMA from '../../src/chunks/gama.js';


/**
 * @test {gAMA}
 */
describe('gAMA chunk', () => {
    /**
     * @test {gAMA#constructor}
     */
    context('#constructor', () => {
        it('should create gAMA chunk for valid input', () => {
            const expected = 1/2.2;
            const gama = new gAMA(expected);

            assert(gama instanceof gAMA);
            assert(gama.gamma === expected);
        });

        it('should raise error for invalid input', () => {
            assert.throws(() => new gAMA('invalid'), Error);
        });
    });

    /**
     * @test {gAMA#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should return ArrayBuffer for gAMA chunk', () => {
            const gama = new gAMA(1/2.2);
            const buffer = gama.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'gAMA');
        });
    });

    /**
     * @test {gAMA.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create gAMA chunk from the buffer which is created by gAMA#toArrayBuffer', () => {
            const gamma = 1/2.2;
            const expected = new gAMA(gamma);
            const chunk = Chunk.fromArrayBuffer(expected.toArrayBuffer());
            const actual = gAMA.fromArrayBuffer(chunk.data);

            assert(expected.length === actual.length);
            assert(expected.type.toString() === actual.type.toString());
            assert(Math.abs(expected.gamma - gamma) < 1/100000);
            assert(Math.abs(expected.gamma - actual.gamma) < 1/100000);
        });
    });
});
