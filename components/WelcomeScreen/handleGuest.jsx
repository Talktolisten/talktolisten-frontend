import { useDispatch } from "react-redux";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { storeTokens, storeUserID } from "../../util/tokenUtils.js";
import { setUserID } from "../../redux/actions/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SCREEN_NAMES } from "../../util/constants.js";
import { create_guest_user } from "../../axios/guest.jsx";
import { checkUserByID } from "../../axios/user.jsx";

export const handleGuestPress = async (dispatch, navigation) => {
    const auth = getAuth();
    const isGuestMode = await AsyncStorage.getItem('@GuestMode') === 'TRUE';
    if (isGuestMode) {
        signInAnonymously(auth)
            .then(async (userCredential) => {
                const user = userCredential.user;
                if (user) {
                    const uid = user.uid;
                    const { accessToken } = user.stsTokenManager;
                    await storeTokens(accessToken);
                    await storeUserID(user.uid);
                    dispatch(setUserID(user.uid));
                    const userExists = await checkUserByID(uid);
                    if (!userExists) {
                        await create_guest_user(uid);
                        console.log("Guest created");
                    } else {
                        console.log("Guest already exists. Error.");
                    }
                } else {
                    console.log("User not logged in guest mode");
                }
                navigation.navigate(SCREEN_NAMES.NAV_TAB);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage + " " + errorCode);
            });
    }
};
