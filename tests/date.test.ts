import {describe, it, expect} from 'bun:test';

import {
    getDateString,
    get3digitMonthName,
    getEnDateStringFromRu,
    createCalendarStringFromISO,
    getDateRangeString,
    getMonthYearFullString,
    getFullDateString,
    getWeekRange,
    getQuarterNumber,
    getShortDateRangeString,
    getMonthNameByIndex,
    getMonthNameByIndexGenitiveCase,
    getMonthNameByIndexPrepositionalCase,
    getQuarterString,
    getCurrentWeekStartDate,
    addMilliseconds,
    addMinutues,
    addHours,
    addDays,
    addMonth,
    getNextWeekPeriod,
    getNextMonthPeriodDates,
    formatShortEndDate,
    compareDates
} from '#src/date';
import { TDateISO } from '../src/types';

const CURRENT_YEAR = new Date().getFullYear();

describe('[utils/date]', () => {
    describe('- formatShortEndDate', () => {
        it('test_index_0_returns_correct', () => {
            expect(formatShortEndDate(new Date('2000-06-15T06:07:14.200Z'))).toBe('2000-06-15');
        });
    });

    describe('- getMonthNameByIndex', () => {
        it('test_index_0_returns_correct_month_name', () => {
            expect(getMonthNameByIndex(0)).toBe('январь');
        });

        it('test_index_11_returns_correct_month_name', () => {
            expect(getMonthNameByIndex(11)).toBe('декабрь');
        });

        it('test_index_5_returns_correct_month_name capitalize', () => {
            expect(getMonthNameByIndex(5, true)).toBe('Июнь');
        });
    });

    describe('- getMonthNameByIndexGenitiveCase', () => {
        it('test_index_0_returns_correct_month_name', () => {
            expect(getMonthNameByIndexGenitiveCase(0)).toBe('января');
        });
    });

    describe('- getQuarterString', () => {
        it('test current year', () => {
            expect(getQuarterString(`${CURRENT_YEAR}-02-15T06:07:14.200Z`)).toBe('I квартал');
        });

        it('test last year', () => {
            expect(getQuarterString('2000-06-15T06:07:14.200Z')).toBe('II квартал 2000');
        });
    });

    describe('- getMonthNameByIndexPrepositionalCase', () => {
        it('test_index_0_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(0)).toBe('январе');
        });

        it('test_index_1_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(1)).toBe('феврале');
        });

        it('test_index_2_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(2)).toBe('марте');
        });

        it('test_index_3_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(3)).toBe('апреле');
        });

        it('test_index_4_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(4)).toBe('мае');
        });

        it('test_index_5_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(5)).toBe('июне');
        });

        it('test_index_6_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(6)).toBe('июле');
        });

        it('test_index_7_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(7)).toBe('августе');
        });

        it('test_index_8_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(8)).toBe('сентябре');
        });

        it('test_index_9_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(9)).toBe('октябре');
        });

        it('test_index_10_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(10)).toBe('ноябре');
        });

        it('test_index_11_returns_correct_month_name', () => {
            expect(getMonthNameByIndexPrepositionalCase(11)).toBe('декабре');
        });
    });

    describe('- getDateString', () => {
        it('success test without year', () => {
            expect(getDateString(new Date(CURRENT_YEAR, 0, 1))).toEqual('1 янв');
        });

        it('success test with year', () => {
            expect(getDateString(new Date(2015, 0, 1))).toEqual('1 янв 2015');
        });
    });

    describe('- getEnDateStringFromRu', () => {
        it('success test', () => {
            expect(getEnDateStringFromRu('01.02.23')).toEqual('02.01.23');
        });
    });

    describe('- getDateRangeString', () => {
        it('1 success test', () => {
            expect(getDateRangeString(`${CURRENT_YEAR}-02-01T06:07:14.200Z`, `${CURRENT_YEAR}-03-14T06:07:14.200Z`)).toEqual('1 фев – 14 мар');
        });
    });

    describe('- getShortDateRangeString', () => {
        it('1 success test', () => {
            expect(getShortDateRangeString(`${CURRENT_YEAR}-02-01T06:07:14.200Z` as TDateISO, `${CURRENT_YEAR}-03-14T06:07:14.200Z` as TDateISO)).toEqual('1 фев – 14 мар');
        });
        it('2 success test', () => {
            expect(getShortDateRangeString(`${CURRENT_YEAR}-03-01T06:07:14.200Z` as TDateISO, `${CURRENT_YEAR}-03-14T06:07:14.200Z` as TDateISO)).toEqual('1 – 14 мар');
        });
        it('3 success test', () => {
            expect(getShortDateRangeString(`2022-02-01T06:07:14.200Z`, `${CURRENT_YEAR}-02-14T06:07:14.200Z` as TDateISO)).toEqual('1 фев 2022 – 14 фев');
        });
        it('4 success test', () => {
            expect(getShortDateRangeString('2022-02-01T06:07:14.200Z', '2022-02-14T06:07:14.200Z')).toEqual('1 – 14 фев 2022');
        });
        it('5 success test', () => {
            expect(getShortDateRangeString('2022-02-01T06:07:14.200Z', '2022-04-14T06:07:14.200Z')).toEqual('1 фев 2022 – 14 апр 2022');
        });
    });

    describe('- get3digitMonthName', () => {
        it('success test 1', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 0, 1))).toEqual('янв');
        });

        it('success test 2', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 1, 1))).toEqual('фев');
        });

        it('success test 3', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 2, 1))).toEqual('мар');
        });

        it('success test 4', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 3, 1))).toEqual('апр');
        });

        it('success test 5', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 4, 1))).toEqual('май');
        });

        it('success test 6', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 5, 1))).toEqual('июн');
        });

        it('success test 7', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 6, 1))).toEqual('июл');
        });

        it('success test 8', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 7, 1))).toEqual('авг');
        });

        it('success test 9', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 8, 1))).toEqual('сен');
        });

        it('success test 10', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 9, 1))).toEqual('окт');
        });

        it('success test 11', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 10, 1))).toEqual('ноя');
        });

        it('success test 12', () => {
            expect(get3digitMonthName(new Date(CURRENT_YEAR, 11, 1))).toEqual('дек');
        });
    });

    describe('- createCalendarStringFromISO', () => {
        it('success test', () => {
            expect(createCalendarStringFromISO({ startIsoString: '2023-02-01T06:07:14.200Z', finishIsoString: '2023-03-01T06:07:14.200Z', })).toEqual('01.02.2023 - 01.03.2023');
        });
    });

    describe('- getMonthYearFullString', () => {
        it('success test with past year', () => {
            expect(getMonthYearFullString({
                monthIndex: 0,
                year      : 2021,
            })).toEqual('январь 2021');
        });

        it('success test with current year', () => {
            expect(getMonthYearFullString({
                monthIndex: 11,
                year      : CURRENT_YEAR,
            })).toEqual('декабрь');
        });

        it('success test with current year and capitalize', () => {
            expect(getMonthYearFullString({
                monthIndex: 10,
                year      : CURRENT_YEAR,
                capitalize: true,
            })).toEqual('Ноябрь');
        });

        it('success test with current year and skipCurrentYear = false', () => {
            const year = CURRENT_YEAR;

            expect(getMonthYearFullString({
                monthIndex     : 6,
                year,
                skipCurrentYear: false,
            })).toEqual(`июль ${year}`);
        });
    });

    describe('- getFullDateString', () => {
        it('success test', () => {
            expect(getFullDateString(new Date(2022, 3, 6))).toEqual('6 апреля 2022');
        });
    });

    describe('- getWeekRange', () => {
        it('4 success test', () => {
            expect(getWeekRange(new Date(2022, 10, 1))).toEqual('31 окт 2022 – 6 ноя 2022');
        });

        it('5 success test', () => {
            expect(getWeekRange(new Date(2022, 10, 10))).toEqual('7 – 13 ноя 2022');
        });
    });

    describe('- getQuarterNumber', () => {
        it('1 success test', () => {
            expect(getQuarterNumber(new Date(2022, 0, 1))).toEqual('I');
        });
        it('2 success test', () => {
            expect(getQuarterNumber(new Date(2022, 3, 1))).toEqual('II');
        });
        it('3 success test', () => {
            expect(getQuarterNumber(new Date(2022, 6, 1))).toEqual('III');
        });
        it('4 success test', () => {
            expect(getQuarterNumber(new Date(2022, 9, 1))).toEqual('IV');
        });
    });

    describe('- getCurrentWeekStartDate', () => {
        it('test_1', () => {
            expect(getCurrentWeekStartDate('2024-04-01T03:00:00.918Z')?.toISOString()).toBe('2024-03-31T21:00:00.000Z');
        });

        it('test_2', () => {
            expect(getCurrentWeekStartDate('2024-02-14T03:00:00.918Z')?.toISOString()).toBe('2024-02-11T21:00:00.000Z');
        });

        it('test_3 (start week date)', () => {
            expect(getCurrentWeekStartDate('2023-01-02T03:00:00.918Z')?.toISOString()).toBe('2023-01-01T21:00:00.000Z');
        });
        it('test_4 (end week date)', () => {
            expect(getCurrentWeekStartDate('2023-01-08T03:00:00.918Z')?.toISOString()).toBe('2023-01-01T21:00:00.000Z');
        });

        it('test_5 (last year)', () => {
            expect(getCurrentWeekStartDate('2023-01-01T03:00:00.918Z')?.toISOString()).toBe('2022-12-25T21:00:00.000Z');
        });

        it('test_6', () => {
            expect(getCurrentWeekStartDate('1982-06-03T03:00:00' as TDateISO)?.toISOString()).toBe('1982-05-30T20:00:00.000Z');
        });

        it('test_incorrect', () => {
            expect(getCurrentWeekStartDate({} as TDateISO)).toBeUndefined();
        });
    });

    describe('- addMilliseconds', () => {
        it('should return a new Date object', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1000;

            expect(addMilliseconds(date, timeOffset)).toBeInstanceOf(Date);
        });

        it('should return a new Date object with added milliseconds', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1000;

            expect(addMilliseconds(date, timeOffset).toISOString()).toBe('2021-01-01T00:00:01.000Z');
        });

        it('should handle adding a negative number of milliseconds', () => {
            const date = new Date('2021-01-02T00:00:00.000Z');
            const timeOffset = -1000;

            expect(addMilliseconds(date, timeOffset).toISOString()).toBe('2021-01-01T23:59:59.000Z');
        });
    });

    describe('- addMinutues', () => {
        it('should return a new Date object', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addMinutues(date, timeOffset)).toBeInstanceOf(Date);
        });

        it('should return a new Date object with added minutes', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addMinutues(date, timeOffset).toISOString()).toBe('2021-01-01T00:01:00.000Z');
        });

        it('should handle adding a negative number of minutes', () => {
            const date = new Date('2021-01-02T00:00:00.000Z');
            const timeOffset = -1;

            expect(addMinutues(date, timeOffset).toISOString()).toBe('2021-01-01T23:59:00.000Z');
        });
    });

    describe('- addHours', () => {
        it('should return a new Date object', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addHours(date, timeOffset)).toBeInstanceOf(Date);
        });

        it('should return a new Date object with added hours', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addHours(date, timeOffset).toISOString()).toBe('2021-01-01T01:00:00.000Z');
        });

        it('should handle adding a negative number of hours', () => {
            const date = new Date('2021-01-02T00:00:00.000Z');
            const timeOffset = -1;

            expect(addHours(date, timeOffset).toISOString()).toBe('2021-01-01T23:00:00.000Z');
        });
    });

    describe('- addDays', () => {
        it('should return a new Date object', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addDays(date, timeOffset)).toBeInstanceOf(Date);
        });

        it('should return a new Date object with added days', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addDays(date, timeOffset).toISOString()).toBe('2021-01-02T00:00:00.000Z');
        });

        it('should handle adding a negative number of days', () => {
            const date = new Date('2021-01-02T00:00:00.000Z');
            const timeOffset = -1;

            expect(addDays(date, timeOffset).toISOString()).toBe('2021-01-01T00:00:00.000Z');
        });
    });

    describe('- addMonth', () => {
        it('should return a new Date object', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 1;

            expect(addMonth(date, timeOffset)).toBeInstanceOf(Date);
        });

        it('should return a new Date object with added months', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 5;

            expect(addMonth(date, timeOffset).toISOString()).toBe('2021-06-01T00:00:00.000Z');
        });

        it('should return a new Date object with added year', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = 12;

            expect(addMonth(date, timeOffset).toISOString()).toBe('2022-01-01T00:00:00.000Z');
        });

        it('should handle adding a negative number of months', () => {
            const date = new Date('2021-01-01T00:00:00.000Z');
            const timeOffset = -5;

            expect(addMonth(date, timeOffset).toISOString()).toBe('2020-08-01T00:00:00.000Z');
        });
    });

    // Generated by CodiumAI

    describe('- getNextWeekPeriod', () => {
        it('should return an object with start and end dates for the next week when given a valid date string', () => {
            const dateStr = '2022-01-01T00:00:00.000Z';
            const result = getNextWeekPeriod(dateStr);
            const expectedStartDate = new Date('2022-01-02T21:00:00.000Z');
            const expectedEndDate = new Date('2022-01-09T20:59:59.000Z');

            expect(result).toEqual({ start: expectedStartDate, end: expectedEndDate, });
        });

        it('should return null when getCurrentWeekStartDate returns null', () => {
            const dateStr = 'invalid-date';
            const result = getNextWeekPeriod(dateStr as TDateISO);

            expect(result).toBeUndefined();
        });
    });

    describe('- getNextMonthPeriodDates', () => {
        it('should return an object with start and end dates for the next week when given a valid date string', () => {
            const dateStr = '2022-12-25T00:00:00.000Z';
            const result = getNextMonthPeriodDates(dateStr);
            const expectedStartDate = new Date('2022-12-31T21:00:00.000Z');
            const expectedEndDate = new Date('2023-01-31T20:59:59.000Z');

            expect(result).toEqual({ start: expectedStartDate, end: expectedEndDate, });
        });

        it('should return null when getCurrentWeekStartDate returns null', () => {
            const dateStr = 'invalid-date';
            const result = getNextMonthPeriodDates(dateStr as TDateISO);

            expect(result).toBeUndefined();
        });
    });

    describe('compareDates', () => {
    // Returns an object with 'isEqual' and 'isFirstLess' properties when given two valid ISO date strings
        it('should return an object with \'isEqual\' and \'isFirstLess\' properties when given two valid ISO date strings', () => {
            const date1String = '2022-01-01T00:00:00.000Z';
            const date2String = '2022-01-02T00:00:00.000Z';

            const result = compareDates(date1String, date2String);

            expect(result).toHaveProperty('isEqual');
            expect(result).toHaveProperty('isFirstLess');
        });

        // Returns 'isEqual' as true and 'isFirstLess' as false when given two identical ISO date strings with different timezones
        it('should return \'isEqual\' as true and \'isFirstLess\' as false when given two identical ISO date strings with different timezones', () => {
            const date1String = '2022-01-01T00:00:00.000Z';
            const date2String = '2022-01-01T00:00:00.000Z';

            const result = compareDates(date1String, date2String);

            expect(result.isEqual).toBe(true);
            expect(result.isFirstLess).toBe(false);
        });

        it('should return \'isEqual\' as false and \'isFirstLess\' as false if date1 > date2', () => {
            const date1String = '2022-01-02T00:00:00.000Z';
            const date2String = '2022-01-01T00:00:00.000Z';

            const result = compareDates(date1String, date2String);

            expect(result.isEqual).toBe(false);
            expect(result.isFirstLess).toBe(false);
        });

        it('should return \'isEqual\' as false and \'isFirstLess\' as false if date1 < date2', () => {
            const date1String = '2022-01-02T00:00:00.000Z';
            const date2String = '2022-01-05T00:00:00.000Z';

            const result = compareDates(date1String, date2String);

            expect(result.isEqual).toBe(false);
            expect(result.isFirstLess).toBe(true);
        });

        it('check invalid dates', () => {
            const date1String = '';
            const date2String = {} as Date;
            const result = compareDates(date1String, date2String);

            expect(result.isInvalid).toBe(true);
        });
    });
});