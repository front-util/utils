import * as checkUtils from './utils/check';
import * as dateUtils from './utils/date';
import * as fileUtils from './utils/file';
import * as netUtils from './utils/net';
import * as baseUtils from './utils/base';
import * as numberUtils from './utils/number';
import * as imageUtils from './utils/image';

export * from './utils/index';

const utils = {
    check : checkUtils,
    data  : dateUtils,
    file  : fileUtils,
    net   : netUtils,
    base  : baseUtils,
    number: numberUtils,
    image : imageUtils,
};

export default utils;