// -*- coding: utf-8 -*-

import assert from 'power-assert';

import cHRM from '../../src/chunks/chrm.js';
import Chunk from '../../src/chunk.js';
import Point from '../../src/point.js';


/**
 * @test {cHRM}
 */
describe('cHRM chunk', () => {
    /**
     * @test {cHRM#constructor}
     */
    context('#constructor', () => {
        it('should create cHRM instance for valid input', () => {
            const points = [
                new Point(0.0, 0.0),
                new Point(1.0, 0.0),
                new Point(0.0, 1.0),
                new Point(1.0, 1.0)
            ];
            const chrm = new cHRM(points[0], points[1], points[2], points[3]);

            assert(chrm instanceof cHRM);
            assert.deepStrictEqual(chrm.white, points[0]);
            assert.deepStrictEqual(chrm.red, points[1]);
            assert.deepStrictEqual(chrm.green, points[2]);
            assert.deepStrictEqual(chrm.blue, points[3]);
        });
    });

    /**
     * @test {cHRM#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for cHRM chunk', () => {
            const points = [
                new Point(0.0, 0.0),
                new Point(1.0, 0.0),
                new Point(0.0, 1.0),
                new Point(1.0, 1.0)
            ];
            const chrm = new cHRM(points[0], points[1], points[2], points[3]);
            const buffer = chrm.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'cHRM');
        });
    });

    /**
     * @test {cHRM.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create cHRM chunk from the buffer which is created by cHRM#toArrayBuffer', () => {
            const points = [
                new Point(0.0, 0.0),
                new Point(1.0, 0.0),
                new Point(0.0, 1.0),
                new Point(1.0, 1.0)
            ];
            const expected = new cHRM(points[0], points[1], points[2], points[3]);
            const chunk = Chunk.fromArrayBuffer(expected.toArrayBuffer());
            const actual = cHRM.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(expected, actual);
        });
    });
});
