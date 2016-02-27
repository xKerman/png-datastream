// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../src/chunk.js';
import ChunkType from '../src/chunktype.js';


/**
 * @test {Chunk}
 */
describe('Chunk', () => {
    /**
     * @test {Chunk#constructor}
     */
    context('#constructor', () => {
        it('should create instance by calling constructor', () => {
            const chunk = new Chunk(new ChunkType('tEXt'), new ArrayBuffer(0));
            assert(chunk instanceof Chunk);
        });

        it('should raise error for invalid chunk type', () => {
            assert.throws(() => new Chunk('', new ArrayBuffer(0)), Error);
        });
    });

    /**
     * @test {Chunk#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer', () => {
            const chunk = new Chunk(new ChunkType('tEXt'), new ArrayBuffer(0));
            const buffer = chunk.toArrayBuffer();

            assert(buffer instanceof ArrayBuffer);
            assert(buffer.byteLength, 12);
            const view = new DataView(buffer);
            assert(view.getUint32(0) === 0, 'chunk length is 0');
            assert(view.getUint8(4) === 't'.charCodeAt(0), 'chunk type 1st letter is "t"');
            assert(view.getUint8(5) === 'E'.charCodeAt(0), 'chunk type 2nd letter is "E"');
            assert(view.getUint8(6) === 'X'.charCodeAt(0), 'chunk type 3rd letter is "X"');
            assert(view.getUint8(7) === 't'.charCodeAt(0), 'chunk type 4th letter is "t"');
            assert(view.getUint32(8) === 2520958341, 'chunk checksum');
        });
    });

    /**
     * @test {Chunk.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should return Chunk for valid input', () => {
            const expected = new Chunk(new ChunkType('tEXt'), new ArrayBuffer(0));
            const actual = Chunk.fromArrayBuffer(expected.toArrayBuffer());
            assert.deepStrictEqual(expected, actual);
        });
    });
});
