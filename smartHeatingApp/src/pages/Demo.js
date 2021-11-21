import React, {useState, Component} from 'react';
import {SafeAreaView, Text, StyleSheet, } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

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

class App extends Component {
    state = {
        vcodeTxt: "",
        CELL_COUNT: 6
    }

    onVcodeChangeText = (vcodeTxt) => {
        console.log(vcodeTxt)
        this.setState({vcodeTxt})
    }

    render () {
        const {CELL_COUNT, vcodeTxt} = this.state;
        return (
            <CodeField
                value={vcodeTxt}
                onChangeText={this.onVcodeChangeText}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        >
                        {symbol || (isFocused ? <Cursor /> : null)}
                    </Text>
                )}
            />
        );
    }
}

export default App;