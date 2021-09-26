import { styles } from './style';

import * as React from 'react';
import { StorageHome } from './storage';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Animated, FlatList, Text, ImageBackground, Dimensions, TouchableOpacity, TouchableHighlight, Image } from 'react-native';

import { images } from './images';

export class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            location: 0,
            pokemons: [],
            fadePokemon: new Animated.Value(0),
            fadeInfoPokemon: new Animated.Value(0),
            pokemonInfo: {},
        };
        this.canRequire = true;
        this._dimensionScreen = { width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
    }

    componentDidMount() {
        this._getSortedPokemon(this.state.location)
    }

    _getSortedPokemon(location) {
        if (this.canRequire) {
            this.canRequire = false
            StorageHome.getSortedPokemon(location + 1)
                .then(pokemons => {
                    this.setState({ pokemons, location, fadePokemon: new Animated.Value(0) })
                    this._animated(1, this.state.fadePokemon)
                    this.canRequire = true
                })
                .catch(err => {
                    console.warn(err)
                    this.canRequire = true
                })
        }
    }

    _getPrevLocation() {
        this._getSortedPokemon(this.state.location === 0 ? location = images.background.length - 1
            : location = this.state.location - 1)
    }

    _getNextLocation() {
        this._getSortedPokemon(this.state.location === images.background.length - 1 ? location = 0
            : location = this.state.location + 1)
    }

    _animated(toValue, state, item = false) {
        if (item) {
            const { id, name, front_default,rate } = item;
            this.setState({ pokemonInfo: { name, id, front_default,rate } })
        }
        Animated.timing(state, {
            toValue,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    _renderItem(item, index) {
        return (
            <TouchableHighlight
                style={styles.conatinerPokemon}
                onPress={() => {
                    this.props.navigation.navigate("Capture", { pokemon: this.state.pokemons[index] })
                    this._getSortedPokemon(this.state.location);
                }}
                onLongPress={() => this._animated(1, this.state.fadeInfoPokemon, item)} 
                underlayColor="rgba(255,255,255,.3)"
                onPressOut={() => this._animated(0, this.state.fadeInfoPokemon)} >
                <Animated.Image
                    style={{ ...styles.pokemonPreview, opacity: this.state.fadePokemon }}
                    source={{
                        uri: item.front_default
                    }} />
            </TouchableHighlight>
        )
    }

    _getColorByRate(rate) {
        if (rate >= 30)
            return "green"
        else if (rate >= 10)
            return "orange"
        else
            return "red"
    }

    render() {
        const { width, height } = this._dimensionScreen;
        const { id, name, rate } = this.state.pokemonInfo
        return (
            <ImageBackground
                style={styles.conatinerAll}
                source={images.background[this.state.location].img} >
                <Text style={{ ...styles.title, paddingTop: 5 }}>{images.background[this.state.location].name}</Text>

                <View style={{ ...styles.containerArrows, height: height - 40, width }}>
                    <TouchableOpacity
                        style={styles.leftArrow}
                        hitSlop={styles.areaHitSlop}
                        onPress={() => this._getPrevLocation()}>
                        <Icons name={'angle-left'} size={40} color={"white"} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.rightArrow}
                        hitSlop={styles.areaHitSlop}
                        onPress={() => this._getNextLocation()}>
                        <Icons name={'angle-right'} size={40} color={"white"} />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerPokemons}>
                    <Animated.View
                        style={{ ...styles.containerInfoPokemon, opacity: this.state.fadeInfoPokemon }}>
                        <IconsMC name={"pokeball"} size={30} color={this._getColorByRate(rate)} />
                        <Text style={styles.pokemonInfoText}>{`Nº ${("000" + id).slice(-3)}`}</Text>
                        <Text style={styles.pokemonInfoText}>{name}</Text>
                    </Animated.View>

                    <FlatList horizontal
                        data={this.state.pokemons}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => String(index)}
                        renderItem={({ item, index }) => this._renderItem(item, index)} />
                </View>
            </ImageBackground>
        );
    }
}