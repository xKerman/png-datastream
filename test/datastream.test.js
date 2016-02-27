// -*- coding: utf-8 -*-

import assert from 'power-assert';

import ColourType from '../src/colourtype.js';
import Datastream from '../src/datastream.js';
import IDAT from '../src/chunks/idat.js';
import IHDR from '../src/chunks/ihdr.js';
import IEND from '../src/chunks/iend.js';
import Signature from '../src/signature.js';


const createDummyDatastream = () => {
    const chunks = [
        new IHDR(1, 1, 1, ColourType.Greyscale, 0, 0, 0),
        new IDAT(new ArrayBuffer(1)),
        new IEND()
    ];
    return new Datastream(new Signature(), chunks);
};

/**
 * @test {Datastream}
 */
describe('Datastream', () => {
    /**
     * @test {Datastream#constructor}
     */
    it('should be created by calling constructor', () => {
        const datastream = createDummyDatastream();
        assert(datastream instanceof Datastream);
    });

    /**
     * @test {Datastream#toArrayBuffer}
     */
    context('#toArrayBuffer', () => {
        it('should create ArrayBuffer for Datastream', () => {
            const datastream = createDummyDatastream();
            const buffer = datastream.toArrayBuffer();
            assert(buffer instanceof ArrayBuffer);
        });
    });

    /**
     * @test {Datastream.fromArrayBuffer}
     */
    context('.fromArrayBuffer', () => {
        it('should create Datastream from the buffer which is created by Datastream#toArrayBuffer', () => {
            const actual = createDummyDatastream();
            const expected = Datastream.fromArrayBuffer(actual.toArrayBuffer());
            assert.deepStrictEqual(actual, expected);
        });
    });
});
