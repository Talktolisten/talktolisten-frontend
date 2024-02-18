import SearchBar from "react-native-dynamic-search-bar";
import { COLORS } from "../../styles";

const DynamicSearchBar = () => {
  return (
    <SearchBar
      fontColor={COLORS.black}
      iconColor={COLORS.black}
      shadowColor={COLORS.black}
      cancelIconColor={COLORS.black}
      backgroundColor={COLORS.white}
      placeholder="Search Character, User, ..."
      onChangeText={(text) => this.filterList(text)}
      onSearchPress={() => console.log("Search Character, User, ...")}
      onClearPress={() => this.filterList("")}
      onPress={() => alert("onPress")}
    />
  );
};

export default DynamicSearchBar;
