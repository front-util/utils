# Front-utils/utils

> **Javascript utilities**

### Base


| name                    | description                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| declOfNum               | Returns a string from the decls array.                                                                                            |
| uuid                    | Returns a UUID string.                                                                                                            |
| iteratorToList          | Returns an array of values from the iterator.                                                                                     |
| createObserver          | Returns an ObserverInstance with subscribe and notify methods.                                                                    |
| randomIntMinMax         | Returns a random integer.                                                                                                         |
| replaceSearchMatch      | Returns a modified string with matches replaced.                                                                                  |
| createSafetyRegString   | Returns a string with escaped special characters.                                                                                 |
| safeHandleDecorate      | Returns a tuple with an error or result.                                                                                          |
| safeHandleDecorateAsync | Returns a promise resolving to a tuple with an error or result.                                                                   |
| shallowCompare          | Utility that checks if two objects have the same keys and values at the first level of depth, without considering nested objects. |

### Check


| name              | description          |
| ----------------- | -------------------- |
| isString          | checks argument type |
| isBoolean         | -                    |
| isFunction        | -                    |
| isNumber          | -                    |
| isObjectType      | -                    |
| isObject          | -                    |
| isAsyncFunction   | -                    |
| isNull            | -                    |
| isUndefined       | -                    |
| isNullOrUndefined | -                    |

### File


| name                  | description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| isEqual2Files         | compares two files based on name, size, and type.                 |
| base64ToBytesBuffer   | converts a Base64 string to an ArrayBuffer.                       |
| fileToBase64          | converts a File to a Base64 string using a FileReader.            |
| base64ToFile          | creates a File from a Base64 string with specified type and name. |
| getBodyFromBase64     | extracts the body from a Base64 string.                           |
| getBase64BodyFromFile | converts a File to a Base64 body string.                          |

### Image


| name                 | description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| getImageMeta         | returns an object containing the image's naturalHeight and naturalWidt |
| getImageMetaFromFile | creates a URL from a File object and calls getImageMeta with this URL. |

### Net


| name              | description                                                                                                          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| downloadByUrl     | creates an anchor element, sets its download and href attributes, and triggers a click to download a file from a URL |
| downloadLocalFile | creates a Blob from a File, generates a URL for it, and calls downloadByUrl.                                         |
| encodeQueryParams | iterates over an object, converts values to strings or JSON, and appends them to a URLSearchParams object            |

### Number


| name                          | description                                                                                                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| numberTo2SignString           | checks if the input is a number and formats it to a two-sign string.                                        |
| numberWithSpaces              | formats a number with spaces as thousands separators and optionally replaces spaces with a custom separator |
| getNumberFromStringWithSpaces | converts a string with spaces into a number, returning 0 if conversion fails.                               |

### Date

1. The code imports necessary utilities and types for date manipulation.
2. It defines constants and functions for formatting and validating dates.
3. Functions are provided to add time intervals (milliseconds, minutes, hours, days, months) to dates.
4. Date formatting functions convert dates to strings in various formats, including localized and ISO formats.
5. Additional functions handle date comparisons and conversions between different date string formats.


| name                                 | example/description/return                                                                                                       |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| format                               | Intl.format (Ru)                                                                                                                 |
| isValidDate                          | check date is valid                                                                                                              |
| addMilliseconds                      | addMilliseconds(date, 5)                                                                                                         |
| addMinutues                          | addMinutues(date, 5)                                                                                                             |
| addHours                             | addHours(date, 5)                                                                                                                |
| addDays                              | addDays(date, 5)                                                                                                                 |
| addMonth                             | addMonth(date, 5)                                                                                                                |
| formatDateWithOptions                | The function attempts to format the date using the Intl.DateTimeFormat constructor with the Russian locale and provided options. |
| get3digitMonthName                   | 'янв'                                                                                                                            |
| toLocalTimeString                    | преобразование времени к псевдо локальному,  в формате ISO8601 (без смещения)                                                    |
|                                      |
| getMaxTimeEndDate                    | -                                                                                                                                |
| getOptionalYear                      | -                                                                                                                                |
| getDateString                        | '1 янв'                                                                                                                          |
| getDateFullString                    | '1 янв 2023'                                                                                                                     |
| getDateRangeString                   | '1 фев – 14 фев'                                                                                                                 |
| getShortDateRangeString              | '1 – 14 фев                                                                                                                      |
| getEnDateStringFromRu                | -                                                                                                                                |
| isValidDateString                    | -                                                                                                                                |
| getDateParamsFromCalendarFormat      | -                                                                                                                                |
| createCalendarStringFromISO          | '01.02.2023 - 01.03.2023'                                                                                                        |
| getMonthNameByIndex                  | 'январь'                                                                                                                         |
| getMonthNameByIndexGenitiveCase      | 'января'                                                                                                                         |
| getMonthNameByIndexPrepositionalCase | 'январе'                                                                                                                         |
| getFullDateString                    | '6 апреля 2022'                                                                                                                  |
| formatDateRangeFromCalendar          | '1 фев – 14 фев'                                                                                                                 |
| getMonthYearFullString               | январь 2021                                                                                                                      |
| getWeekRangeDates                    |                                                                                                                                  |
| getWeekRange                         | '3 – 9 апр'                                                                                                                      |
| getQuarterNumber                     |                                                                                                                                  |
| getQuarterString                     | 'II квартал 2000'                                                                                                                |
| getLocalDateString                   |                                                                                                                                  |
| getFullDatePeriod                    | 26 марта - 26 марта                                                                                                              |
| getCurrentWeekStartDate              |                                                                                                                                  |
| getNextWeekPeriod                    |                                                                                                                                  |
| getNextMonthPeriodDates              |                                                                                                                                  |
| formatShortEndDate                   |                                                                                                                                  |
| compareDates                         |                                                                                                                                  |
