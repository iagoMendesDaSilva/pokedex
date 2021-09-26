import { StyleSheet } from 'react-native';

import Color from '../../constants/color';

export const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: Color.DARK,
    },
    containerAllContainerStyle: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerImage: {
        flexDirection: "row",
        paddingBottom: 30,
        justifyContent: "center",
    },
    containerLogout: {
        top: 10,
        right: 12,
        position: "absolute",
    },
    textLogout: {
        fontSize: 16,
        color: "white"
    }
});