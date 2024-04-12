import React, { useState } from "react";
import { Text, SafeAreaView, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";

const themes = [
    { name: 'Light', backgroundColor: 'white', textColor: 'black' },
    { name: 'Dark', backgroundColor: 'black', textColor: 'white' },
    // Add more themes here
];

const ThemeSetting = () => {
    const [selectedTheme, setSelectedTheme] = useState(themes[0]); // Default to first theme

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.grey }}>
            <SafeAreaView style={styles.container}>
                <View style={styles.themeContainer}>
                    {themes.map((theme, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.themeButton,
                                { backgroundColor: theme.backgroundColor },
                                theme.name === selectedTheme.name ? styles.selectedTheme : {}
                            ]}
                            onPress={() => setSelectedTheme(theme)}
                        >
                            <Text style={{ color: theme.textColor }}>{theme.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </SafeAreaView >
        </View >
    );
};

export default ThemeSetting;

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: COLORS.white,
    },
    themeContainer: {
        width: '80%',
        fontSize: FONTSIZE.large,
        fontWeight: FONT_WEIGHT.bold,
    },
    themeButton: {
        padding: SIZES.medium,
        marginVertical: SIZES.small,
        borderRadius: SIZES.small,
        alignItems: 'center',
        marginVertical: SIZES.large
    },
    selectedTheme: {
        borderWidth: 2,
        borderColor: COLORS.green_light,
        shadowColor: COLORS.green_light,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.75,
        shadowRadius: 3.84,
        elevation: 5,
    },
};