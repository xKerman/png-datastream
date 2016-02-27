// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import ColourType from '../../src/colourtype.js';
import IHDR from '../../src/chunks/ihdr.js';

/**
 * @test {IHDR}
 */
describe('IHDR chunk', () => {
    /**
     * @test {IHDR#constructor}
     */
    it('should be able to create IHDR chunk by calling constructor', () => {
        const [
            width,
            height,
            bitDepth,
            colourType,
            compressionMethod,
            filterMethod,
            interlaceMethod
        ] = [1, 1, 1, ColourType.Greyscale, 0, 0, 0];
        const ihdr = new IHDR(
            width,
            height,
            bitDepth,
            colourType,
            compressionMethod,
            filterMethod,
            interlaceMethod
        );
        assert(ihdr !== null);
        assert(ihdr.width === width);
        assert(ihdr.height === height);
        assert(ihdr.bitDepth === bitDepth);
        assert(ihdr.colourType === colourType);
        assert(ihdr.compressionMethod === compressionMethod);
        assert(ihdr.filterMethod === filterMethod);
        assert(ihdr.interlaceMethod === interlaceMethod);
    });

    /**
     * @test {IHDR#length}
     */
    it('#length should always return 25', () => {
        const ihdr = new IHDR(1, 1, 1, ColourType.Greyscale, 0, 0, 0);
        assert(ihdr.length === 25);
    });

    /**
     * @test {IHDR#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for IHDR chunk', () => {
            const ihdr = new IHDR(256, 256, 1, ColourType.Greyscale, 0, 0, 0);
            const buffer = ihdr.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'IHDR');
        });
    });

    /**
     * @test {IHDR.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create IHDR chunk from the buffer which is createc by IHDR#toArrayBuffer', () => {
            const expected = new IHDR(256, 256, 1, ColourType.Greyscale, 0, 0, 0);
            const chunk = Chunk.fromArrayBuffer(expected.toArrayBuffer());
            const actual = IHDR.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
