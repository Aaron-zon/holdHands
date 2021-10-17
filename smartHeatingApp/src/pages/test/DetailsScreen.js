import * as React from 'react';
import { Button, View, Text } from 'react-native';

function DetailsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DetailsScreen</Text>
            <Button title="GO TO Home" onPress={() => navigation.navigate('Home')} />
            <Button title="GO TO Login" onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

export default DetailsScreen;