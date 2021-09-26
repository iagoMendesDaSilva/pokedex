import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';


export const ShapeBox = ({ value ,name }) => {

    return (
        <View style={{alignItems:"center"}}>
        <Text style={{ ...styles.textDefault, fontSize: 20 }}>{value}</Text>
        <Text style={{ ...styles.textDefault, fontSize: 16, opacity: .5 }}>{name}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    }
});