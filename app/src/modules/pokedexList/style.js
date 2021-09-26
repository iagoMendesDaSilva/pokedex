import { StyleSheet } from 'react-native';

import Color from '../../constants/color';

export const styles = StyleSheet.create({
    containerAll: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    containerPokemon: {
        margin: 5,
        padding: 5,
        borderRadius: 7,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.PRIMARY_COLOR,
    },
    containerMyPokemon: {
        marginTop: 7,
        padding: 5,
        borderRadius: 7,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Color.PRIMARY_COLOR,
    },
    imageMyPokemon: {
        width: 75,
        height: 75,
    },
    containerInformationMyPokemon: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerHeaderMyPokemon: {
        height: 75,
        flexDirection: "row",
    },
    flatlist: {
        flexDirection: 'column',
    },
    flatlistContentContainer: {
        paddingBottom: 7,
        alignItems: "center",
    },
    containerInformation: {
        paddingVertical: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: Color.POKEDEX_LIST_DARK
    },
    pokemonUnknown: {
        fontSize: 18,
        textAlign: "center",
        textAlignVertical: "center",
        color: Color.DARK_LIGHT,
    },
    title: {
        padding: 7,
        fontSize: 22,
        color: Color.PRIMARY_COLOR,
    },
    textDefault: {
        fontSize: 16,
        color: Color.DARK_LIGHT,
        fontFamily: "Rubik-Regular",
    }
});