import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (isTalking, scaleValue1, scaleValue2) => {
    const animation1 = useRef();
    const animation2 = useRef();

    useEffect(() => {
        if (isTalking) {
            animation1.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleValue1, {
                        toValue: 1,
                        duration: 500,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue1, {
                        toValue: 0,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();

            animation2.current = Animated.loop(
                Animated.sequence([
                    Animated.timing(scaleValue2, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleValue2, {
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        } else {
            animation1.current && animation1.current.stop();
            animation2.current && animation2.current.stop();
            scaleValue1.setValue(0);
            scaleValue2.setValue(0);
        }
    }, [isTalking, scaleValue1, scaleValue2]);
};