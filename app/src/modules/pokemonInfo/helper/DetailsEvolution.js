import * as React from 'react';
import { StyleSheet, Text, View, FlatList, Animated, Image, Dimensions } from 'react-native';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';


export const DetailsEvolution = ({ onScroll, width, infoEvolution, fade }) => {

    const renderItem = (item) => {
        const width = Dimensions.get("screen").width
        return (
            <View style={{ ...styles.trigger, width }}>
                {item.image ?
                    <>
                        <View style={styles.containerEvolutionItem}>
                            <Text style={{ ...styles.textDefault, fontSize: 24 }}>{item.value}</Text>
                            <Image style={styles.imageItem} source={{ uri: item.image }} />
                        </View>
                        <Text style={{ ...styles.textDefault, fontSize: 20 }}>{item.name}</Text>
                    </>
                    :
                    <>
                        <Text style={{ ...styles.textDefault, ...styles.labelValue, fontSize: 24, width, }}>{item.value}</Text>
                        <Text style={{ ...styles.textDefault, ...styles.labelItem, fontSize: 20, width, }}>{item.name}</Text>
                    </>}
            </View>
        )
    }

    return (
        <View style={{ ...styles.containerEvolutionInfo, width }}>
            <FlatList
                pagingEnabled
                onScroll={onScroll}
                style={styles.flatlist}
                data={infoEvolution}
                nestedScrollEnabled
                decelerationRate="fast"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: "center" }}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => renderItem(item)} />

            <Animated.View style={{ ...styles.icon, opacity: fade }}>
                <IconsMC
                    size={25}
                    color={"white"}
                    style={{ paddingLeft: 10, opacity: infoEvolution.length > 1 ? 1 : 0 }}
                    name={"gesture-swipe-up"} />
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    textDefault: {
        color: "white",
        fontFamily: "Rubik",
        marginHorizontal: 5
    },
    containerEvolutionInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center",
    },
    containerEvolutionItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 5
    },
    imageItem: {
        width: 20,
        height: 20,
    },
    evolutionLabel: {
        opacity: .5,
        paddingBottom: 5
    },
    labelValue: {
        flex: 1,
        paddingTop: 5,
        textAlign: "center",
        textAlignVertical: "bottom",
    },
    labelItem: {
        flex: 1,
        opacity: .5,
        paddingBottom: 5,
        textAlign: "center",
        textAlignVertical: "top",
    },
    flatlist: {
        zIndex: 2,
        flexGrow: 0,
        height: 100,
    },
    icon: {
        paddingLeft: 170,
        position: "absolute",
    },
    trigger: {
        height: 100,
        alignItems: "center",
        justifyContent: "center",
    }
});