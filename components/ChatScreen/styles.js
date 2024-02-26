import { StyleSheet, StatusBar } from "react-native";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 16,
    backgroundColor: COLORS.white,
  },
  searchBar: {
    marginBottom: 12.5,
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
    marginTop: SIZES.medium,
    flex: 1,
  },
  elementPallet: {
    marginTop: 10,
    marginHorizontal: SIZES.small
  },
  element: {
    flexDirection: "row",
    padding: SIZES.medium,
    alignItems: "center",
    backgroundColor: COLORS.white,
    marginLeft: 5,
    marginBottom: SIZES.xSmall
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
    color: COLORS.light_black
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
});
