import * as React from 'react';
import { View, Text, Image, StatusBar, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { pxToDp } from '../../../utils/styleKits'
import validator from '../../../utils/validator'
import request from '../../../utils/request';
import { ACCOUNT_LOGIN } from '../../../utils/pathMap'

class Login extends React.Component {
    state = {
        // 手机号码
        phoneNumber: "159121222",
        // 手机号码是否合法
        phoneValid: true
    }

    /** 手机号码修改时触发 */
    phoneNumberChangeText = (phoneNumber) => {
        this.setState({phoneNumber})
    }

    /** 点击手机小键盘【完成】时触发 */
    phoneNumberSubmitEditing = async() => {

        const {phoneNumber} = this.state;
        // 1.对手机号码的合法性进行校验 - 正则
        const phoneValid = validator.validatePhone(phoneNumber);
        this.setState({phoneValid});

        // 1.1.不通过提示
        if (!phoneValid) {
            return ;
        }

        // 2.通过了，将手机号后台发送到对应接口 ->获取验证码
        const res = await request.post(ACCOUNT_LOGIN, {
            phone: phoneNumber
        })

        // 3.将登录页面接换成填写验证码的页面
    }

    render() {
        const {phoneNumber, phoneValid} = this.state;
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
                    </View>
                </View>
            </View>
        )
    }
}

export default Login;