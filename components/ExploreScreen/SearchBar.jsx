import React, { useState } from "react";
import SearchBar from "react-native-dynamic-search-bar";
import { COLORS } from "../../styles";

const DynamicSearchBar = ({ onChangeText, onClearPress }) => {
  return (
    <SearchBar
      fontColor={COLORS.black}
      iconColor={COLORS.black}
      shadowColor={COLORS.black}
      cancelIconColor={COLORS.black}
      backgroundColor={COLORS.white}
      placeholder="Search Character, User, ..."
      onChangeText={onChangeText}
      onClearPress={onClearPress}
    />
  );
};

export default DynamicSearchBar;
