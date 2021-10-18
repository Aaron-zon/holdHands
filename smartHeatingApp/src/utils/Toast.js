import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Toast,Theme } from 'teaset';


let customKey = null;
Toast.showLoding = (text) => {
    console.log("show loding ")
    if (customKey)  return;
    customKey = Toast.show({
        text,
        icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor}></ActivityIndicator>,
        position: 'center',
        duration: 5000,
    });
}

Toast.hideLoding = () => {
    if (!customKey) return;
    Toast.hide(customKey);
    customKey = null;
}

export default Toast;