import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';

import Color from '../constants/color';

export const ValidateButton = ({ field, func, load }) => {

    const width = Dimensions.get("screen").width;

    return (
        <TouchableOpacity
            style={{ ...style.button, width: width * .95 }}
            onPress={func}>
            {load ? <ActivityIndicator size={"small"} color={"white"} />
                : <Text style={style.text}>{field}</Text>}
        </TouchableOpacity>
    )
}


const style = StyleSheet.create({
    button: {
        height:45,
        padding: 10,
        marginVertical: 5,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.PRIMARY_COLOR,
    },
    text: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
    }
});