import * as React from 'react';
import Icons from 'react-native-vector-icons/Octicons';
import Icons5 from 'react-native-vector-icons/FontAwesome5';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';

import Color from '../constants/color';

export const Input = ({ placeholder, onChange, defaultValue,type, icon, colorIcon = "white", onPress = false, pass = false }) => {

    const width = Dimensions.get("screen").width;

    return (
        <View style={{ ...style.containerAll, width: width * .95 }}>
            {icon === "email" ?
                <IconsMC style={{ marginRight: 5 }} name={icon} size={20} color={colorIcon} />
                : <Icons5 style={{ marginRight: 5 }} name={icon} size={20} color={colorIcon} />}
            <TextInput
                width={(width * .75)}
                style={style.input}
                autoCorrect={false}
                autoCapitalize='none'
                keyboardType={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                onChangeText={onChange}
                placeholderTextColor={"white"}
                secureTextEntry={pass ? true : false} />
            {
                onPress &&
                <TouchableOpacity
                    style={{ right: 10, position: "absolute" }}
                    onPress={onPress}>
                    <Icons name={pass ? "eye-closed" : "eye"} size={20} color={colorIcon} />
                </TouchableOpacity>

            }
        </View>
    )
}

const style = StyleSheet.create({
    input: {
        fontSize: 18,
        color: "white",
    },
    containerAll: {
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.DARK_LIGHT
    },
});