import { StyleSheet, StatusBar } from "react-native";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from "../../styles";
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 16,
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
    flex: 1,
  },
  elementPallet: {
    marginTop: 10,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    marginLeft: 10,
    marginRight: 10,
  },
  element: {
    flexDirection: "row",
    marginBottom: 10,
    padding: 8,
    alignItems: "center",
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    marginHorizontal: 10,
  },
  infoArea: {
    flex: 3,
    margin: 10,
  },
  infoTitle: {
    fontSize: FONTSIZE.medium,
    fontWeight: FONT_WEIGHT.bold,
  },
  infoSub: {
    marginTop: 5,
    fontSize: FONTSIZE.small,
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
    height: 90,
  },
  botImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
});
