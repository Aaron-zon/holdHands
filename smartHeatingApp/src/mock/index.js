import Mock from 'mockjs';
import * as pathMap from '../utils/pathMap'
const BASE = pathMap.BASE_URI;

Mock.mock(BASE + pathMap.ACCOUNT_LOGIN, 'post', {
    'success': true,
    'code': '10000',
    'CAPTCHA': 111111
})

Mock.mock(BASE + pathMap.ACCOUNT_VALIDATEVCODE, 'post', {
    'success': true,
    'code': '10000',
    'isNew': true
})
