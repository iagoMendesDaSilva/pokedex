import { styles } from './style';

import * as React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Image, View, Dimensions, TouchableOpacity, ScrollView, Text } from 'react-native';

import { Token } from '../../services/token';
import { StorageEditUser } from './storage';
import { Input, ValidateButton, MessageModal } from '../../helpers';


export class EditUser extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            username: "",
            isLoading: false,
            confirmPassword: "",
            dontShowPassword: true,
            modal: { title: null, message: null, func: null, input: null, button: null },
        };
        this._dimensionScreen = { width: Dimensions.get("screen").width };
        this.props.navigation.addListener('focus', () => this._getUser());
    }

    componentDidMount() {
        this._getUser()
    }

    async _getUser() {
        const email = await AsyncStorage.getItem("email");
        const username = await AsyncStorage.getItem("username");
        this.setState({ username, email })
    }

    async _updateUser() {
        const id = await AsyncStorage.getItem("id")
        const token = await AsyncStorage.getItem("token")
        const { username, password, confirmPassword, email } = this.state;

        if (password === confirmPassword)
            if (username != "" && email != "" && password != "") {
                this.setState({ isLoading: true })
                StorageEditUser.editUser(username, email, password, id)
                    .then(async _ => {
                        await Token.refreshToken(token)
                        Token.setItems(token, id, username, password, email)
                        this.setState({
                            username: "", password: "", email: "", confirmPassword: "",
                            modal: {
                                title: "Success", message: "Updated user!",
                                func: () => {
                                    this.setState({ modal: {} });
                                }
                            }
                        })
                    })
                    .catch(_ => this.setState({ modal: { title: "Erro", message: "Unable to update user!" } }))
                    .finally(() => this.setState({ isLoading: false }))
            } else
                this.setState({ modal: { title: "Erro", message: "All fields are required" } })
        else
            this.setState({ modal: { title: "Erro", message: "Both passwords must be the same", } })

    }


    async _logout() {
        await AsyncStorage.clear();
        this.props.navigation.replace("Splash")
    }

    render() {
        return (
            <ScrollView
                style={styles.containerAll}
                contentContainerStyle={styles.containerAllContainerStyle}>
                <TouchableOpacity style={styles.containerLogout} onPress={() => this._logout()}>
                    <View style={{ alignItems: "center" }}>
                        <Icons name={"logout"} size={30} color={"white"} />
                        <Text style={styles.textLogout}>{"Logout"}</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ ...styles.containerImage, width: this._dimensionScreen.width * .9 }}>
                    <Image style={{ width: 150, height: 150 }} source={require('../../assets/img/logo.png')} />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Input
                        icon={"email"}
                        type={'email-address'}
                        placeholder={"Email"}
                        defaultValue={this.state.email}
                        onChange={email => this.setState({ email })} />
                    <Input
                        icon={"user-alt"}
                        placeholder={"Username"}
                        defaultValue={this.state.username}
                        onChange={username => this.setState({ username })} />
                    <Input
                        icon={"lock"}
                        placeholder={"Password"}
                        defaultValue={this.state.password}
                        pass={this.state.dontShowPassword}
                        onChange={password => this.setState({ password })}
                        onPress={() => this.setState({ dontShowPassword: !this.state.dontShowPassword })} />
                    <Input
                        icon={"lock"}
                        placeholder={"Confirm Password"}
                        defaultValue={this.state.confirmPassword}
                        pass={this.state.dontShowPassword}
                        onChange={confirmPassword => this.setState({ confirmPassword })} />
                    <ValidateButton
                        field={"Save"}
                        load={this.state.isLoading}
                        func={this._updateUser.bind(this)} />
                </View>
                < MessageModal
                    title={this.state.modal.title}
                    message={this.state.modal.message}
                    visible={this.state.modal.title ? true : false}
                    onPress={
                        this.state.modal.func ? this.state.modal.func :
                            () => this.setState({ modal: {} })
                    }
                />
            </ScrollView>
        );
    }
}