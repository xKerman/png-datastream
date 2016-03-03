// -*- coding: utf-8 -*-

import ChunkInterface from '../chunkinterface.js';
import ChunkType from '../chunktype.js';
import PNGError from '../pngerror.js';


const YEAR_BYTES = 2;
const MONTH_BYTES = 1;
const DAY_BYTES = 1;
const HOUR_BYTES = 1;
const MINUTE_BYTES = 1;
const SECOND_BYTES = 1;

/**
 * tIME (Image last-modification time) chunk
 *
 * @see https://www.w3.org/TR/PNG/#11tIME
 * @implements {ChunkInterface}
 */
export default class tIME extends ChunkInterface {
    /**
     * @public
     * @param {number} aYear
     * @param {number} aMonth
     * @param {number} aDay
     * @param {number} anHour
     * @param {number} aMinute
     * @param {number} aSecond
     * @throws {PNGError}
     */
    constructor(aYear, aMonth, aDay, anHour, aMinute, aSecond) {
        super();
        this.setYear(aYear);
        this.setMonth(aMonth);
        this.setDay(aDay);
        this.setHour(anHour);
        this.setMinute(aMinute);
        this.setSecond(aSecond);
    }

    /**
     * @override
     * @type {ChunkType}
     */
    get type() {
        return new ChunkType('tIME');
    }

    /**
     * @override
     * @type {number}
     */
    get length() {
        return this.emptyChunkLength() +
            YEAR_BYTES +
            MONTH_BYTES +
            DAY_BYTES +
            HOUR_BYTES +
            MINUTE_BYTES +
            SECOND_BYTES;
    }

    /**
     * @override
     * @return {ArrayBuffer}
     */
    createData() {
        const buffer = new ArrayBuffer(YEAR_BYTES + MONTH_BYTES + DAY_BYTES + HOUR_BYTES + MINUTE_BYTES + SECOND_BYTES);
        const view = new DataView(buffer);
        let offset = 0;

        view.setUint16(offset, this.year);
        offset += YEAR_BYTES;

        view.setUint8(offset, this.month);
        offset += MONTH_BYTES;

        view.setUint8(offset, this.day);
        offset += DAY_BYTES;

        view.setUint8(offset, this.hour);
        offset += HOUR_BYTES;

        view.setUint8(offset, this.minute);
        offset += MINUTE_BYTES;

        view.setUint8(offset, this.second);
        offset += SECOND_BYTES;

        return buffer;
    }

    /**
     * factory method that create `tIME` chunk from given `ArrayBuffer`
     *
     * @public
     * @param {ArrayBuffer} aBuffer
     * @return {tIME}
     * @throws {PNGError}
     */
    static fromArrayBuffer(aBuffer) {
        if (aBuffer.byteLength < YEAR_BYTES + MONTH_BYTES + DAY_BYTES + HOUR_BYTES + MINUTE_BYTES + SECOND_BYTES) {
            throw new PNGError('too short data length for tIME chunk');
        }

        const view = new DataView(aBuffer);
        let offset = 0;

        const year = view.getUint16(offset);
        offset += YEAR_BYTES;

        const month = view.getUint8(offset);
        offset += MONTH_BYTES;

        const day = view.getUint8(offset);
        offset += DAY_BYTES;

        const hour = view.getUint8(offset);
        offset += HOUR_BYTES;

        const minute = view.getUint8(offset);
        offset += MINUTE_BYTES;

        const second = view.getUint8(offset);
        offset += SECOND_BYTES;

        return new tIME(year, month, day, hour, minute, second);
    }

    /**
     * @public
     * @type {number}
     */
    get year() {
        return this._year;
    }

    /**
     * @private
     * @param {number} aYear
     * @throws {PNGError}
     */
    setYear(aYear) {
        if (aYear < 0 || aYear > Math.pow(2, 8 * YEAR_BYTES) - 1) {
            throw new PNGError(`invalid year for tIME chunk, got: ${ aYear }`);
        }
        this._year = aYear;
    }

    /**
     * @public
     * @type {number}
     */
    get month() {
        return this._month;
    }

    /**
     * @private
     * @param {number} aMonth
     * @throws {PNGError}
     */
    setMonth(aMonth) {
        if (aMonth < 1 || aMonth > 12) {
            throw new PNGError(`invalid month for tTIME chunk, got: ${ aMonth }`);
        }
        this._month = aMonth;
    }

    /**
     * @public
     * @type {number}
     */
    get day() {
        return this._day;
    }

    /**
     * @private
     * @param {number} aDay
     * @throws {PNGError}
     */
    setDay(aDay) {
        if (aDay < 1 || aDay > 31) {
            throw new PNGError(`invalid day for tIME chunk, got: ${ aDay }`);
        }
        this._day = aDay;
    }

    /**
     * @public
     * @type {number}
     */
    get hour() {
        return this._hour;
    }

    /**
     * @private
     * @param {number} anHour
     * @throws {PNGError}
     */
    setHour(anHour) {
        if (anHour < 0 || anHour > 23) {
            throw new PNGError(`invalid hour for tIME chunk, got: ${ anHour }`);
        }
        this._hour = anHour;
    }

    /**
     * @public
     * @type {number}
     */
    get minute() {
        return this._minute;
    }

    /**
     * @private
     * @param {number} aMinute
     * @throws {PNGError}
     */
    setMinute(aMinute) {
        if (aMinute < 0 || aMinute > 59) {
            throw new PNGError(`invalid minute for tIME chunk, got: ${ aMinute }`);
        }
        this._minute = aMinute;
    }

    /**
     * @public
     * @type {number}
     */
    get second() {
        return this._second;
    }

    /**
     * @private
     * @param {number} aSecond
     * @throws {PNGError}
     */
    setSecond(aSecond) {
        if (aSecond < 0 || aSecond > 60) {
            throw new PNGError(`invalid second for tIME chunk, got: ${ aSecond }`);
        }
        this._second = aSecond;
    }
}
