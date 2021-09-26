import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/FontAwesome5';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Color from '../constants/color';
import { PokedexList, Home, EditUser } from '../modules';

const Tab = createBottomTabNavigator();

export class TabNav extends React.PureComponent {


    _getNameIconByRoute(name) {
        switch (name) {
            case "Pokedex":
                return "list"
            case "Edit User":
                return "user-edit";
            case "Home":
                return "pokeball";
        }
    }

    _getIconsByRoute(name, focused) {
        const nameIcon = this._getNameIconByRoute(name)
        return name === "Home" ?
            <LinearGradient
                colors={[Color.PRIMARY_COLOR, Color.PRIMARY_COLOR_DARK]}
                style={[styles.middleTab, {
                    top: focused ? -22.5 : 2.5,
                    backgroundColor: focused ? Color.PRIMARY_COLOR : "rgba(255,255,255,.5)"
                }]}>
                <IconsMC name={nameIcon} size={40} color={"white"} />
            </LinearGradient>
            :
            <View style={{ position: 'absolute', top: focused ? 10 : 20 }}>
                <Icons name={nameIcon} size={20} color={focused ? Color.PRIMARY_COLOR : "rgba(255,255,255,.5)"} />
            </View>
    }

    _getLabelByRoute(name, focused) {
        return (
            focused &&
            <Text style={styles.label} >{name === 'Home' ? 'Exploration' : name}</Text>
        )
    }


    render() {
        return (
            <Tab.Navigator
                initialRouteName={"Home"}
                tabBarOptions={{ style: { backgroundColor: Color.DARK_PLUS, height: 60 } }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused }) => this._getIconsByRoute(route.name, focused),
                    tabBarLabel: ({ focused }) => this._getLabelByRoute(route.name, focused),
                })}>
                <Tab.Screen name="Pokedex" component={PokedexList} />
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Edit User" component={EditUser} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 15,
        paddingBottom: 2,
        color: Color.PRIMARY_COLOR
    },
    middleTab: {
        position: 'absolute',
        height: 55,
        width: 55,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center'
    }
});