import * as React from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, TouchableOpacity, View, StyleSheet } from 'react-native';

import { TabNav } from './tabNav';
import Color from '../constants/color';
import { Auth, Register, Splash, Capture, PokemonInfo } from '../modules';

const Stack = createStackNavigator();

export class StackNav extends React.PureComponent {

    _getHeader(navigation = null) {
        return (
            <View>
                <StatusBar barStyle={"light-content"} backgroundColor={Color.DARK} />
                {navigation &&
                    <TouchableOpacity hitSlop={styles.areaHitSlop}
                        onPress={() => navigation.goBack()} style={styles.arrowBack}>
                        <Icons name={'angle-left'} size={40} color={'white'} />
                    </TouchableOpacity>
                }
            </View>
        )
    }

    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerTitle: false,
                        headerTransparent: true,
                    }}
                    initialRouteName="Splash"
                >
                    <Stack.Screen name="Login" component={Auth} options={{ header: () => this._getHeader() }} />
                    <Stack.Screen name="Welcome" component={TabNav} options={{ header: () => this._getHeader() }} />
                    <Stack.Screen name="Splash" component={Splash} options={{ header: () => this._getHeader() }} />
                    <Stack.Screen name="Register" component={Register} options={{ header: ({ navigation }) => this._getHeader(navigation) }} />
                    <Stack.Screen name="PokemonInfo" component={PokemonInfo} options={{ header: ({ navigation }) => this._getHeader(navigation) }} />
                    <Stack.Screen name="Capture" component={Capture} options={{ header: ({ navigation }) => this._getHeader(navigation) }} />
                </Stack.Navigator>
            </NavigationContainer >
        );
    }
}


const styles = StyleSheet.create({
    arrowBack: {
        width: 40,
        marginLeft: 7,
        marginTop: 2,
    },
    areaHitSlop: {
        left: 50, 
        top: 50, 
        right: 50,
        bottom: 50, 
    }
});