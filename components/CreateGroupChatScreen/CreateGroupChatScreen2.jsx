import React, { useState, useEffect, useRef } from "react";
import {
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RadioButton } from 'react-native-paper';

import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
import { SCREEN_NAMES } from "../../util/constants";
import { create_group_chat } from "../../axios/groupchat";
import { StatusBar } from "react-native";

const CreateGroupChat2 = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { group_bots } = route.params;
    const [name, setName] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [privacy, setPrivacy] = useState('public');
    const [newBots, setNewBots] = useState(group_bots || []);

    const handleCreateGroupChat = async () => {
        if (name.length === 0) {
            Alert.alert("", "Please enter a name for your group chat");
            return;
        }
        const group_bots = newBots.map((bot) => bot.bot_id);
        const response = await create_group_chat(name, group_bots);
        navigation.reset({
            index: 0,
            routes: [{ name: SCREEN_NAMES.MESSAGE_GROUP, params: { group_chat_id: response.group_chat_id, group_bots: response.group_bots } }],
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.grey }}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.subheadingContainer}>
                        <Text style={styles.subheading}>A name for your group chat</Text>
                        <View
                            style={isNameFocused ? [styles.inputSmallContainer, styles.inputContainerFocused] : styles.inputSmallContainer}
                        >
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={COLORS.cool_grey}
                                maxLength={50}
                                value={name}
                                onChangeText={(text) => setName(text)}
                                onFocus={() => setIsNameFocused(true)}
                                onBlur={() => setIsNameFocused(false)}
                                placeholder="Discussion"
                            />
                        </View>
                    </View>
                    <View style={styles.radioButtonContainer}>
                        <View style={styles.subheadingContainer}>
                            <Text style={styles.subheading}>Privacy</Text>
                        </View>
                        <RadioButton.Group onValueChange={value => setPrivacy(value)} value={privacy}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={[styles.radioButton, privacy === 'public' ? styles.radioButtonSelected : {}]} onPress={() => setPrivacy('public')}>
                                    <Text style={[styles.radioButtonLabel, privacy === 'public' ? styles.radioButtonLabelSelected : {}]}>Public</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.radioButton, privacy === 'private' ? styles.radioButtonSelected : {}]} onPress={() => setPrivacy('private')}>
                                    <Text style={[styles.radioButtonLabel, privacy === 'private' ? styles.radioButtonLabelSelected : {}]}>Private</Text>
                                </TouchableOpacity>
                            </View>
                        </RadioButton.Group>
                        <Text style={styles.privacyDescription}>
                            {privacy === 'public' ? 'Other people can join the group chat' : 'Only you can invite people to the group chat'}
                        </Text>
                    </View>
                    <View style={styles.listSection}>
                        <ScrollView style={styles.elementPallet}>
                            {newBots.map((bot) => {
                                return (
                                    <TouchableOpacity
                                        style={styles.element}
                                        key={bot.bot_id}
                                        activeOpacity={0.8}
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
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCreateGroupChat}
                        >
                            <Text style={styles.buttonText}>New Chat 💬</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView >
            </View >
        </TouchableWithoutFeedback>
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
        height: 75,
    },
    botImage: {
        width: "100%",
        height: "100%",
        borderRadius: 10,
    },
    subheadingContainer: {
        alignSelf: "center",
        marginBottom: SIZES.small,
        width: "100%",
        padding: 10,
        borderRadius: 5,
    },
    subheading: {
        fontSize: FONTSIZE.small,
    },
    input: {
        borderRadius: 5,
    },
    inputSmallContainer: {
        backgroundColor: COLORS.bright_grey,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginVertical: 5,
        marginTop: 10,
        width: "100%",
    },
    inputContainerFocused: {
        borderColor: COLORS.light_black,
        borderWidth: 1.25,
    },
    inputContainer: {
        alignItems: "left",
        alignSelf: "center",
        display: "flex",
        flexDirection: "column",
        marginVertical: 10,
        width: "100%",
    },
    radioButtonContainer: {
        marginBottom: SIZES.xLarge,
        width: "100%",
    },
    radioButton: {
        flex: 1,
        borderColor: COLORS.blue,
        borderWidth: 1,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    radioButtonSelected: {
        backgroundColor: COLORS.blue,
    },
    radioButtonLabelSelected: {
        color: COLORS.white,
    },
    radioButtonLabel: {
        fontSize: FONTSIZE.xSmall,
        textAlign: 'center',
    },
    privacyDescription: {
        textAlign: 'center',
        fontSize: FONTSIZE.xSmall,
        marginTop: SIZES.small,
    },
    buttonContainer: {
        width: '40%',
        position: 'absolute',
        bottom: "5%",
        right: 10,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'transparent',
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: COLORS.light_black,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: COLORS.white,
        fontSize: FONTSIZE.small,
        fontWeight: FONT_WEIGHT.medium
    },
});

const modalStyles = StyleSheet.create({
    modalContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-end',
        width: "100%",
        margin: 5,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        height: "80%",
        width: "100%",
    },
});

export default CreateGroupChat2;
