import { create_user } from "./user";
import { defaultAvatarURL, defaultBio } from "../util/constants";
import { getRandomElement } from "./user";

const create_random_username = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};

const create_random_email = () => {
  return Math.random().toString(36).substring(2, 15) + "@gmail.com";
};

const create_random_num = () => {
  return Math.floor(Math.random() * 10000);
};

export const create_guest_user = async (user_id) => {
  return await create_user(
    user_id,
    create_random_username(),
    create_random_email(),
    "Anonymous",
    create_random_num().toString(),
    getRandomElement(defaultAvatarURL),
    getRandomElement(defaultBio),
    "01 / 01 / 2001",
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
