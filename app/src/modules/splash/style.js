import { StyleSheet } from 'react-native';

import Color from '../../constants/color';

export const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.DARK
    },
    logoName: {
        fontSize: 35,
        paddingTop: 10,
        fontFamily: "Rubik-Medium",
        color: Color.PRIMARY_COLOR,
    }
});