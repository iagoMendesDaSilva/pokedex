import { StyleSheet } from 'react-native';

import Color from '../../constants/color';

export const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    pokeball: {
        top: -60,
        width: 60,
        height: 60,
    },
    chances:{
        width: 50,
        height: 50, 
         marginHorizontal: 5
    },
    containerPokeball: {
        position: "absolute",
    },
    pokemon: {
        width: 200,
        height: 200,
    },
    loading: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.DARK
    },
    conatinerMenu: {
        height: 80,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: "rgba(255,255,255,.3)",
    },
    containerInstructions: {
        bottom: 5,
        position: "absolute",
    }
});
