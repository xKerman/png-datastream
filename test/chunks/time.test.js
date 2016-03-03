// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import tIME from '../../src/chunks/time.js';


/**
 * @test {tIME}
 */
describe('tIME chunk', () => {
    /**
     * @test {tIME#constructor}
     */
    context('#constructor', () => {
        it('should create tIME chunk for valid input', () => {
            const [year, month, day, hour, minute, second] = [
                2000, 11, 1, 12, 34, 56
            ];
            const chunk = new tIME(year, month, day, hour, minute, second);

            assert(chunk instanceof tIME);
            assert(chunk.year === year);
            assert(chunk.month === month);
            assert(chunk.day === day);
            assert(chunk.hour === hour);
            assert(chunk.minute === minute);
            assert(chunk.second === second);
        });

        it('should raise error for invalid input', () => {
            assert.throws(() => new tIME(-1, 11, 1, 12, 34, 56), Error, 'invalid year');
            assert.throws(() => new tIME(2000, 13, 1, 12, 34, 56), Error, 'invalid month');
            assert.throws(() => new tIME(2000, 11, 32, 12, 34, 56), Error, 'invalid day');
            assert.throws(() => new tIME(2000, 11, 1, 24, 34, 56), Error, 'invalid hour');
            assert.throws(() => new tIME(2000, 11, 1, 12, 60, 56), Error, 'invalid minute');
            assert.throws(() => new tIME(2000, 11, 1, 12, 34, 61), Error, 'invalid second');
        });
    });

    /**
     * @test {tIME#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for tIME chunk', () => {
            const time = new tIME(2000, 11, 1, 12, 34, 56);
            const buffer = time.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'tIME');
            assert(time.length === chunk.length);
        });
    });

    /**
     * @test {tIME.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create tIME chunk from the buffer which is create by tIME#toArrayBuffer', () => {
            const actual = new tIME(2000, 11, 1, 12, 34, 56);
            const chunk = Chunk.fromArrayBuffer(actual.toArrayBuffer());
            const expected = tIME.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
