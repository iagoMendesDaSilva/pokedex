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
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    },
    containerInfo: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 5,
        alignItems: "center",
    },
    containerTypes: {
        width: 310,
        paddingTop: 20,
        flexDirection: "row",
    },
    containerType: {
        padding: 10,
        borderRadius: 20,
        width: 150,
        justifyContent: "center",
        alignItems: "center"
    },
    containerShapes: {
        paddingTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    instruction: {
        bottom: 5,
        position: "absolute",
        alignItems: "center",
    }
});