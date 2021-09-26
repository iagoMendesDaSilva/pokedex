import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const TypeBox = ({ color, type }) => {

    return (
        <View style={{ ...styles.containerType, backgroundColor: color }}>
            <Text style={{ ...styles.textDefault, fontSize: 22 }}>{type}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    },
    containerType: {
        width: 150,
        padding: 10,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
    },
});