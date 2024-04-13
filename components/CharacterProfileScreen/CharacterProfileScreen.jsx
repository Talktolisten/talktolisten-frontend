import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { StatusBar } from "expo-status-bar";
import { handlePressBot } from "../ExploreScreen/CreateChat";
import { user_likes_bot, user_unlikes_bot, get_liked_bot } from "../../axios/bots";

const CharacterProfile = ({ botInfo, navigation }) => {
    const [likedBots, setLikedBots] = useState([]);
    const fetchLikeBots = async () => {
        const botInfo = await get_liked_bot();
        try {
            setLikedBots(botInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchLikeBots();
    }, []);

    const isLiked = likedBots.some((bot) => bot.bot_id === botInfo.bot_id);

    const handleLike = async () => {
        try {
            await user_likes_bot(botInfo.bot_id);
            fetchLikeBots();
        } catch (error) {
            console.error("Error liking bot:", error);
        }
    };

    const handleUnlike = async () => {
        try {
            await user_unlikes_bot(botInfo.bot_id);
            fetchLikeBots();
        } catch (error) {
            console.error("Error unlike bot:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={COLORS.gray} />

            <View style={styles.profileContainer}>
                <View style={styles.mainProfileContainer}>
                    <Image
                        source={{ uri: botInfo.profile_picture }}
                        resizeMode="contain"
                        style={styles.avatar}
                    />

                    <View style={styles.info}>
                        <Text style={styles.bot_name}>{botInfo.bot_name}</Text>
                        <View style={styles.interactionContainer}>
                            <Text style={styles.interactionText}>{botInfo.likes} ❤️</Text>
                            <Text style={styles.interactionText}>{botInfo.num_chats} 💬</Text>
                        </View>
                        <Text style={styles.short_description}>{botInfo.short_description}</Text>
                    </View>

                    <ScrollView style={styles.scrollView}>
                        <Text style={styles.bio}>{botInfo.description}</Text>
                    </ScrollView>

                </View>
            </View>

            <View style={styles.buttonContainer}>
                {isLiked ? (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.white }]}
                        onPress={() => handleUnlike()}
                    >
                        <Text style={[styles.buttonText, { color: COLORS.red }]}>❤️ Liked</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: COLORS.white }]}
                        onPress={() => handleLike()}
                    >
                        <Text style={[styles.buttonText, { color: COLORS.black }]}>❤️ Like</Text>
                    </TouchableOpacity>
                )}
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: COLORS.light_black }]}
                    onPress={() => handlePressBot(botInfo.bot_id, navigation)}
                >
                    <Text style={[styles.buttonText, { color: COLORS.white }]}>💬 New Chat</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    profileContainer: {
        alignItems: "center",
        marginTop: 10,
        paddingHorizontal: 10,
    },
    mainProfileContainer: {
        width: "100%",
        flexDirection: "column",
    },
    avatar: {
        height: 150,
        width: 150,
        borderRadius: 15,
        borderColor: COLORS.black,
        borderWidth: 1,
        marginTop: 5,
        alignSelf: "center",
    },
    bot_name: {
        fontSize: FONTSIZE.large,
        fontWeight: FONT_WEIGHT.bold,
        color: COLORS.black,
        marginTop: 15,
        marginBottom: SIZES.xSmall,
        textAlign: "center",
    },
    interactionContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 150,
        marginBottom: SIZES.small,
    },
    interactionText: {
        color: COLORS.black,
        fontWeight: FONT_WEIGHT.medium,
        fontSize: FONTSIZE.xSmall,
    },
    short_description: {
        color: COLORS.black,
        fontSize: FONTSIZE.small,
        marginBottom: SIZES.xSmall,
        textAlign: "center",
    },
    scrollView: {
        maxHeight: 100,
        marginBottom: SIZES.xLarge,
        paddingVertical: SIZES.small,
        borderTopColor: COLORS.bright_grey,
        borderTopWidth: 1.25,
    },
    bio: {
        alignSelf: "center",
        color: COLORS.black,
        fontSize: FONTSIZE.xSmall,
        marginBottom: SIZES.xLarge,
        textAlign: "left",
        marginHorizontal: 15
    },
    buttonContainer: {
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20,
        position: "absolute",
        bottom: 30,
        width: "100%",
    },
    button: {
        padding: 10,
        borderRadius: 5,
        width: 150,
        alignItems: "center",
        borderColor: COLORS.black,
        borderWidth: 1,
    },
    buttonText: {
        fontSize: FONTSIZE.xSmall,
        fontWeight: FONT_WEIGHT.medium,
    },
});

export default CharacterProfile;
