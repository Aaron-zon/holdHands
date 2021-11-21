import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { pxToDp } from '../../utils/styleKits';

class Index extends Component {

    static defaultProps = {
        style: {},
        textStyle: {}
    }

    render() {
        return (
            <TouchableOpacity disabled={this.props.disabled ? true : false} onPress={this.props.onPress} style={{width:"100%", height:"100%",overflow:'hidden', ...this.props.style}}>
                <LinearGradient start={{x:0,y:0}} end={{x:1,y:0}} 
                    colors={['#9b63cd', '#e0708c']} style={styles.linearGradient}>
                    <Text style={{...styles.buttonText, ...this.props.textStyle}}>
                        {this.props.children}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}
export default Index;

// Later on in your styles..
var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: pxToDp(15),
    paddingRight: pxToDp(15),
    borderRadius: pxToDp(5),
    width: '100%',
    height: '100%',
    jiustifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: pxToDp(18),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});