import { Dimensions, StyleSheet } from 'react-native';

import Color from '../../constants/color';

const size = (Dimensions.get("screen").width-50)/5

export const styles = StyleSheet.create({
    conatinerAll: {
        flex: 1,
        justifyContent: "space-between",
        alignContent: "space-between",
    },
    containerArrows: {
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        justifyContent: "space-between",
    },
    areaHitSlop:{
        left: 50, 
        top: 50,
        right: 50,
        bottom: 50,
    },
    leftArrow: {
        paddingLeft: 5
    },
    rightArrow: {
        paddingRight: 5
    },
    title: {
        fontSize: 24,
        textAlign:"center",
        fontFamily: "Rubik-Regular",
        color: "rgba(255,255,255,.75)",
    },
    conatinerPokemon: {
        width: size,
        margin: 5,
        height: size,
        padding: 5,
        borderRadius: size,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,.5)",
        elevation:7
    },
    containerPokemons:{
        paddingBottom:40,
        alignItems:"center",
    },
    containerInfoPokemon: {
        fontSize: 20,
        padding: 10,
        borderRadius: 25,
        marginBottom:10,
        flexDirection:"row",
        alignItems:"center",
        color: Color.DARK_LIGHT,
        backgroundColor: "rgba(255,255,255,.5)",
        elevation:10
    },
    pokemonInfoText: {
        fontSize: 18,
        color: "white",
        paddingHorizontal:5,
        fontFamily: "Rubik-Regular"
    },
    pokemonPreview: {
        width: size,
        height: size,
    }
});