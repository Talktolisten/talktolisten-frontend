import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Linking } from "react-native";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";

const About = () => {
    const openURL = () => {
        Linking.openURL('https://talktolisten.com');
    };

    const acmWebsite = () => {
        Linking.openURL('https://bullsconnect.usf.edu/acm/home/');
    }

    const acmInstagram = () => {
        Linking.openURL('https://www.instagram.com/usfacm/');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>About us</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.paragraph}>
                    We want to create an innovative platform that allows users to engage in lifelike conversations with AI-powered characters
                </Text>
                <View style={styles.infoLogoContainer}>
                    <TouchableOpacity onPress={openURL} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Visit our website</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.paragraph}>
                    This project is created by the team at Talk to Listen and is a collaboration with Association for Computing Machinery (ACM) at the University of South Florida
                </Text>
                <View style={styles.infoLogoContainer}>
                    <TouchableOpacity onPress={acmWebsite} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={acmInstagram} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Instagram</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
};

export default About;

const styles = {
    container: {
        flex: 1,
        alignItems: "center",
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
    },
    heading: {
        fontSize: FONTSIZE.large,
        marginTop: SIZES.large,
        marginBottom: SIZES.xLarge,
        fontWeight: FONT_WEIGHT.bold,
    },
    infoContainer: {
        alignItems: "center",
        marginBottom: SIZES.xLarge + SIZES.medium,
    },
    paragraph: {
        fontSize: FONTSIZE.medium,
        textAlign: 'center',
        marginBottom: SIZES.large,
        paddingHorizontal: SIZES.xLarge,
    },
    linkContainer: {
        backgroundColor: COLORS.black,
        padding: SIZES.small,
        borderRadius: SIZES.small,
    },
    linkText: {
        color: COLORS.white,
        fontSize: FONTSIZE.medium,
    },
    infoLogoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: SIZES.medium,
        marginTop: SIZES.medium,
    },
};