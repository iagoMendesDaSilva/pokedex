import { styles } from './style';

import * as React from 'react';
import { Image, View, ScrollView, TouchableOpacity, Text } from 'react-native';

import { Token } from '../../services/token';
import { StorageAuth } from './storage';
import { Input, ValidateButton, MessageModal } from '../../helpers';
import { set } from 'react-native-reanimated';


export class Auth extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            modal: {},
            username: "",
            password: "",
            isLoading: false,
            dontShowPassword: true,
        };
    }

    _login() {
        const { username, password } = this.state;
        this.setState({ isLoading: true })
        StorageAuth.login(username, password)
            .then(async resp => {
                await Token.refreshToken(resp.token)
                StorageAuth.getDataUser(resp.id)
                    .then(res => {
                        Token.setItems(resp.token, resp.id, username, password, res.email)
                        this.props.navigation.replace("Welcome")
                    })
                    .catch(err =>
                        this.setState({ modal: { title: "Erro", message: "Invalid to get data" } }))
            })
            .catch(err => this.setState({ modal: { title: "Erro", message: err == undefined ? "Server Error!" : "Invalid username or password!" } }))
            .finally(() => this.setState({ isLoading: false }))
    }

    render() {
        return (
            <ScrollView
                style={styles.containerAll}
                contentContainerStyle={styles.containerAllContenteContainer}>
                <View style={styles.containerImage}>
                    <Image source={require('../../assets/img/logo.png')} />
                </View>
                <>
                    <Input
                        icon={"user-alt"}
                        placeholder={'Username'}
                        onChange={username => this.setState({ username })} />
                    <Input
                        icon={"lock"}
                        placeholder={'Password'}
                        pass={this.state.dontShowPassword}
                        onChange={password => this.setState({ password })}
                        onPress={() => this.setState({ dontShowPassword: !this.state.dontShowPassword })} />
                </ >

                <ValidateButton
                    field={"Login"}
                    load={this.state.isLoading}
                    func={() => this._login()} />

                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")}>
                    <Text style={styles.link}>{"No account? Create one!"}</Text>
                </TouchableOpacity>

                < MessageModal
                    title={this.state.modal.title}
                    message={this.state.modal.message}
                    visible={this.state.modal.title ? true : false}
                    onPress={() => this.setState({ modal: {} })}
                />
            </ScrollView>
        );
    }
}