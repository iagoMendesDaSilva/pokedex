import { styles } from './style'

import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image, View, TouchableOpacity, Text, FlatList, Dimensions, ActivityIndicator } from 'react-native';

import Color from '../../constants/color';
import { Counter } from './helper/Counter';
import { StorageBackpack } from './storage';
import { MessageModal } from '../../helpers';


export class PokedexList extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            pokedex: [],
            pokedexCaptured: [],
            myPokemon: false,
            counters: {
                pokemon_amount: 0,
                sighted_amount: 0,
                unsighted_amount: 0,
                captured_amount: 0
            },
            modal: {},
        };
        this.props.navigation.addListener('focus', () => this._getBackPack());
        this._dimensionScreen = { width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
    }

    componentDidMount() {
        this._getBackPack();
    }

    async _getBackPack() {
        StorageBackpack.getBackPack()
            .then(resp => {
                const { pokemon_amount, sighted_amount, unsighted_amount, captured_amount, pokemon } = resp
                this.setState({
                    counters: {
                        pokemon_amount,
                        sighted_amount,
                        unsighted_amount,
                        captured_amount,
                    },
                })
                this._fillPokedex(pokemon)
            })
            .catch(_ => this.setState({ modal: { title: "Erro", message: "Unable to access data" } }))
    }

    _fillPokedex(pokemons) {
        let pokedexCaptured = [];
        let pokedex = Array(this.state.counters.pokemon_amount).fill({});

        pokedex.forEach((_, index) => {
            const found = pokemons.find(item => item.id_pokemon === index + 1)
            if (found)
                pokedex[index] = found;
        });

        pokemons.forEach(item => {
            if (item.captured)
                pokedexCaptured.push(item)
        });

        this.setState({ pokedex, pokedexCaptured })
    }

    _renderItem(item, index) {
        const size = (this._dimensionScreen.width / 4) - 10
        const content = item.id_pokemon ?
            <Image
                source={{ uri: item.image }}
                tintColor={item.captured ? "" : "black"}
                style={{ opacity: item.captured ? 1 : 0.3, width: size, height: size }} />
            :
            <Text style={{ ...styles.pokemonUnknown }}>{index + 1}</Text>

        return (
            <View key={String(index)}
                style={{ ...styles.containerPokemon, width: size, height: size }} >
                {item.captured && item.id_pokemon ?
                    <TouchableOpacity onPress={() =>
                        this.props.navigation.navigate("PokemonInfo", { id: item.id_pokemon })}>{content}
                    </TouchableOpacity>
                    : content
                }
            </View>)
    }

    _getDate(date) {
        const correctDate = date.split(" ")[0].split("/");
        const year = correctDate[0];
        correctDate.shift();
        return `${correctDate.join('/')}/${year}`
    }

    _renderItemMyPokemon(item, index) {
        return (
            <TouchableOpacity
                key={String(index)}
                style={{ ...styles.containerMyPokemon, width: this._dimensionScreen.width * .95 }}
                onPress={() => this.props.navigation.navigate("PokemonInfo", { id: item.id_pokemon })}>
                <Image
                    source={{ uri: item.image }}
                    style={styles.imageMyPokemon} />
                <View style={styles.containerInformationMyPokemon}>
                    <View >
                        <Text style={{ ...styles.textDefault, fontWeight: "bold" }}>
                            {item.nickname ? item.nickname.charAt(0).toUpperCase() + item.nickname.slice(1) : item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
                        <Text style={styles.textDefault}>{this._getDate(item.date)}</Text>
                        <Text style={styles.textDefault}>{item.date.split(" ")[1]}</Text>
                    </View>
                    <View style={styles.containerHeaderMyPokemon}>
                        <Text style={{ ...styles.textDefault, margin: 3 }}>{`#${("000" + item.id_pokemon).slice(-3)}`}</Text>
                        <Text style={{ ...styles.textDefault, margin: 3, }}>{item.name}</Text>
                    </View>
                </View>
            </TouchableOpacity>)
    }

    render() {
        const { pokemon_amount, sighted_amount, captured_amount, unsighted_amount } = this.state.counters
        return (
            <LinearGradient
                style={styles.containerAll}
                colors={[Color.POKEDEX_LIST, Color.POKEDEX_LIST_DARK]}>
                {this.state.pokedex.length > 0 ?
                    <View style={{ flex: 1 }}>
                        <FlatList
                            key={this.state.myPokemon}
                            keyExtractor={(_, index) => String(index)}
                            numColumns={this.state.myPokemon ? 1 : 4}
                            contentContainerStyle={styles.flatlistContentContainer}
                            style={{ ...styles.flatlist, width: this._dimensionScreen.width }}
                            data={this.state.myPokemon ? this.state.pokedexCaptured : this.state.pokedex}
                            renderItem={({ item, index }) =>
                                this.state.myPokemon ?
                                    this._renderItemMyPokemon(item, index)
                                    : this._renderItem(item, index)} />
                        <View style={styles.containerInformation}>
                            <Counter
                                title={"Total"}
                                amount={pokemon_amount}
                                onPress={() => this.setState({ myPokemon: false })} />
                            <Counter
                                title={"Captured"}
                                amount={captured_amount}
                                onPress={this.state.pokedexCaptured.length > 0 ?
                                    () => this.setState({ myPokemon: true }) : false} />
                            <Counter
                                title={"Known"}
                                amount={sighted_amount} />
                            <Counter
                                title={"Unknown"}
                                amount={unsighted_amount} />
                        </View>
                    </View>
                    : <ActivityIndicator size="large" color={"white"} />
                }
                < MessageModal
                    title={this.state.modal.title}
                    message={this.state.modal.message}
                    visible={this.state.modal.title ? true : false}
                    onPress={() => this.setState({ modal: {} })}
                />
            </LinearGradient>
        );
    }
}