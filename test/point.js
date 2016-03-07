// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Point from '../src/point.js';


/**
 * @test {Point}
 */
describe('Point', () => {
    /**
     * @test {Point#constructor}
     */
    context('#constructor', () => {
        it('should create Point instance for vaild input', () => {
            const [x, y] = [3.0, 4.0];
            const p = new Point(x, y);

            assert(p instanceof Point);
            assert(p.x === x);
            assert(p.y === y);
        });

        it('should raise error for invalid input', () => {
            assert.throws(() => new Point('invalid x', 0), Error);
            assert.throws(() => new Point(0, 'invalid y'), Error);
        });
    });
});
