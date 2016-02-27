// -*- coding: utf-8 -*-

import assert from 'power-assert';

import Signature from '../src/signature.js';


/**
 * @test {Signature}
 */
describe('Signature', () => {
    /**
     * @test {Signature#constructor}
     */
    it('should create new signature by calling constructor', () => {
        const sig = new Signature();
        assert(sig instanceof Signature);
    });

    /**
     * @test {Signature#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        const sig = new Signature();

        it('should generate ArrayBuffer by calling toArrayBuffer()', () => {
            assert(sig.toArrayBuffer() instanceof ArrayBuffer);
        });

        it('should generate ArrayBuffer containing PNG signature', () => {
            const buffer = sig.toArrayBuffer();
            const actual = Array.from(new Uint8Array(buffer));
            const expected = [137, 80, 78, 71, 13, 10, 26, 10];
            assert.deepStrictEqual(expected, actual);
        });

        it('should generate same ArrayBuffer', () => {
            assert.deepStrictEqual(sig.toArrayBuffer(), sig.toArrayBuffer());
        });
    });

    /**
     * @test {Signature.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should raise error for invalid length input', () => {
            const buffer = new ArrayBuffer(0);
            assert.throws(() => Signature.fromArrayBuffer(buffer), Error);
        });

        it('should raise error for invalid PNG signature', () => {
            const buffer = new ArrayBuffer(8);
            const view = new Uint8Array(buffer);
            view.set([137, 80, 78, 71, 13, 10, 26, 0]); // last byte is wrong
            assert.throws(() => Signature.fromArrayBuffer(buffer), Error);
        });

        it('should return Signature instance for valid input', () => {
            const buffer = new ArrayBuffer(8);
            const view = new Uint8Array(buffer);
            view.set([137, 80, 78, 71, 13, 10, 26, 10]);
            assert(Signature.fromArrayBuffer(buffer) instanceof Signature);
        });

        it('should generate same Signature created by this class', () => {
            const expected = new Signature();
            const actual = Signature.fromArrayBuffer(expected.toArrayBuffer());
            assert(expected, actual);
        });
    });
});
