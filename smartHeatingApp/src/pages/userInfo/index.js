import * as React from 'react';
import { View, Text, Image, StatusBar, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import { Input } from 'react-native-elements'
import { pxToDp, pxtoHt } from '../../utils/styleKits';
import SvgUri from 'react-native-svg-uri';
import { male, female } from '../../res/fonts/iconSvg';
import DatePicker from 'react-native-datepicker';

class UserInfo extends React.Component {

    state = {
        // 用户昵称
        nickname: '',
        // 性别
        gender: '男',
        // 生日
        birthoday: '',
        // 城市
        city: '',
        // 头像地址
        header: '',
        // 经度
        lng: '',
        // 维度
        lat: '',
        // 详细地址
        address: ''
    }

    // 选择性别
    chooeseGender = (gender) => {
        this.setState({gender})
    }

    render() {
        const { gender, nickname, birthoday } = this.state;
        const dateNow = new Date();
        const currentDate = `${dateNow.getFullYear()}- ${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
        
        return (
            <View style={{backgroundColor:'#fff', flex:1,padding:pxToDp(20),paddingTop:pxToDp(10)}}>
                <StatusBar translucent={false} />
                {/* 1.0 标题 开始 */}
                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold'}}>填写资料</Text>
                <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold'}}>提升我的魅力</Text>
                {/* 1.0 标题 结束 */}

                {/* 2.0 性别 开始 */}
                <View style={{marginTop:pxToDp(20),}}>
                    <View style={{width:'60%',flexDirection:'row', alignSelf:'center', justifyContent:'space-around'}}>
                        <TouchableOpacity 
                            onPress={this.chooeseGender.bind(this, '男')}
                            style={{width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),
                                backgroundColor:gender==='男' ? '#f40' : '#eee',
                                justifyContent:'center',alignItems:'center'}}>
                            <SvgUri svgXmlData={male} width="36" height="36" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={this.chooeseGender.bind(this, '女')}
                            style={{width:pxToDp(60),height:pxToDp(60),borderRadius:pxToDp(30),
                                backgroundColor:gender==='女'?'#f40':'#eee',
                                justifyContent:'center',alignItems:'center'}}>
                            <SvgUri svgXmlData={female} width="36" height="36" />
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* 2.0 性别 结束 */}

                {/* 3.0 昵称 */}
                <View>
                    <Input 
                        value={nickname}
                        placeholder="设置昵称"
                        onChangeText={(nickname) => this.setState({nickname})}
                    />
                    
                </View>
                {/* 3.0 昵称 结束 */}

                {/* 4.0 日期 */}
                <DatePicker
                androidMode="spinner"
                    style={{width: "100%"}}
                    date={birthoday}
                    mode="date"
                    placeholder="设置生日"
                    format="YYYY-MM-DD"
                    minDate="1900-01-01"
                    maxDate={currentDate}
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    customStyles={{
                        dateIcon: {
                            display: 'none'
                        },
                        dateInput: {
                            marginLeft: pxToDp(10),
                            borderWidth: 0,
                            borderBottomWidth: pxToDp(1.1),
                            alignItems:'flex-start',
                            paddingLeft:pxToDp(4)
                        },
                        placeholderText: {
                            fontSize:pxToDp(18),
                            color: '#afafaf'
                        }
                    }}
                    onDateChange={(birthoday) => {this.setState({birthoday})}}
                />
                {/* 4.0 日期 结束 */}
            </View>
        );
    }
}

let style = StyleSheet.create({

})

export default UserInfo;