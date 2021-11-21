import * as React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { pxToDp } from '../../../utils/styleKits'
import { ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE } from '../../../utils/pathMap';
import validator from '../../../utils/validator'
import request from '../../../utils/request';
import LGButton from '../../../components/LGButton';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
import Toast from '../../../utils/Toast';



class Login extends React.Component {
    state = {
        // 手机号码
        phoneNumber: "15912122211",
        // 手机号码是否合法
        phoneValid: true,
        // 控制显示的画面(获取验证码/登录)
        showLogin: true,
        // 验证码
        vcodeTxt: "",
        // 验证码位数
        CELL_COUNT: 6,
        // 倒计时时间
        btnText: '重新获取',
        // 是否在倒计时中
        isCountDowning: false,
    }

    /** 输入验证码 */
    onVcodeChangeText = (vcodeTxt) => {
        console.log(vcodeTxt)
        this.setState({vcodeTxt})
    }
    /** 开启获取验证码的定时器 */
    countDown = () => {

        if (this.state.isCountDowning) {
            return ;
        }
        this.setState({isCountDowning: true});
        let second = 5;
        // 重新获取（5s）
        this.setState({btnText: `重新获取(${second}s)`})
        let timeId = setInterval(() => {
            second --;

            this.setState({btnText: `重新获取(${second}s)`})
            if (second == 0) {
                clearInterval(timeId);
                this.setState({btnText: `重新获取`})
                this.setState({isCountDowning: false});
            }
        }, 500);
    }

    /** 手机号码修改时触发 */
    phoneNumberChangeText = (phoneNumber) => {
        this.setState({phoneNumber})
    }

    /** 点击手机小键盘【完成】时触发 */
    phoneNumberSubmitEditing = async() => {
        const {phoneNumber} = this.state;
        // // 1.对手机号码的合法性进行校验 - 正则
        const phoneValid = validator.validatePhone(phoneNumber);
        this.setState({phoneValid});

        // // 1.1.不通过提示
        if (!phoneValid) {
            return ;
        }

        // 2.通过了，将手机号后台发送到对应接口 ->获取验证码
        const res = await request.post(ACCOUNT_LOGIN, {
            phone: phoneNumber
        }).then((res) => {
            if (res.code == '10000') {
                // 请求成功
                this.setState({
                    showLogin: false
                });
                this.countDown();
            } else {

            }
        })
        // 3.将登录页面接换成填写验证码的页面
    }

    /** 验证码输入完毕事件 */
    onVcodeSubmitEditing = async() => {
        // 1.对验证码长度进行校验
        // 2.根据手机号码和盐泽和你干嘛 一起发送到后台
        // 3.返回值 新用户还是老用户 isNew
        // 4.新用户 -》完善个人信息页面
        // 5.老用户 -》 交友首页

        const {vcodeTxt, phoneNumber} = this.state;
        // 1.长度校验
        if (vcodeTxt.length != 6) {
            Toast.message('验证码错误', 2000, 'center')
            return ;
        }
        const res = await request.post(ACCOUNT_VALIDATEVCODE, {
            phone: phoneNumber,
            vcode: vcodeTxt
        }).then((res) => {
            if (res.code == '10000') {
                if (res.isNew) {
                    // 新用户
                    alert('新用户');
                    this.props.navigation.navigate("UserInfo");
                } else {
                    // 老用户
                    alert('老用户');
                }
            } else {
                Toast.message('验证码错误', 2000, 'center')
            }
        })
    }

    /** 重新获取按钮 */
    repGetVcode = async() => {
        this.countDown();
    }

    /** 获取验证码 */
    renderLogin = () => {
        const {phoneNumber, phoneValid} = this.state;
        return (
            <View>
                {/* 标题 */}
                <View>
                    <Text style={{fontSize:pxToDp(25), color:'#888', fontWeight:'800'}}>
                        登录
                    </Text>
                </View>
                {/* 输入框 */}
                <View style={{marginTop: pxToDp(30)}}>
                    <Input
                        placeholder='请输入手机号码'
                        maxLength={11}
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        inputStyle={{color:"#333"}}
                        leftIcon={
                            <Icon name='phone' size={pxToDp(24)} color='#333'/>
                        }
                        onChangeText={this.phoneNumberChangeText}
                        onSubmitEditing={this.phoneNumberSubmitEditing}
                        errorStyle={{ color: 'red' }}
                        errorMessage={phoneValid ? '': '手机号码不正确'}
                    />
                </View>
                {/* 登录按钮 */}
                <View style={{width:"75%", height:pxToDp(30), alignSelf:'center'}}>
                    <LGButton style={{borderRadius:20}} onPress={this.phoneNumberSubmitEditing}>获取验证码</LGButton>
                </View>
            </View>
        )
    };

    /** 输入验证码 */
    renderVcode = () => {
        const {phoneNumber, CELL_COUNT, vcodeTxt, btnText, isCountDowning} = this.state;
        return (
            <View>
                <View>
                    <Text style={{fontSize:pxToDp(25),color:'#888',fontWeight:'bold'}}>填写验证码</Text>
                </View>
                <View style={{marginTop:pxToDp(15)}}>
                    <Text style={{color:'#888'}}>已发到：+86 {phoneNumber}</Text>
                </View>
                <View>
                    <CodeField
                    value={vcodeTxt}
                    onChangeText={this.onVcodeChangeText}
                    cellCount={CELL_COUNT}
                    rootStyle={styles.codeFieldRoot}
                    keyboardType="number-pad"
                    onSubmitEditing={this.onVcodeSubmitEditing}
                    renderCell={({index, symbol, isFocused}) => (
                        <Text
                            key={index}
                            style={[styles.cell, isFocused && styles.focusCell]}
                            >
                            {symbol || (isFocused ? <Cursor /> : null)}
                        </Text>
                    )}
                    />
                </View>
                <View style={{marginTop:pxToDp(15),width:"75%", height:pxToDp(30), alignSelf:'center'}}>
                    <LGButton 
                        disabled={isCountDowning}
                        style={{borderRadius:20}} 
                        onPress={this.repGetVcode}>{btnText}</LGButton>
                </View>
            </View>
        );
    }


    render() {
        const {phoneNumber, phoneValid, showLogin} = this.state;
        return (
            <View>
                {/* 0.0 状态栏 */}
                <StatusBar backgroundColor="transparent" translucent={true} />

                {/* 1.0 Logo */}
                <Image source={require('../../../res/logo.jpeg')}
                    style={{width:'100%', height:pxToDp(300)}}
                />

                {/* 2.0 内容区域 */}
                <View style={{padding:pxToDp(20)}}>
                    {/* 2.1 获取验证码 */}
                    {showLogin ? this.renderLogin() : this.renderVcode()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    title: {textAlign: 'center', fontSize: 30},
    codeFieldRoot: {marginTop: 20},
    cell: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      borderBottomWidth: 2,
      borderColor: '#00000030',
      textAlign: 'center',
      color: '#7d53ea'
    },
    focusCell: {
      borderColor: '#7d53ea',
    },
  });

export default Login;