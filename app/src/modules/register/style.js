import { StyleSheet } from 'react-native';

import Color from '../../constants/color';

export const styles = StyleSheet.create({
    containerAll: {
        backgroundColor: Color.DARK,
    },
    containerAllContenteContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",

    },
    containerImage: {
        alignItems: "center",
        paddingBottom: 30,
    }
});