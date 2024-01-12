import { View, Text, Image, TouchableOpacity, useWindowDimensions, FlatList} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES, FONTSIZE, FONT_WEIGHT } from '../../styles';
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";


const Profile = () => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={require("../../assets/images/avatar.png")}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../../assets/images/avatar.png")}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.black,
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            fontSize: FONTSIZE.xLarge,
            fontWeight: FONT_WEIGHT.bold,
            lineHeight: 24,
            color: COLORS.black,
            marginVertical: 8,
          }}
        >
          Leo
        </Text>
        <Text
          style={{
            color: COLORS.black,
            fontSize: FONTSIZE.small,
            marginBottom: SIZES.large
          }}
        >
          @leotech
        </Text>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.small,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                fontWeight: FONT_WEIGHT.bold,
                lineHeight: 22,
                color: COLORS.black,
              }}
            >
              122
            </Text>
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                color: COLORS.black,
              }}
            >
              Followers
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.small,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                fontWeight: FONT_WEIGHT.bold,
                lineHeight: 30,
                color: COLORS.black,
              }}
            >
              67
            </Text>
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                color: COLORS.black,
              }}
            >
              Followings
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.small,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                fontWeight: FONT_WEIGHT.bold,
                lineHeight: 30,
                color: COLORS.black,
              }}
            >
              77K
            </Text>
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                color: COLORS.black,
              }}
            >
              Likes
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.black,
              borderRadius: 10,
              marginHorizontal: SIZES.small * 2,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.black,
              borderRadius: 10,
              marginHorizontal: SIZES.small * 2,
            }}
          >
            <Text
              style={{
                fontSize: FONTSIZE.medium,
                color: COLORS.white,
              }}
            >
              Add Friend
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default Profile;