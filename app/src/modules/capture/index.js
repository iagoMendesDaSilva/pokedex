import { styles } from './style';

import * as React from 'react';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity, Image, ImageBackground, ActivityIndicator, Animated, View, Dimensions } from 'react-native';

import { StorageCapture } from './storage';
import { MessageModal } from '../../helpers';
import { AnimatedService } from './service/animation';

export class Capture extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            modal: {},
            chances: 3,
            colorPokemon: false,
            fadePokemon: new Animated.Value(1),
            fadeInstructions: new Animated.Value(0),
            rotatePokeball: new Animated.Value(0),
            positionPokeball: new Animated.ValueXY(0, 0),
            pokemon: this.props.route.params.pokemon,
            nickname: this.props.route.params.pokemon.name,
        };
        this._sequencePokeball = 3;
        this._waitTryToCapture = false;
        this._dimensionScreen = { width: Dimensions.get("screen").width, height: Dimensions.get("screen").height };
    }

    componentDidMount() {
        this._showInstructionsInterval();
    }

    _showInstructionsInterval(interval = 3000) {
        let intervalAnimated = setInterval(async () => {
            if (this.state.chances === 3) {
                await AnimatedService.animationTiming(1, this.state.fadeInstructions);
                await AnimatedService.animationTiming(0, this.state.fadeInstructions);
            } else {
                clearInterval(intervalAnimated)
            }
        }, interval);
    }

    _sequenceRotatePokeball(interval = 920) {
        return new Promise(resolve => {
            let intervalAnimatedPokeball = setInterval(async () => {
                if (this._sequencePokeball > 1) {
                    await AnimatedService.animationRotatePokeball(2, this.state.rotatePokeball);
                    await AnimatedService.animationRotatePokeball(3, this.state.rotatePokeball);
                    await AnimatedService.animationRotatePokeball(1, this.state.rotatePokeball);
                    await this._sequencePokeball--;
                } else {
                    clearInterval(intervalAnimatedPokeball)
                    resolve()
                }
            }, interval);
        })
    }

    _animationCapture() {
        const { height } = this._dimensionScreen
        return new Promise(async resolve => {
            let size = height * .666667

            AnimatedService.animationRotatePokeball(1, this.state.rotatePokeball);
            await AnimatedService.animationFallPokeball(0, size, this.state.positionPokeball);

            this.setState({ colorPokemon: true });

            await AnimatedService.animationTiming(0, this.state.fadePokemon);
            await this._sequenceRotatePokeball();
            resolve()
        })
    }

    _animationMiss() {
        return new Promise(async resolve => {
            await AnimatedService.animationTiming(1, this.state.fadePokemon);

            this.setState({ colorPokemon: false });

            AnimatedService.animationRotatePokeball(0, this.state.rotatePokeball);
            await AnimatedService.animationFallPokeball(0, 0, this.state.positionPokeball, 3);

            this._sequencePokeball = 3
            resolve()
        })
    }

    async _savePokemon() {
        const { nickname, pokemon } = this.state;
        StorageCapture.confirmCapture(nickname === "" ? pokemon.name : nickname, pokemon.id)
            .then(_ => this.props.navigation.navigate("Welcome"))
            .catch(_ => this.setState({ modal: { title: "Erro", message: "Unable to save pokemon" } }))
    }

    _showModal(title, message, button, func,input=false) {
        this.setState({ modal: { title, func, button, message, input, } })
    }

    async _capture() {
        if (!this._waitTryToCapture && this.state.chances > 0) {
            this._waitTryToCapture = true;

            this.setState({ chances: this.state.chances - 1 })
            await this._animationCapture();

            StorageCapture.tryCapture(this.state.pokemon.id)
                .then(() =>
                    this._showModal("Congratulations!", `${this.state.pokemon.name} was captured, check your pokédex.`,
                        "Save", () => { this.setState({ modal: {} }); this._savePokemon() }, this.state.nickname))

                .catch(async _ => {
                    await this._animationMiss()

                    this.state.chances == 0
                        ? this._showModal("Oops!", `${this.state.pokemon.name} ran away`,
                            "OK", () => { this.setState({ modal: {} }); this.props.navigation.navigate("Welcome") })
                        : this._waitTryToCapture = false
                })
        }
    }

    render() {
        const rotate = this.state.rotatePokeball.interpolate({
            inputRange: [0, 1, 2, 3],
            outputRange: ["0deg", "720deg", "740deg", "700deg"]
        });
        const { width, height } = this._dimensionScreen;
        return (
            this.state.pokemon ?
                <ImageBackground
                    style={{ flex: 1 }}
                    source={new Date().getHours() > 6 && new Date().getHours() < 19 ? require('../../assets/img/background.jpg')
                        : require('../../assets/img/backgroundNoite.jpg')}>
                    <View style={{ ...styles.containerAll, paddingTop: (height / 2) - 50 }}>
                        <TouchableOpacity onPress={() => this._capture()}>
                            {this.state.colorPokemon ?
                                <Animated.Image
                                    source={{ uri: this.state.pokemon.front_default }}
                                    style={[styles.pokemon, { tintColor: "rgb(255,70,70)", opacity: this.state.fadePokemon }]} />
                                :
                                <Image
                                    style={[styles.pokemon]}
                                    source={{ uri: this.state.pokemon.front_default }} />
                            }
                        </TouchableOpacity>
                        <Animated.View style={[styles.containerInstructions,
                        { opacity: this.state.fadeInstructions, left: width / 2 - 25 }]}>
                            <Icons
                                size={50}
                                color={"white"}
                                name={"gesture-tap"} />
                        </Animated.View>
                        <Animated.View
                            style={[styles.containerPokeball, this.state.positionPokeball.getLayout()]}>
                            <Animated.Image
                                resizeMode={"contain"}
                                source={require("../../assets/img/pokeball.png")}
                                style={[styles.pokeball, { left: (width / 2) - 30, transform: [{ rotate }] }]} />
                        </Animated.View>
                    </View>
                    <View style={{ ...styles.conatinerMenu, width: this._dimensionScreen.width }}>
                        {Array(this.state.chances).fill(null).map((_, index) => {
                            return (
                                <TouchableOpacity key={String(index)}
                                    onPress={() => this._capture()}>
                                    <Image
                                        style={styles.chances}
                                        source={require("../../assets/img/pokeball.png")} />
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                    < MessageModal
                        input={this.state.modal.input}
                        onChange={nickname => this.setState({ nickname })}
                        title={this.state.modal.title}
                        button={this.state.modal.button}
                        message={this.state.modal.message}
                        visible={this.state.modal.title ? true : false}
                        onPress={this.state.modal.func} />
                </ImageBackground >
                :
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color={"white"} />
                </View>
        );
    }
}
