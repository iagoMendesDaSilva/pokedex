import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { Carrousel } from './Carrousel';

export const BasicInfo = ({ color, pokemon, localization, rate, id }) => {
    const width = Dimensions.get("screen").width;
    return (
        <View style={{ ...styles.containerBasicInfo, width, backgroundColor: color }}>
            <View style={{ ...styles.containerHeader, width }}>
                <View >
                    <Text style={{ ...styles.textDefault, fontSize: 16, opacity: .7 }}>{"Area"}</Text>
                    <Text style={{ ...styles.textDefault, fontSize: 18 }}>{localization.charAt(0).toUpperCase() + localization.slice(1)}</Text>
                </View>
                <View >
                    <Text style={{ ...styles.textDefault, fontSize: 16, opacity: .7 }}>{"Rate"}</Text>
                    <Text style={{ ...styles.textDefault, fontSize: 18 }}>{rate}</Text>
                </View>
                <View >
                    <Text style={{ ...styles.textDefault, fontSize: 16, opacity: .7 }}>{"Nº"}</Text>
                    <Text style={{ ...styles.textDefault, fontSize: 18 }}>{`${("000" + id).slice(-3)}`}</Text>
                </View>
            </View>
            <Carrousel color={color} pokemon={pokemon} />
        </View>
    )
}

const styles = StyleSheet.create({
    containerBasicInfo: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    containerHeader: {
        paddingRight:5,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    },
});