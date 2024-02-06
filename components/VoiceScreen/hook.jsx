import { useEffect } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (buttonRecording, scaleValue1, scaleValue2) => {
    useEffect(() => {
        if (buttonRecording === 'Start') {
            Animated.loop(
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

            Animated.loop(
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
            scaleValue1.setValue(0);
            scaleValue2.setValue(0);
        }
    }, [buttonRecording, scaleValue1, scaleValue2]);
};