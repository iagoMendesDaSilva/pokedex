import * as React from 'react';
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import IconsFA from 'react-native-vector-icons/FontAwesome';

import { StyleSheet, Text, ScrollView, Image, View } from 'react-native';;

const sizePokemon = 200;

export const Carrousel = ({ pokemon, color }) => {

    const getGender = (text, genderless, male) => {
        let img = { name: "", shiny: false }

        if (text.includes('shiny')) img.shiny = true;
        if (text.includes('female')) img.name = 'Female'
        if (text.includes("default")) male ? img.name = "Male" : img.name = "Female"
        if (genderless) img.name = "Genderless";

        return (
            <View style={styles.conatinerGender}>
                {genderless ? <IconsFA name={img.name.toLowerCase()} size={20} color={"white"} />
                    : <Icons name={img.name.toLowerCase()} size={20} color={"white"} />}
                <Text style={styles.textPokemon}>{img.shiny ? `${img.name} Shiny` : img.name}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
                <LinearGradient
                    end={{ x: 1, y: 0 }} start={{ x: 0, y: 0 }}
                    colors={[color, "rgba(20, 20,  20, 0)"]}
                    style={styles.fadeCarrousel} />
                <ScrollView
                    horizontal
                    pagingEnabled
                    decelerationRate="fast"
                    scrollEventThrottle={sizePokemon}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ width: `${100 * pokemon.sprites.length}%` }}>
                    {pokemon.sprites.map((item, index) =>
                        <View style={styles.containerPokemon} key={String(index)}>
                            <Image style={styles.imagePokemon} source={{ uri: item.value }} />
                            {getGender(item.name, pokemon.genderless, pokemon.male,)}
                        </View>
                    )}
                </ScrollView>
                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    colors={["rgba(20, 20,  20, 0)", color]}
                    style={{ ...styles.fadeCarrousel, left: 175 }}
                />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: sizePokemon,
    },
    containerPokemon: {
        alignItems: "center"
    },
    imagePokemon: {
        width: sizePokemon,
        height: sizePokemon
    },
    textPokemon: {
        color: "white",
        fontSize: 20,
        fontFamily: "Rubik-Regular",
        paddingHorizontal: 3
    },
    conatinerGender: {
        flexDirection: "row",
        alignItems: "center"
    },
    fadeCarrousel: {
        width: 25,
        zIndex: 2,
        height: 225,
        position: 'absolute',
    }
});