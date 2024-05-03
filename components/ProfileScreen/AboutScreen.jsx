import React from "react";
import { Text, View, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from "react-native";
import { LINKS } from "../../util/constants";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";

const About = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.paragraph}>
                    We want to create an innovative platform that allows users to engage in lifelike conversations with AI-powered characters
                </Text>
                <View style={styles.infoLogoContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(LINKS.TTLWebsite)} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Visit our website</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* <View style={styles.infoContainer}>
                <Text style={styles.paragraph}>
                    This project is created by the team at Talk to Listen and is a collaboration with Association for Computing Machinery (ACM) at the University of South Florida
                </Text>
                <View style={styles.infoLogoContainer}>
                    <TouchableOpacity onPress={() => Linking.openURL(LINKS.acmWebsite)} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Website</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(LINKS.acmInstagram)} style={styles.linkContainer}>
                        <Text style={styles.linkText}>Instagram</Text>
                    </TouchableOpacity>
                </View>
            </View> */}
        </SafeAreaView >
    );
};

export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: SIZES.medium,
        backgroundColor: COLORS.white,
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
});