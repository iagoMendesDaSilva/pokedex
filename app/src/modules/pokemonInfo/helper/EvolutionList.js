import * as React from 'react';
import Icons from 'react-native-vector-icons/MaterialIcons';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Image, FlatList, TouchableOpacity, Animated, View, Dimensions } from 'react-native';


export const EvolutionList = ({ evolutions, onScroll, onPress, fade, image }) => {

    const renderItem = (item, index) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center",}}>
                <TouchableOpacity onPress={() => onPress(item)}>
                    <Image style={styles.image} source={{ uri: item.image }} />
                </TouchableOpacity>
                { index + 1 != evolutions.pokemons.length && evolutions.regular &&
                    <Icons style={{ paddingRight: 10 }} name={"arrow-forward-ios"} size={20} color={"white"} />}
            </View>
        )
    }

    return (
        <View style={{ ...styles.containerEvolutionChain,  width: Dimensions.get("screen").width }}>
            {evolutions.pokemons.length > 0 &&
                <>
                    <Image
                        style={{ ...styles.image }}
                        source={{ uri: image }} />
                    <Icons
                        size={20}
                        color={"white"}
                        style={{ paddingRight: 10 }}
                        name={"arrow-forward-ios"} />
                </>
            }

            <FlatList
                pagingEnabled
                onScroll={onScroll}
                nestedScrollEnabled
                decelerationRate="fast"
                data={evolutions.pokemons}
                horizontal={evolutions.regular}
                style={{ flexGrow: 0, zIndex: 2, }}
                scrollEnabled={!evolutions.regular}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => String(index)}
                contentContainerStyle={{ alignItems: "center" }}
                renderItem={({ item, index }) =>
                    <View style={{ ...styles.containerEvolution }}>
                        {renderItem(item, index)}
                    </View>} />

            {!evolutions.regular &&
                <Animated.View style={{...styles.icon, opacity: fade }}>
                    <IconsMC
                        size={25}
                        color={"white"}
                        style={{ paddingLeft: 10 }}
                        name={"gesture-swipe-up"} />
                </Animated.View>}
        </View>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    },
    containerEvolutionChain: {
        height: 100,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 100,
        height: 100,
    },
    containerEvolution: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    icon:{
        paddingLeft: 250,
        position: "absolute", 
    }
});