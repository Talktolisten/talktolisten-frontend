import { StyleSheet, StatusBar } from "react-native";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: COLORS.white,
  },
  fab: {
    position: "absolute",
    margin: 24,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.light_black,
  },
  searchBar: {
    marginBottom: 12.5,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  radioButton: {
    padding: 10,
    width: "47.5%",
    borderRadius: 25,
  },
  radioButtonSelected: {
    backgroundColor: COLORS.bright_grey,
  },
  radioButtonLabel: {
    fontSize: FONTSIZE.xSmall,
    color: COLORS.light_black,
    textAlign: "center",
    fontWeight: FONT_WEIGHT.medium,
  },
  radioButtonLabelSelected: {
    color: COLORS.black,
    fontWeight: FONT_WEIGHT.bold,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
    marginLeft: SIZES.small,
  },
  tab: (activeType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    backgroundColor: activeType === item ? COLORS.light_black : COLORS.white,
    borderColor: activeType === item ? COLORS.black : COLORS.black,
  }),
  tabText: (activeType, item) => ({
    color: activeType === item ? COLORS.white : COLORS.black,
  }),
  listSection: {
    flex: 1,
  },
  elementPallet: {
    marginHorizontal: SIZES.small,
  },
  element: {
    flexDirection: "row",
    padding: SIZES.medium,
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginLeft: 5,
    marginBottom: SIZES.xSmall,
  },
  infoArea: {
    flex: 3,
    marginLeft: SIZES.medium,
  },
  infoTitle: {
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
  },
  infoSub: {
    marginTop: SIZES.xSmall,
    fontSize: FONTSIZE.xSmall,
    color: COLORS.light_black,
  },
  inforMoreContainer: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 10,
  },
  infoMore: {
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
    height: 80,
  },
  botImage: {
    width: "100%",
    height: "100%",
    borderRadius: 40,
  },
  rightAction: {
    backgroundColor: "#dd2c00",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: "90%",
  },
  actionText: {
    color: COLORS.white,
    padding: 10,
    fontSize: FONTSIZE.xSmall,
    fontWeight: FONT_WEIGHT.medium,
  },
});
