import { isString } from './check';
import { TDateISO } from '../types';

const EMPTY_CALENDAR_VALUE = '__.__.____';

/**
 * Форматирует дату с помощью Intl.DateTimeFormat с русской локалью
 * @example
 * format(new Date()); // '01.01.2023'
 */
export const { format, } = new Intl.DateTimeFormat('ru-RU');

/**
 * Проверяет, является ли строка валидной датой
 * @param {string} dateString - Строка даты для проверки
 * @returns {boolean} - true, если дата валидная
 * @example
 * isValidDate('2023-01-01'); // true
 * isValidDate('invalid-date'); // false
 */
export const isValidDate = (dateString: string) => {
    return !isNaN(Date.parse(dateString));
};

export type DateVarTypes = string | number | Date;

/**
 * Добавляет миллисекунды к дате
 * @param {DateVarTypes} date - Исходная дата
 * @param {number} ms - Количество миллисекунд для добавления
 * @returns {Date} - Новая дата с добавленными миллисекундами
 * @example
 * addMilliseconds(new Date('2023-01-01'), 1000); // 2023-01-01T00:00:01.000Z
 */
export const addMilliseconds = (date: DateVarTypes, ms: number) => new Date(new Date(date).getTime() + ms);

/**
 * Добавляет минуты к дате
 * @param {DateVarTypes} date - Исходная дата
 * @param {number} minutes - Количество минут для добавления
 * @returns {Date} - Новая дата с добавленными минутами
 * @example
 * addMinutues(new Date('2023-01-01'), 30); // 2023-01-01T00:30:00.000Z
 */
export const addMinutues = (date: DateVarTypes, minutes: number) => addMilliseconds(date, minutes * 60 * 1000);

/**
 * Добавляет часы к дате
 * @param {DateVarTypes} date - Исходная дата
 * @param {number} hours - Количество часов для добавления
 * @returns {Date} - Новая дата с добавленными часами
 * @example
 * addHours(new Date('2023-01-01'), 5); // 2023-01-01T05:00:00.000Z
 */
export const addHours = (date: DateVarTypes, hours: number) => addMinutues(date, hours * 60);

/**
 * Добавляет дни к дате
 * @param {DateVarTypes} date - Исходная дата
 * @param {number} days - Количество дней для добавления
 * @returns {Date} - Новая дата с добавленными днями
 * @example
 * addDays(new Date('2023-01-01'), 7); // 2023-01-08T00:00:00.000Z
 */
export const addDays = (date: string | number | Date, days: number) => addHours(date, days * 24);

/**
 * Добавляет месяцы к дате
 * @param {DateVarTypes} date - Исходная дата
 * @param {number} months - Количество месяцев для добавления
 * @returns {Date} - Новая дата с добавленными месяцами
 * @example
 * addMonth(new Date('2023-01-01'), 3); // 2023-04-01T00:00:00.000Z
 */
export const addMonth = (date: string | number | Date, months: number) => {
    const targetDate = new Date(date);

    return new Date(targetDate.setMonth(targetDate.getMonth() + months));
};

/**
 * Форматирует дату с указанными опциями
 * @param {Object} params - Параметры форматирования
 * @param {number | Date} [params.date] - Дата для форматирования
 * @param {Intl.DateTimeFormatOptions} params.options - Опции форматирования
 * @returns {string} - Отформатированная строка даты
 * @example
 * formatDateWithOptions({ date: new Date('2023-01-01'), options: { year: 'numeric', month: 'long' } }); // 'январь 2023 г.'
 */
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

/**
 * Возвращает трехбуквенное название месяца даты
 * @param {Date} date - Дата
 * @returns {string} - Трехбуквенное название месяца (например, 'янв')
 * @example
 * get3digitMonthName(new Date('2023-01-01')); // 'янв'
 */
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

/**
 * Преобразует дату к локальному времени в формате ISO8601 (без смещения)
 * @param {Date} date - Исходная дата
 * @returns {TDateISO} - Строка даты в формате ISO без миллисекунд и 'Z'
 * @example
 * toLocalTimeString(new Date('2023-01-01T12:00:00Z')); // '2023-01-01T15:00:00' (для московского времени)
 */
export const toLocalTimeString = (date: Date) => {
    const tzOffset = new Date().getTimezoneOffset();

    return new Date(date.getTime() - tzOffset * 60 * 1000).toISOString().replace('.000Z', '') as TDateISO;
};

/**
 * Возвращает максимальное время последнего дня (23:59:59)
 * @param {string} date - Дата в виде строки
 * @returns {Date} - Дата с установленным временем 23:59:59
 * @example
 * getMaxTimeEndDate('2023-01-01'); // 2023-01-01T23:59:59.000Z
 */
export const getMaxTimeEndDate = (date: string) => new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000 - 1000);

/**
 * Возвращает строку года, если он отличается от текущего, иначе пустую строку
 * @param {Date} date - Дата для проверки
 * @returns {string} - Строка года или пустая строка
 * @example
 * // Если текущий год 2023:
 * getOptionalYear(new Date('2023-01-01')); // ''
 * getOptionalYear(new Date('2024-01-01')); // ' 2024'
 */
export const getOptionalYear = (date: Date) => {
    const currentYear = new Date().getFullYear();
    const targetYear = date.getFullYear();

    return currentYear === targetYear ? '' : ` ${targetYear}`;
};

/**
 * Возвращает строку даты в формате "день месяц [год]"
 * @param {Date} date - Дата
 * @param {boolean} [withoutYear] - Не включать год в результат
 * @returns {string} - Строка даты в формате "день месяц [год]"
 * @example
 * getDateString(new Date('2023-01-01')); // '1 янв 2023'
 * getDateString(new Date('2023-01-01'), true); // '1 янв'
 */
export const getDateString = (date: Date, withoutYear?: boolean) => {
    const targetDate = new Date(date);
    const month = get3digitMonthName(targetDate);

    return `${targetDate.getDate()} ${month}${!withoutYear ? getOptionalYear(date) : ''}`;
};

/**
 * Возвращает полную строку даты в формате "день месяц год"
 * @param {Date} date - Дата
 * @returns {string} - Строка даты в формате "день месяц год"
 * @example
 * getDateFullString(new Date('2023-01-01')); // '1 янв 2023'
 */
export const getDateFullString = (date: Date) => {
    const targetDate = new Date(date);
    const month = get3digitMonthName(targetDate);

    return `${targetDate.getDate()} ${month} ${targetDate.getFullYear()}`;
};

/**
 * Возвращает строку диапазона дат в формате "день месяц [год] – день месяц [год]"
 * @param {string | Date} startDateStr - Начальная дата
 * @param {string | Date} endDateStr - Конечная дата
 * @param {boolean} [withoutYear] - Не включать год в результат
 * @returns {string} - Строка диапазона дат
 * @example
 * getDateRangeString('2023-01-01', '2023-02-01'); // '1 янв – 1 фев 2023'
 * getDateRangeString('2023-01-01', '2023-02-01', true); // '1 янв – 1 фев'
 */
export const getDateRangeString = (startDateStr: string | Date, endDateStr: string | Date, withoutYear?: boolean) => {
    if(!startDateStr || !endDateStr) {
        return '';
    }
    return `${getDateString(new Date(startDateStr), withoutYear)} – ${getDateString(new Date(endDateStr), withoutYear)}`;
};

/**
 * Возвращает сокращенную строку диапазона дат в формате "день – день месяц [год]"
 * @param {TDateISO | Date} startDateStr - Начальная дата
 * @param {TDateISO | Date} endDateStr - Конечная дата
 * @returns {string} - Строка диапазона дат, сокращенная если месяц и год совпадают
 * @example
 * getShortDateRangeString('2023-01-01', '2023-01-15'); // '1 – 15 янв'
 * getShortDateRangeString('2023-01-01', '2023-02-01'); // '1 янв – 1 фев 2023'
 */
export const getShortDateRangeString = (startDateStr: TDateISO | Date, endDateStr: TDateISO | Date) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const isSameMonthDay = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();

    if(!isSameMonthDay) {
        return getDateRangeString(startDateStr, endDateStr);
    }
    return `${startDate.getDate()} – ${getDateString(new Date(endDateStr))}`;
};

/**
 * Преобразует русский формат даты (DD.MM.YYYY) в английский (MM.DD.YYYY)
 * @param {string} dateString - Дата в формате DD.MM.YYYY
 * @param {string} [delimeter='.'] - Разделитель
 * @returns {string} - Дата в формате MM.DD.YYYY
 * @example
 * getEnDateStringFromRu('01.12.2023'); // '12.01.2023'
 * getEnDateStringFromRu('01-12-2023', '-'); // '12-01-2023'
 */
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

/**
 * Проверяет валидность строки даты
 * @param {string} dateString - Строка даты
 * @param {Object} [options] - Опции проверки
 * @param {boolean} [options.isRuString] - Является ли строка датой в русском формате (DD.MM.YYYY)
 * @returns {boolean} - true, если дата валидная
 * @example
 * isValidDateString('2023-01-01'); // true
 * isValidDateString('01.01.2023', { isRuString: true }); // true
 */
export const isValidDateString = (dateString: string, { isRuString, }: { isRuString?: boolean } = {}) => {
    if(isRuString) {
        dateString = getEnDateStringFromRu(dateString);
    }
    return isFinite(Date.parse(dateString));
};

/**
 * Извлекает параметры дат из строки календарного формата
 * @param {string} dateString - Строка в формате "DD.MM.YYYY - DD.MM.YYYY"
 * @returns {Object} - Объект с параметрами начальной и конечной даты
 * @example
 * getDateParamsFromCalendarFormat('01.01.2023 - 10.01.2023');
 * // {
 * //   hasEmptyValue: false,
 * //   start: { dateString: '2023-01-01T00:00:00', day: 1, month: 'янв', year: '2023', isValid: true, ... },
 * //   end: { dateString: '2023-01-10T23:59:59', day: 10, month: 'янв', year: '2023', isValid: true, ... }
 * // }
 */
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

/**
 * Создает строку календарного периода из ISO строк дат
 * @param {Object} params - Параметры создания строки
 * @param {string} params.startIsoString - Начальная дата в ISO формате
 * @param {string} params.finishIsoString - Конечная дата в ISO формате
 * @returns {string} - Строка в формате "DD.MM.YYYY - DD.MM.YYYY"
 * @example
 * createCalendarStringFromISO({
 *   startIsoString: '2023-01-01T00:00:00Z',
 *   finishIsoString: '2023-01-31T00:00:00Z'
 * }); // '01.01.2023 - 31.01.2023'
 */
export const createCalendarStringFromISO = ({ startIsoString, finishIsoString, }: {startIsoString: string; finishIsoString: string}) => {
    if(!startIsoString || !finishIsoString) {
        return '';
    }

    return `${format(new Date(startIsoString))} - ${format(new Date(finishIsoString))}`;
};

/**
 * Возвращает название месяца по его индексу (0-11)
 * @param {number} index - Индекс месяца (0-11)
 * @param {boolean} [capitalize] - Нужно ли делать первую букву заглавной
 * @returns {string} - Название месяца
 * @example
 * getMonthNameByIndex(0); // 'январь'
 * getMonthNameByIndex(0, true); // 'Январь'
 */
export const getMonthNameByIndex = (index: number, capitalize?: boolean) => {
    const date = new Date(2024, index);
    const monthName = formatDateWithOptions({ date, options: { month: 'long', }, });

    return capitalize ? monthName[0].toUpperCase() + monthName.slice(1) : monthName;
};

/**
 * Возвращает название месяца в родительном падеже по его индексу (0-11)
 * @param {number} index - Индекс месяца (0-11)
 * @returns {string} - Название месяца в родительном падеже
 * @example
 * getMonthNameByIndexGenitiveCase(0); // 'января'
 */
export const getMonthNameByIndexGenitiveCase = (index: number) => {
    return formatDateWithOptions({ date: new Date(2024, index), options: { month: 'long', day: '2-digit', }, })?.split(' ')?.[1];
};

/**
 * Возвращает название месяца в предложном падеже по его индексу (0-11)
 * @param {number} index - Индекс месяца (0-11)
 * @returns {string} - Название месяца в предложном падеже
 * @example
 * getMonthNameByIndexPrepositionalCase(0); // 'январе'
 */
export const getMonthNameByIndexPrepositionalCase = (index: number) => {
    const monthName = getMonthNameByIndex(index);
    const notSlicedIndexes = [2, 7];
    const slicedName = notSlicedIndexes.includes(index) ? monthName : monthName.slice(0, monthName.length - 1);

    return `${slicedName}е`;
};

/**
 * Возвращает полную строку даты в формате "день месяца год"
 * @param {Date} [date] - Дата
 * @returns {string} - Строка даты в формате "день месяца год"
 * @example
 * getFullDateString(new Date('2023-01-01')); // '1 января 2023'
 */
export const getFullDateString = (date?: Date) => {
    if(!date) {
        return '';
    }

    return `${formatDateWithOptions({ date, options: { month: 'long', day: 'numeric', }, })}${getOptionalYear(date)}`;
};

/**
 * Форматирует строку диапазона дат из календарного формата
 * @param {string} dateString - Строка в формате "DD.MM.YYYY - DD.MM.YYYY"
 * @returns {string} - Строка диапазона дат в формате "день месяц – день месяц"
 * @example
 * formatDateRangeFromCalendar('01.01.2023 - 15.01.2023'); // '1 янв – 15 янв'
 */
export const formatDateRangeFromCalendar = (dateString: string) => {
    const { start, end, } = getDateParamsFromCalendarFormat(dateString);

    if(!start.day || !end.day || !start.month || !end.month) {
        return '';
    }

    return `${start.day} ${start.month} – ${end.day} ${end.month}`;
};

/**
 * Возвращает строку месяца и года
 * @param {Object} params - Параметры форматирования
 * @param {number} params.monthIndex - Индекс месяца (0-11)
 * @param {number} params.year - Год
 * @param {boolean} [params.skipCurrentYear=true] - Не включать год, если он совпадает с текущим
 * @param {boolean} [params.capitalize] - Делать первую букву месяца заглавной
 * @returns {string} - Строка месяца и года
 * @example
 * getMonthYearFullString({ monthIndex: 0, year: 2023 }); // 'январь 2023'
 * getMonthYearFullString({ monthIndex: 0, year: 2023, capitalize: true }); // 'Январь 2023'
 */
export const getMonthYearFullString = ({
    monthIndex,
    year,
    skipCurrentYear = true,
    capitalize,
}: {monthIndex: number; year: number; skipCurrentYear?: boolean; capitalize?: boolean;}) => {
    const resultYear = (skipCurrentYear && new Date().getFullYear() === year) ? '' : year;

    return `${getMonthNameByIndex(monthIndex, capitalize)}${resultYear ? ` ${resultYear}` : ''}`;
};

/**
 * Возвращает даты начала и конца недели для указанной даты
 * @param {TDateISO | Date} dateString - Дата
 * @returns {Object} - Объект с датами начала и конца недели
 * @example
 * getWeekRangeDates('2023-01-04'); // { startDate: Date(2023-01-02), endDate: Date(2023-01-08) }
 */
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

/**
 * Возвращает строку диапазона недели для указанной даты
 * @param {TDateISO | Date} [dateString] - Дата
 * @returns {string} - Строка диапазона недели в формате "день – день месяц"
 * @example
 * getWeekRange('2023-01-04'); // '2 – 8 янв'
 */
export const getWeekRange = (dateString?: TDateISO | Date) => {
    if(!dateString) {
        return '';
    }
    const { startDate, endDate, } = getWeekRangeDates(dateString);

    return getShortDateRangeString(startDate, endDate);
};

/**
 * Возвращает номер квартала (римскими цифрами) для указанной даты
 * @param {Date} [date] - Дата
 * @returns {string} - Номер квартала римскими цифрами (I, II, III, IV)
 * @example
 * getQuarterNumber(new Date('2023-01-01')); // 'I'
 * getQuarterNumber(new Date('2023-04-01')); // 'II'
 */
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

/**
 * Возвращает строку квартала для указанной даты
 * @param {string} dateString - Дата в виде строки
 * @returns {string} - Строка в формате "квартал год"
 * @example
 * getQuarterString('2023-01-01'); // 'I квартал 2023'
 */
export const getQuarterString = (dateString: string) => {
    const targetDate = new Date(dateString);

    return `${getQuarterNumber(targetDate)} квартал${getOptionalYear(targetDate)}`;
};

/**
 * Возвращает локализованную строку даты
 * @param {string} dateString - Дата в виде строки
 * @returns {string} - Локализованная строка даты
 * @example
 * getLocalDateString('2023-01-01'); // '01.01.2023'
 */
export const getLocalDateString = (dateString: string) => {
    if(isNaN(Date.parse(dateString))) {
        return '';
    }
    return new Date(dateString).toLocaleDateString();
};

/**
 * Возвращает полную строку периода дат
 * @param {string} [startDateStr] - Начальная дата
 * @param {string} [endDateStr] - Конечная дата
 * @returns {string} - Строка в формате "день месяца год - день месяца год"
 * @example
 * getFullDatePeriod('2023-01-01', '2023-01-31'); // '1 января 2023 - 31 января 2023'
 */
export const getFullDatePeriod = (startDateStr?: string, endDateStr?: string) => {
    if(!startDateStr || !endDateStr) {
        return '';
    }
    return `${getFullDateString(new Date(startDateStr))} - ${getFullDateString(new Date(endDateStr))}`;
};

/**
 * Возвращает дату начала текущей недели для указанной даты
 * @param {TDateISO} dateStr - Дата в ISO формате
 * @param {number} [firstDayOfWeekIndex=1] - Индекс первого дня недели (0 - воскресенье, 1 - понедельник)
 * @returns {Date | undefined} - Дата начала недели или undefined при ошибке
 * @example
 * getCurrentWeekStartDate('2023-01-04T00:00:00'); // Date(2023-01-02)
 */
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

/**
 * Возвращает даты начала и конца следующей недели для указанной даты
 * @param {TDateISO} dateStr - Дата в ISO формате
 * @returns {Object | undefined} - Объект с датами начала и конца следующей недели
 * @example
 * getNextWeekPeriod('2023-01-04T00:00:00');
 * // { start: Date(2023-01-09), end: Date(2023-01-15T23:59:59) }
 */
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

// example Октябрь 2024/октябрь/октябрь 2024
export const getMonthYearFullStringFromDate = (dateInfo?: string | Date, skipCurrentYear: boolean = false) => {
    if(!dateInfo) {
        return '-';
    }
    const date = new Date(dateInfo);

    return getMonthYearFullString({
        monthIndex: date.getMonth(),
        year      : date.getFullYear(),
        capitalize: true,
        skipCurrentYear,
    });
};

// example 2025-02-05
export const getIsoStringWithoutTime = (date: Date) => {
    return date.toISOString().split('T')[0];
};

export const getMonthFromDate = (dateStr: string, capitalize?: boolean) => {
    try {
        const monthIndex = new Date(dateStr).getMonth();

        return getMonthNameByIndex(monthIndex, capitalize ?? true);
    } catch(_) {
        return '';
    }
};