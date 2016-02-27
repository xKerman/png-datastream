// -*- coding: utf-8 -*-

import { Zlib } from 'zlibjs/bin/crc32.min.js';


const LENGTH_PART_BYTES = 4;
const TYPE_PART_BYTES = 4;
const CRC_PART_BYTES = 4;

/**
 * Interface for PNG chunk behaviour
 *
 * @interface
 */
class ChunkInterface {
    /**
     * return chunk type
     *
     * @public
     * @abstract
     * @type {ChunkType}
     */
    get type() {
        throw new Error('please implement this method!');
    }

    /**
     * create chunk data
     *
     * @public
     * @abstract
     * @return {ArrayBuffer}
     */
    createData() {
        throw new Error('please implement this method!');
    }

    /**
     * return chunk length in byte
     *
     * @public
     * @abstract
     * @type {number}
     */
    get length() {
        throw new Error('please implement this method!');
    }

    /**
     * {@link ChunkType#isCritical}
     *
     * @public
     * @return {boolean}
     */
    isCritical() {
        return this.type.isCritical();
    }

    /**
     * {@link ChunkType#isPublic}
     *
     * @public
     * @return {boolean}
     */
    isPublic() {
        return this.type.isPublic();
    }

    /**
     * {@link ChunkType#isReserved}
     *
     * @public
     * @return {boolean}
     */
    isReserved() {
        return this.type.isReserved();
    }

    /**
     * {@link ChunkType#isSafeToCopy}
     *
     * @public
     * @return {boolean}
     */
    isSafeToCopy() {
        return this.type.isSafeToCopy();
    }

    /**
     * create `ArrayBuffer` for this chunk
     *
     * @public
     * @return {ArrayBuffer}
     */
    toArrayBuffer() {
        const buffer = new ArrayBuffer(this.length);
        const data = this.createData();

        const view = new DataView(buffer);
        let offset = 0;
        view.setUint32(offset, data.byteLength);
        offset += LENGTH_PART_BYTES;

        const typeBytes = this.type.toBytes();
        typeBytes.forEach((v, i) => {
            view.setUint8(offset + i, v);
        });
        offset += TYPE_PART_BYTES;

        const body = new Uint8Array(data);
        for (let i = 0, len = body.length; i < len; ++i) {
            view.setUint8(offset + i, body[i]);
        }
        offset += body.length;

        const crc = Zlib.CRC32.update(
            body,
            Zlib.CRC32.calc(typeBytes)
        );
        view.setUint32(offset, crc);

        return buffer;
    }

    /**
     * return chunk length whose data is empty
     *
     * @public
     * @return {number}
     */
    emptyChunkLength() {
        return LENGTH_PART_BYTES + TYPE_PART_BYTES + CRC_PART_BYTES;
    }
}

ChunkInterface.LENGTH_PART_BYTES = LENGTH_PART_BYTES;
ChunkInterface.TYPE_PART_BYTES = TYPE_PART_BYTES;
ChunkInterface.CRC_PART_BYTES = CRC_PART_BYTES;

export default ChunkInterface;
