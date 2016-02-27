// -*- coding: utf-8 -*-

import assert from 'power-assert';

import RGB from '../src/rgb.js';


/**
 * @test {RGB}
 */
describe('RGB', () => {
    /**
     * @test {RGB#constructor}
     */
    context('#constructor ', () => {
        it('shoud create RGB instance for valid input', () => {
            const [red, green, blue] = [0, 1, 4];
            const rgb = new RGB(red, green, blue);
            assert(rgb instanceof RGB);
            assert(rgb.red === red);
            assert(rgb.green === green);
            assert(rgb.blue === blue);
        });

        it('should raise error for invalid input', () => {
            assert.throws(() => new RGB(-1, 0, 0), Error);
            assert.throws(() => new RGB(0, -1, 0), Error);
            assert.throws(() => new RGB(0, 0, -1), Error);
            assert.throws(() => new RGB(256, 0, 0), Error);
            assert.throws(() => new RGB(0, 256, 0), Error);
            assert.throws(() => new RGB(0, 0, 256), Error);
        });
    });
});
