import { Dimensions } from 'react-native'

/** 设计稿宽度 */
const planWidth = 375;
/** 手机宽度 */
export const screenWidth = Dimensions.get('window').width;
/** 手机高度 */
export const screenHeight = Dimensions.get('window').height;

/**
 * 手机元素的宽度/
 * 
 * 设计稿宽度 / 元素宽度 = 手机屏幕宽度 / 手机元素的宽度(高度同理)
 * 手机元素的宽度 = 手机屏幕宽度 * 元素宽度 / 设计稿宽度
 * @param {Number} elePx 元素宽度或高度 单位px
 */
export const pxToDp = (elePx) => screenWidth * elePx / planWidth;