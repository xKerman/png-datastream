// -*- coding: utf-8 -*-

import assert from 'power-assert';

import ChunkType from '../src/chunktype.js';


/**
 * @test {ChunkType}
 */
describe('ChunkType', () => {
    /**
     * @test {ChunkType#constructor}
     */
    context('#constructor', () => {
        it('should create ChunkType for valid input', () => {
            const type = new ChunkType('IHDR');
            assert(type instanceof ChunkType);
        });

        it('should raise error for invalid input', () => {
            assert.throws(() => new ChunkType('hello'), Error);
        });
    });

    /**
     * @test {ChunkType#isCritical}
     */
    context('#isCritical', () => {
        it('should return true for critical chunk type', () => {
            const type = new ChunkType('IDAT');
            assert(type.isCritical());
        });

        it('should return false for ancillary type', () => {
            const type = new ChunkType('tEXT');
            assert(!type.isCritical());
        });
    });

    /**
     * @test {ChunkType#isPublic}
     */
    context('#isPublic', () => {
        it('should return true for public chunk type', () => {
            const type = new ChunkType('IDAT');
            assert(type.isPublic());
        });

        it('should return false for private chunk type', () => {
            const type = new ChunkType('IdAT');
            assert(!type.isPublic());
        });
    });

    /**
     * @test {ChunkType#isReserved}
     */
    context('#isReserved', () => {
        it('should return true for reserved chunk type', () => {
            const type = new ChunkType('IDAT');
            assert(type.isReserved());
        });

        it('should return false for non reserved chunk type', () => {
            const type = new ChunkType('IDaT');
            assert(!type.isReserved());
        });
    });

    /**
     * @test {ChunkType#isSafeToCopy}
     */
    context('#isSafeToCopy', () => {
        it('should return true for safe-to-copy chunk type', () => {
            const type = new ChunkType('IDAt');
            assert(type.isSafeToCopy());
        });

        it('should return false for safe-to-copy chunk type', () => {
            const type = new ChunkType('IDAT');
            assert(!type.isSafeToCopy());
        });
    });

    /**
     * @test {ChunkType#toString}
     */
    context('#toString', () => {
        it('should return given type', () => {
            const expected = 'IDAT';
            const chunk = new ChunkType(expected);
            assert(expected === chunk.toString());
        });
    });
});
