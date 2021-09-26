import { styles } from './style';

import * as React from 'react';
import IconsMC from 'react-native-vector-icons/MaterialCommunityIcons';
import { View, Dimensions, Animated, ActivityIndicator, Text, ScrollView } from 'react-native';

import Color from '../../constants/color';
import { MessageModal } from '../../helpers';
import { StoragePokemonInfo } from './storage';
import { TypeBox, ShapeBox, BasicInfo, DetailsEvolution, EvolutionList } from './helper/';


export class PokemonInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
            pokemon: null,
            infoEvolution: [{}],
            showInstructionTap: true,
            showInstructionsDetails: true,
            showInstructionsEvolutions: true,
            fadeInstructionsTap: new Animated.Value(0),
            fadeInstructionsDetails: new Animated.Value(0),
            fadeInstructionsEvolutions: new Animated.Value(0),
        }
        this._dimensionScreen = { width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
    }

    async componentDidMount() {
        this._getPokemon();
    }

    async _getPokemon() {
        StoragePokemonInfo.getPokemon(this.props.route.params.id)
            .then(pokemon => {
                this.setState({ pokemon })
            })
            .catch(_ => this.setState({ modal: { title: "Erro", message: "Unable get data" } }))
    }

    _showInstructionsTapInterval(interval = 3000) {
        const { pokemons } = this.state.pokemon.evolutions;
        let intervalTap = setInterval(async () => {
            if (this.state.showInstructionTap && pokemons.length > 0 && pokemons[0].details.length > 0) {
                await this._animationFadeInstructions(1, this.state.fadeInstructionsTap);
                await this._animationFadeInstructions(0, this.state.fadeInstructionsTap);
            }
            else {
                clearInterval(intervalTap)
            }
        }, interval);
    }

    _showInstructionsDetailsInterval(interval = 3000) {
        let intervalDetails = setInterval(async () => {
            if (this.state.showInstructionsDetails) {
                await this._animationFadeInstructions(1, this.state.fadeInstructionsDetails);
                await this._animationFadeInstructions(0, this.state.fadeInstructionsDetails);
            }
            else {
                clearInterval(intervalDetails)
            }
        }, interval);
    }

    _showInstructionsEvolutionsInterval(interval = 3000) {
        let intervalEvolutions = setInterval(async () => {
            if (this.state.showInstructionsEvolutions) {
                await this._animationFadeInstructions(1, this.state.fadeInstructionsEvolutions);
                await this._animationFadeInstructions(0, this.state.fadeInstructionsEvolutions);
            }
            else {
                clearInterval(intervalEvolutions)
            }
        }, interval);
    }


    _animationFadeInstructions(toValue, state, duration = 800) {
        return new Promise((resolve, _) => {
            Animated.timing(state, {
                toValue,
                duration,
                useNativeDriver: false
            }).start(() => resolve())
        })
    }

    _getColor(type) {
        return Color[`TYPE_${type.toUpperCase()}`]
    }

    render() {
        if (!this.state.pokemon)
            return (
                <View style={[styles.containerAllContainerStyle, styles.containerAll]}>
                    <ActivityIndicator size="large" color={"white"} />
                </View>
            )
        const { types, localization, rate, id, name, weight, evolutions, height, sprites } = this.state.pokemon;
        const { width } = this._dimensionScreen;
        this._showInstructionsTapInterval();
        if (!evolutions.regular && evolutions.pokemons.length > 0)
            this._showInstructionsEvolutionsInterval();
        return (
            <ScrollView
                style={styles.containerAll}
                contentContainerStyle={styles.containerAllContainerStyle}>

                <BasicInfo
                    id={id}
                    rate={rate}
                    localization={localization}
                    pokemon={this.state.pokemon}
                    color={this._getColor(types.type_one)}
                    instruction={this.state.showInstructionsCarrousel} />

                <View style={styles.containerInfo}>
                    <Text style={{ ...styles.textDefault, fontSize: 30 }}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>

                    <View style={{ ...styles.containerTypes, justifyContent: types.type_two ? "space-between" : "center" }}>
                        <TypeBox
                            type={types.type_one}
                            color={this._getColor(types.type_one)} />
                        {types.type_two &&
                            <TypeBox
                                type={types.type_two}
                                color={this._getColor(types.type_two)} />}
                    </View>

                    <View style={{ ...styles.containerShapes, width: types.type_two ? 310 : 150 }}>
                        <ShapeBox
                            name={"Weight"}
                            value={weight} />
                        <ShapeBox
                            name={"Height"}
                            value={height} />
                    </View>

                    <EvolutionList
                        evolutions={evolutions}
                        image={sprites[0].value}
                        fade={this.state.fadeInstructionsEvolutions}
                        onScroll={() => { this.state.showInstructionsEvolutions && this.setState({ showInstructionsEvolutions: false }) }}
                        onPress={item => {
                            this.setState({ infoEvolution: item.details, showInstructionTap: false })
                            this.state.showInstructionsDetails && this._showInstructionsDetailsInterval()
                        }} />

                    <DetailsEvolution
                        width={width}
                        infoEvolution={this.state.infoEvolution}
                        fade={this.state.fadeInstructionsDetails}
                        onScroll={() => this.state.showInstructionsDetails && this.setState({ showInstructionsDetails: false })} />

                    <Animated.View
                        style={{ ...styles.instruction, opacity: this.state.fadeInstructionsTap }}>
                        <IconsMC
                            size={40}
                            color={"white"}
                            name={"gesture-tap"} />
                        <Text style={{ ...styles.textDefault, fontSize: 16, textAlign: "center" }}>{"Tap on\n evolutions"}</Text>
                    </Animated.View>
                </View>
                < MessageModal
                    title={this.state.modal.title}
                    message={this.state.modal.message}
                    visible={this.state.modal.title ? true : false}
                    onPress={() => this.setState({ modal: {} })} />
            </ScrollView>
        );
    }
}

