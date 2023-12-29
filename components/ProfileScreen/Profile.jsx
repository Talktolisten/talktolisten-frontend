import { COLORS, FONT_NUNITO } from '../../styles';
// import { Iconify } from 'react-native-iconify';
import { StyleSheet, StatusBar, Text, View, SafeAreaView } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileName}>Profile</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: StatusBar.currentHeight,
  },
    profileHeader: {
        backgroundColor: COLORS.black,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileName: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: FONT_NUNITO.bold,
    },
});