// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Chunk from '../../src/chunk.js';
import tEXt from '../../src/chunks/text.js';


/**
 * @test {tEXt}
 */
describe('tEXt chunk', () => {
    /**
     * @test {tEXt#constructor}
     */
    context('#constructor', () => {
        it('should create tEXt chunk for valid input', () => {
            const chunk = new tEXt('keyword', 'text message');
            assert(chunk instanceof tEXt);
        });

        it('should raise error for invalid input', () => {
            const toolong = '01234567890123456789012345678901234567890123456789012345678901234567890123456789'; // 80 length
            assert.throws(() => new tEXt(toolong, 'text message'), Error);
        });
    });

    /**
     * @test {tEXt#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for tEXt chunk', () => {
            const text = new tEXt('keyword', 'text message');
            const buffer = text.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);

            const chunk = Chunk.fromArrayBuffer(buffer);
            assert(chunk.type.toString() === 'tEXt');
        });
    });

    /**
     * @test {tEXt.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create tEXt chunk from the buffer which is createc by tEXt#toArrayBuffer', () => {
            const actual = new tEXt('keyword', 'text message');
            const chunk = Chunk.fromArrayBuffer(actual.toArrayBuffer());
            const expected = tEXt.fromArrayBuffer(chunk.data);

            assert.deepStrictEqual(actual, expected);
        });
    });
});
