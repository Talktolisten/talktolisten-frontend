import Api from "./api";
import { getAuth, deleteUser } from "firebase/auth";

export const get_user_info = async (user_id) => {
  return await Api({
    method: "GET",
    url: `api/v1/user/${user_id}`,
  }).then((res) => {
    return res.data;
  });
};

export const create_user = async (
  user_id,
  username,
  gmail,
  first_name,
  last_name,
  dob
) => {
  return await Api({
    method: "POST",
    url: "api/v1/user/signup",
    data: {
      user_id: user_id,
      username: username,
      gmail: gmail,
      first_name: first_name,
      last_name: last_name,
      profile_picture:
        "https://bots-ttl.s3.amazonaws.com/default_avatar/female2.webp",
      dob: dob,
    },
  }).then((res) => {
    return res.data;
  });
};

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
