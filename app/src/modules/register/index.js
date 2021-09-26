import { styles } from './style';

import * as React from 'react';
import { Image, View, ScrollView } from 'react-native';

import { Token } from '../../services/token';
import { StorageRegister } from './storage';
import { Input, ValidateButton, MessageModal } from '../../helpers';

export class Register extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            modal: {},
            email: "",
            password: "",
            username: "",
            isLoading: false,
            dontShowPassword: true,
        };
    }

    componentWillUnmount() {
        this.setState({ email: "", password: "", username: "", })
    }

    _registerUser() {
        const { username, password, email } = this.state;
        if (username != "" && password != "" && email != "") {
            this.setState({ isLoading: true })
            StorageRegister.register(username, password, email)
                .then(async resp => {
                    await Token.refreshToken(resp.token)
                    Token.setItems(resp.token, resp.id, username, password, email)
                    this.props.navigation.replace("Welcome")
                })
                .catch(() => this.setState({ modal: { title: "Erro", message: "Unable to register, server error!" } }))
                .finally(() => this.setState({ isLoading: false }));
        }
        else
            this.setState({ modal: { title: "Erro", message: "All fields are required" } })
    }


    render() {
        return (
            <ScrollView
                style={styles.containerAll}
                contentContainerStyle={styles.containerAllContenteContainer}>
                <View style={styles.containerImage}>
                    <Image source={require('../../assets/img/logo.png')} />
                </View>
                <View  >
                    <Input
                        icon={"email"}
                        placeholder={"Email"}
                        type={'email-address'}
                        onChange={email => this.setState({ email })} />
                    <Input
                        icon={"user-alt"}
                        placeholder={"Username"}
                        onChange={username => this.setState({ username })} />
                    <Input
                        icon={"lock"}
                        placeholder={"Password"}
                        pass={this.state.dontShowPassword}
                        onChange={password => this.setState({ password })}
                        onPress={() => this.setState({ dontShowPassword: !this.state.dontShowPassword })} />
                    <ValidateButton
                        field={"Sign Up"}
                        load={this.state.isLoading}
                        func={() => this._registerUser()} />
                </View >
                < MessageModal
                    title={this.state.modal.title}
                    message={this.state.modal.message}
                    visible={this.state.modal.title ? true : false}
                    onPress={() => this.setState({ modal: {} })} />
            </ScrollView>
        );
    }
}
