import React, { useState, useEffect } from "react";
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    FlatList,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import Modal from "react-native-modal";

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { StatusBar } from "react-native";

import { get_bot_info, get_created_bot } from "../../axios/bots";

import CharacterProfileModal from "../CharacterProfileScreen/CharacterProfileModal";

const CreatedCharacters = () => {
    const navigation = useNavigation();
    const [createdBots, setCreatedBots] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedBotInfo, setSelectedBotInfo] = useState({});

    const fetchData = async () => {
        const botInfo = await get_created_bot();
        try {
            setCreatedBots(botInfo);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (!isFocused) {
            setModalVisible(false);
        }
    }, [isFocused]);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handlePressBot = async (botId) => {
        try {
            const botInfo = await get_bot_info(botId);
            setSelectedBotInfo(botInfo);
            toggleModal();
        } catch (error) {
            console.error("Failed to fetch bot info:", error);
        }
    };

    const hasAnyBots = createdBots.length > 0;

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
            {!hasAnyBots ? (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: FONTSIZE.large, fontWeight: FONT_WEIGHT.regular, color: COLORS.light_black }}>You have not created any characters yet</Text>
                </View>
            ) : (
                <SafeAreaView style={styles.container}>
                    <View style={styles.listSection}>
                        <ScrollView style={styles.elementPallet}>
                            {createdBots.map((bot) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.element}
                                        key={bot.bot_id}
                                        activeOpacity={0.8}
                                        onPress={handlePressBot.bind(this, bot.bot_id)}
                                    >
                                        <View style={styles.infoArea}>
                                            <Text style={styles.infoTitle}>{bot.bot_name}</Text>
                                            <Text style={styles.infoSub}>{bot.short_description}</Text>
                                            <View style={styles.inforMoreContainer}>
                                                <View style={styles.infoChat}>
                                                    <Ionicons
                                                        name="chatbubble-ellipses-outline"
                                                        size={FONTSIZE.xSmall}
                                                        color={COLORS.black}
                                                        style={styles.infoIcon}
                                                    />
                                                    <Text>{bot.num_chats}</Text>
                                                </View>
                                                <View style={styles.infoLikes}>
                                                    <Ionicons
                                                        name="heart"
                                                        size={FONTSIZE.xSmall}
                                                        color={COLORS.pink}
                                                        style={styles.infoIcon}
                                                    />
                                                    <Text>{bot.likes}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.imageArea}>
                                            <Image
                                                source={{ uri: bot.profile_picture }}
                                                resizeMode="cover"
                                                style={styles.botImage}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                    </View>

                    {isModalVisible ?
                        <CharacterProfileModal
                            isModalVisible={isModalVisible}
                            toggleModal={toggleModal}
                            selectedBotInfo={selectedBotInfo}
                            navigation={navigation}
                        />
                        : null}
                </SafeAreaView>)}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 16,
        backgroundColor: COLORS.grey,
        width: "100%",
    },
    listSection: {
        flex: 1,
    },
    elementPallet: {
        paddingTop: SIZES.small,
        marginLeft: 10,
        marginRight: 10,
    },
    element: {
        flexDirection: "row",
        marginBottom: 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        marginHorizontal: 10,
    },
    infoArea: {
        flex: 3,
        justifyContent: "space-between",
        marginRight: 10,
    },
    infoTitle: {
        fontSize: FONTSIZE.medium,
        fontWeight: FONT_WEIGHT.bold,
        marginBottom: 5
    },
    infoSub: {
        fontSize: FONTSIZE.xSmall,
    },
    inforMoreContainer: {
        flex: 1,
        justifyContent: "flex-start",
        flexDirection: "row",
        marginTop: 10,
        fontSize: FONTSIZE.xSmall,
    },
    infoChat: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
    },
    infoLikes: {
        flexDirection: "row",
        alignItems: "center",
    },
    infoIcon: {
        marginRight: 5,
    },
    imageArea: {
        flex: 1,
        height: 100,
    },
    botImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
});

export default CreatedCharacters;