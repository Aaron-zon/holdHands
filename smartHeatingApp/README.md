# smartHeating
交友app，用来熟悉react-native的小demo

# 模块介绍
    交友
    圈子
    消息
    个人中心
    其他

# 具体功能
## 登录
### 用到的组件
    axios：交互请求
    react-native-elements：UI库，常用组件（输入框）
    react-native-vector-icons：常用图标
    teaset：UI库，弹出框，loding
    react-native-linear-gradient:可渐变色的按钮
    react-native-confirmation-code-field:验证码组件
### 完成的功能
### 其他

## 新用户
### 用到的组件
    react-native-svg-uri：react-native没办法直接使用svg，需要这个插件协助处理
    react-native-datepicker：日历插件
    react-native-picker：
    react-native-image-crop-picker：
    teaset的verlay
    react-native-amap-geolocation: 高德地图 + 定位
### 完成的功能
    1.选择性别
    2.填写昵称
    3.选择生日
    4.自动定位和手动定位
    5.设置头像
### 其他
    1.mobx来共享数据，如手机号码，token和用户id
    2.使用高德地图实现获取定位
    3.封装request实现自动携带token
    4.使用极光推送来注册和登录用户，方便后面即时通讯