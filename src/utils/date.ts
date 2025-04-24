import { isString } from './check';
import { TDateISO } from '../types';

const EMPTY_CALENDAR_VALUE = '__.__.____';

export const { format, } = new Intl.DateTimeFormat('ru-RU');

export const isValidDate = (dateString: string) => {
    return !isNaN(Date.parse(dateString));
};

export type DateVarTypes = string | number | Date;

export const addMilliseconds = (date: DateVarTypes, ms: number) => new Date(new Date(date).getTime() + ms);

export const addMinutues = (date: DateVarTypes, minutes: number) => addMilliseconds(date, minutes * 60 * 1000);

export const addHours = (date: DateVarTypes, hours: number) => addMinutues(date, hours * 60);

export const addDays = (date: string | number | Date, days: number) => addHours(date, days * 24);

export const addMonth = (date: string | number | Date, months: number) => {
    const targetDate = new Date(date);

    return new Date(targetDate.setMonth(targetDate.getMonth() + months));
};

export const formatDateWithOptions = ({
    date,
    options,
}: {date?: number | Date, options: Intl.DateTimeFormatOptions | undefined}) => {
    try {
        return new Intl.DateTimeFormat('ru-RU', options).format(date);
    } catch(err) {
        console.error(err);
        return '';
    }
};

// example 'янв'
export const get3digitMonthName = (date: Date) => {
    try {
        if(!(date instanceof Date)) {
            return '';
        }
        return new Intl.DateTimeFormat('ru-RU', { month: 'short', })
            .format(date)
            .slice(0, 3);
    } catch(err) {
        console.error('[get3digitMonthName]: некорректный формат даты', date, err);
        return '';
    }
};

// преобразование времени к псевдо локальному,
// в формате ISO8601 (без смещения)
export const toLocalTimeString = (date: Date) => {
    const tzOffset = new Date().getTimezoneOffset();

    return new Date(date.getTime() - tzOffset * 60 * 1000).toISOString().replace('.000Z', '') as TDateISO;
};

export const getMaxTimeEndDate = (date: string) => new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1000);

export const getOptionalYear = (date: Date) => {
    const currentYear = new Date().getFullYear();
    const targetYear = date.getFullYear();

    return currentYear === targetYear ? '' : ` ${targetYear}`;
};

// example: '1 янв'
export const getDateString = (date: Date, withoutYear?: boolean) => {
    const targetDate = new Date(date);
    const month = get3digitMonthName(targetDate);

    return `${targetDate.getDate()} ${month}${!withoutYear ? getOptionalYear(date) : ''}`;
};
// example: '1 янв 2023'
export const getDateFullString = (date: Date) => {
    const targetDate = new Date(date);
    const month = get3digitMonthName(targetDate);

    return `${targetDate.getDate()} ${month} ${targetDate.getFullYear()}`;
};

// example '1 фев – 14 фев'
export const getDateRangeString = (startDateStr: string | Date, endDateStr: string | Date, withoutYear?: boolean) => {
    if(!startDateStr || !endDateStr) {
        return '';
    }
    return `${getDateString(new Date(startDateStr), withoutYear)} – ${getDateString(new Date(endDateStr), withoutYear)}`;
};

// example '1 – 14 фев
export const getShortDateRangeString = (startDateStr: TDateISO | Date, endDateStr: TDateISO | Date) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const isSameMonthDay = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

    if(!isSameMonthDay) {
        return getDateRangeString(startDateStr, endDateStr);
    }
    return `${startDate.getDate()} – ${getDateString(new Date(endDateStr))}`;
};

export const getEnDateStringFromRu = (dateString: string, delimeter = '.') => {
    if(!isString(dateString)) {
        return '';
    }
    const dateArr = dateString.split(delimeter);

    if(dateArr.length !== 3) {
        return '';
    }
    const [day, month, year] = dateArr;

    return `${month}${delimeter}${day}${delimeter}${year}`;
};

export const isValidDateString = (dateString: string, { isRuString, }: { isRuString?: boolean } = {}) => {
    if(isRuString) {
        dateString = getEnDateStringFromRu(dateString);
    }
    return isFinite(Date.parse(dateString));
};

export const getDateParamsFromCalendarFormat = (dateString: string) => {
    let [start, end] = (dateString ?? '-').split('-');

    start = getEnDateStringFromRu(start.trim());
    end = getEnDateStringFromRu(end.trim());
    const hasEmptyValue = start === EMPTY_CALENDAR_VALUE || end === EMPTY_CALENDAR_VALUE;
    const isValidStartDate = isValidDateString(start);
    const isValidEndDate = isValidDateString(end);

    if(!isValidStartDate || !isValidEndDate) {
        return {
            hasEmptyValue,
            start: { isValid: false, },
            end  : { isValid: false, },
        };
    }

    const startArr = start.split('.');
    const endArr = end.split('.');
    const startDate = new Date(start);
    const maxTimeEndDate = getMaxTimeEndDate(end);
    const localAbsoluteDateStartString = toLocalTimeString(startDate);
    const localAbsoluteDateEndString = toLocalTimeString(maxTimeEndDate);

    return {
        hasEmptyValue,
        start: {
            /** ISO string, локальное время без .000Z */
            dateString          : localAbsoluteDateStartString,
            /** ISO string */
            dateStringWithOffset: startDate.toISOString(),
            day                 : +startArr[1],
            month               : get3digitMonthName(new Date(start)),
            year                : startArr[2],
            isValid             : isValidStartDate,
        },
        end: {
            dateString          : localAbsoluteDateEndString,
            dateStringWithOffset: maxTimeEndDate.toISOString(),
            day                 : +endArr[1],
            month               : get3digitMonthName(new Date(end)),
            year                : endArr[2],
            isValid             : isValidEndDate,
        },
    };
};

// example '01.02.2023 - 01.03.2023'
export const createCalendarStringFromISO = ({ startIsoString, finishIsoString, }: {startIsoString: string; finishIsoString: string}) => {
    if(!startIsoString || !finishIsoString) {
        return '';
    }

    return `${format(new Date(startIsoString))} - ${format(new Date(finishIsoString))}`;
};

// example 'январь'
export const getMonthNameByIndex = (index: number, capitalize?: boolean) => {
    const date = new Date(2024, index);
    const monthName = formatDateWithOptions({ date, options: { month: 'long', }, });

    return capitalize ? monthName[0].toUpperCase() + monthName.slice(1) : monthName;
};

// example 'января'
export const getMonthNameByIndexGenitiveCase = (index: number) => {
    return formatDateWithOptions({ date: new Date(2024, index), options: { month: 'long', day: '2-digit', }, })?.split(' ')?.[1];
};

// example 'январе'
export const getMonthNameByIndexPrepositionalCase = (index: number) => {
    const monthName = getMonthNameByIndex(index);
    const notSlicedIndexes = [2, 7];
    const slicedName = notSlicedIndexes.includes(index) ? monthName : monthName.slice(0, monthName.length - 1);

    return `${slicedName}е`;
};

// example '6 апреля 2022'
export const getFullDateString = (date?: Date) => {
    if(!date) {
        return '';
    }

    return `${formatDateWithOptions({ date, options: { month: 'long', day: 'numeric', }, })}${getOptionalYear(date)}`;
};

// example '1 фев – 14 фев'
export const formatDateRangeFromCalendar = (dateString: string) => {
    const { start, end, } = getDateParamsFromCalendarFormat(dateString);

    if(!start.day || !end.day || !start.month || !end.month) {
        return '';
    }

    return `${start.day} ${start.month} – ${end.day} ${end.month}`;
};

// example 'январь 2021'
export const getMonthYearFullString = ({
    monthIndex,
    year,
    skipCurrentYear = true,
    capitalize,
}: {monthIndex: number; year: number; skipCurrentYear?: boolean; capitalize?: boolean;}) => {
    const resultYear = (skipCurrentYear && new Date().getFullYear() === year) ? '' : year;

    return `${getMonthNameByIndex(monthIndex, capitalize)}${resultYear ? ` ${resultYear}` : ''}`;
};

export const getWeekRangeDates = (dateString: TDateISO | Date) => {
    const date = new Date(dateString);
    const day = date.getDay();

    const diff = date.getDate() - day + (day === 0 ? -6 : 1);

    const startDate = new Date(date.setDate(diff));
    const endDate = new Date(startDate);

    endDate.setDate(endDate.getDate() + 6);

    return {
        startDate,
        endDate,
    };
};

// example '3 – 9 апр'
export const getWeekRange = (dateString?: TDateISO | Date) => {
    if(!dateString) {
        return '';
    }
    const { startDate, endDate, } = getWeekRangeDates(dateString);

    return getShortDateRangeString(startDate, endDate);
};

const quarterMap = {
    1: 'I',
    2: 'II',
    3: 'III',
    4: 'IV',
} as Record<number, string>;

export const getQuarterNumber = (date?: Date) => {
    if(!date) {
        return '';
    }
    const number = Math.floor(date.getMonth() / 3 + 1);

    return quarterMap[number];
};

// example 'II квартал 2000'
export const getQuarterString = (dateString: string) => {
    const targetDate = new Date(dateString);

    return `${getQuarterNumber(targetDate)} квартал${getOptionalYear(targetDate)}`;
};

export const getLocalDateString = (dateString: string) => {
    if(isNaN(Date.parse(dateString))) {
        return '';
    }
    return new Date(dateString).toLocaleDateString();
};

// example 26 марта - 26 марта
export const getFullDatePeriod = (startDateStr?: string, endDateStr?: string) => {
    if(!startDateStr || !endDateStr) {
        return '';
    }
    return `${getFullDateString(new Date(startDateStr))} - ${getFullDateString(new Date(endDateStr))}`;
};

export const getCurrentWeekStartDate = (dateStr: TDateISO, firstDayOfWeekIndex: number = 1): Date | undefined => {
    if(!isValidDate(dateStr)) {
        return undefined;
    }

    try {
        const targetDate = new Date(dateStr);
        const dayOfWeek = targetDate.getDay();
        const firstDayOfWeek = new Date(targetDate);
        const diff = dayOfWeek >= firstDayOfWeekIndex ? dayOfWeek - firstDayOfWeekIndex : 6 - dayOfWeek;

        firstDayOfWeek.setDate(targetDate.getDate() - diff);
        firstDayOfWeek.setHours(0, 0, 0, 0);
        return firstDayOfWeek;
    } catch(err) {
        console.error(err);
    }
    return undefined;
};

export const getNextWeekPeriod = (dateStr: TDateISO) => {
    if(!isValidDate(dateStr)) {
        return;
    }
    const nextWeekDate = addDays(new Date(dateStr), 7);
    const start = getCurrentWeekStartDate(nextWeekDate.toISOString() as TDateISO);

    if(!start) {
        return;
    }
    const end = addDays(start, 6);

    return {
        start,
        end: new Date(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59),
    };
};

export const getNextMonthPeriodDates = (dateStr: TDateISO) => {
    if(!isValidDate(dateStr)) {
        return;
    }
    const start = addMonth(new Date(dateStr), 1);
    const end = addMonth(new Date(dateStr), 2);

    return {
        start: new Date(start.getFullYear(), start.getMonth(), 1, 0, 0, 0),
        end  : new Date(end.getFullYear(), end.getMonth(), 0, 23, 59, 59),
    };
};

export const formatShortEndDate = (date: Date) => {
    try {
        const [d, m, y] = date.toLocaleDateString('ru-RU').split('.');

        return `${y}-${m}-${d}`;
    } catch(err) {
        console.error(err);
        return '';
    }
};

export const compareDates = (date1Value: string | Date, date2Value: string | Date) => {
    const date1 = new Date(date1Value);
    const date2 = new Date(date2Value);
    const diff = date1.getTime() - date2.getTime();

    return {
        /** равны */
        isEqual    : diff === 0,
        /** первая меньше */
        isFirstLess: diff < 0,
        /** некорректные даты */
        isInvalid  : !date1Value || !date2Value || Number.isNaN(diff),
    };
};