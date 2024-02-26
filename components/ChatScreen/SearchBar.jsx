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
      placeholder="Search Character ..."
    // onChangeText={console.log("SearchBar onChangeText")}
    />
  );
};

export default DynamicSearchBar;
