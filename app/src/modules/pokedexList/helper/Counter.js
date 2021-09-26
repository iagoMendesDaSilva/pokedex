import * as React from 'react';

import Color from '../../../constants/color';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';;


export const Counter = ({ title, amount, onPress = false }) => {
    const content = <>
        <Text style={{ ...styles.textDefault, fontSize: 18, opacity: onPress != false ? 1 : .3 }}>{amount}</Text>
        <Text style={{ ...styles.textDefault, opacity: onPress != false ? 1 : .3 }}>{title}</Text>
    </>
    return (
        <View style={{ alignItems: "center" }}>
            {onPress != false ?
                <TouchableOpacity onPress={onPress}>
                    {content}
                </TouchableOpacity>
                : content
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        width: 80,
        textAlign: "center",
        marginHorizontal: 5,
        paddingHorizontal: 5,
        color: Color.DARK_LIGHT,
        fontFamily: "Rubik-RegularI",
    }
});