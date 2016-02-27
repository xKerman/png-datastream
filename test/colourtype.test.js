// -*- coding: utf-8 -*-

import assert from 'power-assert';

import ColourType from '../src/colourtype.js';


/**
 * @test {ColourType}
 */
describe('ColourType', () => {
    it('should have Greyscale', () => {
        assert(ColourType.Greyscale.valueOf() === 0);
    });

    it('should have Truecolour', () => {
        assert(ColourType.Truecolour.valueOf() === 2);
    });

    it('should have Indexed-colour', () => {
        assert(ColourType.IndexedColur.valueOf() === 3);
    });

    it('should have Greyscale with alpha', () => {
        assert(ColourType.GreyscaleWithAlpha.valueOf() === 4);
    });

    it('should have Truecolour with alpha', () => {
        assert(ColourType.TruecolourWithAlpha.valueOf() === 6);
    });

    /**
     * @test {ColourType.fromInt}
     */
    context('.fromInt', () => {
        it('should return value for valid input', () => {
            assert(ColourType.fromInt(0) === ColourType.Greyscale);
        });

        it('should raise Error for invalid input', () => {
            assert.throws(() => ColourType.fromInt(42), Error);
        });
    });

    /**
     * @test {ColourType#isAllowedBitDepth}
     */
    context('#isAllowedBitDepth', () => {
        it('should return true for allowed bit depth', () => {
            assert(ColourType.Truecolour.isAllowedBitDepth(8));
        });

        it('should return false for not allowed bit depth', () => {
            assert(!ColourType.Truecolour.isAllowedBitDepth(1));
        });
    });
});
