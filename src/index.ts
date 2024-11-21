import * as checkUtils from './utils/check';
import * as dateUtils from './utils/date';
import * as fileUtils from './utils/file';
import * as netUtils from './utils/net';
import * as baseUtils from './utils/base';
import * as numberUtils from './utils/number';

export * from './types';

export const utils = {
    check : checkUtils,
    data  : dateUtils,
    file  : fileUtils,
    net   : netUtils,
    base  : baseUtils,
    number: numberUtils,
};