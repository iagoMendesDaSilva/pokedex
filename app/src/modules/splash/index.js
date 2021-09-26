import { styles } from './style';

import axios from 'axios';
import * as React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, View, Dimensions, Animated, Text } from 'react-native';

import { Token } from '../../services/token';
import { StorageAuth } from '../auth/storage';

export class Splash extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            opacityLogo: new Animated.Value(0),
        }
        this._dimensionScreen = { width: Dimensions.get("screen").width };
    }

    componentDidMount() {
        this._animation(1, 1400);
    }

    _animation(toValue, duration) {
        Animated.timing(
            this.state.opacityLogo,
            {
                toValue,
                duration,
                useNativeDriver: false
            }
        ).start(() => this._checkToken());
    }

    async _refreshTokenLogin() {
        const username = await AsyncStorage.getItem('username');
        const password = await AsyncStorage.getItem('password');
      
        StorageAuth.login(username, password)
            .then(async resp => {
                await Token.refreshToken(resp.token)
                StorageAuth.getDataUser(resp.id)
                    .then(async res => {
                        Token.setItems(resp.token, resp.id, res.username, res.password, res.email)
                        this.props.navigation.navigate("Welcome")
                    })
                    .catch(async err => {
                        console.warn(err);
                        await AsyncStorage.clear();
                        this.props.navigation.replace("Login")
                    })
            })
            .catch(async err => {
                console.warn(err);
                await AsyncStorage.clear();
                this.props.navigation.replace("Login")
            })
    }

    async _checkToken() {
        const token = await AsyncStorage.getItem('token');
        token ? this._refreshTokenLogin() : this.props.navigation.replace("Login")
    }

    render() {
        return (
            <View style={styles.containerAll}>
                <Animated.View style={{ opacity: this.state.opacityLogo }}>
                    <Image source={require('../../assets/img/logo.png')} />
                    <Text style={styles.logoName}>{"Pokédex"}</Text>
                </Animated.View>
            </View>
        )
    }
}