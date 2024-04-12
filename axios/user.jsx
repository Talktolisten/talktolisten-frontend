import Api from "./api";
import { getAuth, deleteUser } from "firebase/auth";
import { defaultAvatarURL, defaultBio } from "../util/constants";

export const get_user_info = async (user_id) => {
  return await Api({
    method: "GET",
    url: `api/v1/user/${user_id}`,
  }).then((res) => {
    return res.data;
  });
};

export const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

export const create_user = async (
  user_id,
  username,
  gmail,
  first_name,
  last_name,
  profile_picture,
  bio,
  dob
) => {
  if (profile_picture === "") {
    profile_picture = getRandomElement(defaultAvatarURL);
  }

  if (bio === "") {
    bio = getRandomElement(defaultBio);
  }
  return await Api({
    method: "POST",
    url: "api/v1/user/signup",
    data: {
      user_id: user_id,
      username: username,
      gmail: gmail,
      first_name: first_name,
      last_name: last_name,
      profile_picture: profile_picture,
      bio: bio,
      dob: dob,
    },
  }).then((res) => {
    return res.data;
  });
};

export const update_user = async (
  user_id,
  username,
  gmail,
  first_name,
  last_name,
  dob,
  subscription,
  bio,
  profile_picture,
  status,
  theme
) => {
  return await Api({
    method: "PATCH",
    url: `api/v1/user/${user_id}`,
    data: {
      username: username,
      gmail: gmail,
      first_name: first_name,
      last_name: last_name,
      dob: dob,
      subscription: subscription,
      bio: bio,
      profile_picture: profile_picture,
      status: status,
      theme: theme,
    },
  }).then((res) => {
    return res.data;
  });
}

export const delete_user = async (user_id) => {
  return await Api({
    method: "DELETE",
    url: `api/v1/user/${user_id}`,
  }).then((res) => {
    return res.data;
  });
};

export const deleteAccount = async (user_id) => {
  try {
    const auth = getAuth();
    await deleteUser(auth.currentUser).then(() => {
      console.log('Successfully deleted user from Firebase');
    });

    await delete_user(user_id).then(() => {
      console.log('Successfully deleted user from backend');
    });

  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

export const checkUsername = async (username) => {
  return await Api({
    method: "GET",
    url: `api/v1/user/check_username/${username}`,
  }).then((res) => {
    return res.data;
  });
};

export const checkUserByID = async (user_id) => {
  return await Api({
    method: "GET",
    url: `api/v1/user/check_user_exists/${user_id}`,
  }).then((res) => {
    return res.data;
  });
};