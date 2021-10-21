import Mock from 'mockjs';
import * as pathMap from '../utils/pathMap'
console.log(pathMap);
const BASE = pathMap.BASE_URI;

Mock.mock(BASE + pathMap.ACCOUNT_LOGIN, 'post', {
    success: true,
    'CAPTCHA': 12345
})
