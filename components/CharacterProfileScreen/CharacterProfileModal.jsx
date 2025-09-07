import React from "react";
import Modal from "react-native-modal";
import { View, StyleSheet } from "react-native";
import CharacterProfile from "./CharacterProfileScreen";
import { COLORS } from "../../styles";

const CharacterProfileModal = ({
  isModalVisible,
  toggleModal,
  selectedBotInfo,
  navigation,
}) => (
  <Modal
    isVisible={isModalVisible}
    animationInTiming={500}
    animationOutTiming={1000}
    backdropColor={COLORS.light_black}
    backdropOpacity={0.85}
    onBackdropPress={toggleModal}
    style={modalStyles.modalContainer}
  >
    <View style={modalStyles.container}>
      <CharacterProfile botInfo={selectedBotInfo} navigation={navigation} />
    </View>
  </Modal>
);

const modalStyles = StyleSheet.create({
  modalContainer: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "flex-end",
    width: "100%",
    margin: 5,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    height: "70%",
    width: "100%",
  },
});

export default CharacterProfileModal;
