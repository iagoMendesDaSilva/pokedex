import { Animated, Easing } from 'react-native';

export class AnimatedService {

     static animationRotatePokeball(toValue, state, duration = 300) {
        return new Promise(resolve => {
            Animated.timing(state, {
                toValue,
                duration,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(() => resolve())
        })
    }

    static animationFallPokeball(x, y, state, bounciness = 10) {
        return new Promise((resolve, _) => {
            Animated.spring(state, {
                toValue: { x, y },
                speed: 8,
                useNativeDriver: false,
                bounciness,
            }).start(() => resolve())
        })
    }

    static animationTiming(toValue, state, duration = 800) {
        return new Promise(resolve => {
            Animated.timing(state, {
                toValue,
                duration,
                useNativeDriver: false
            }).start(() => resolve())
        })
    }

}