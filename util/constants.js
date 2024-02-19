export const SCREEN_NAMES = {
  NAV_TAB: "Tab Navigator",
  HOME: "Home",
  CHAT_TAB: "Chat Tab",
  PROFILE_TAB: "Profile Tab",

  EXPLORE: "Explore",

  AUTH: "Authentication",
  LOGIN: "Login",
  SIGNUP: "Signup",
  USER_INFO: "UserInfo",

  RESET_PASSWORD: "Reset Password",
  PROFILE: "Profile",
  USER_PROFILE: "User Profile",
  EDIT_PROFILE: "Edit Profile",
  SETTINGS: "Settings",

  CHAT: "Chat",
  MESSAGE: "Message",
  VOICE: "Voice",
};

export const defaultAvatarURL = [
  "https://bots-ttl.s3.amazonaws.com/default_avatar/male1.webp",
  "https://bots-ttl.s3.amazonaws.com/default_avatar/male2.webp",
  "https://bots-ttl.s3.amazonaws.com/default_avatar/female1.webp",
  "https://bots-ttl.s3.amazonaws.com/default_avatar/female2.webp",
]

export const defaultBio = [
  "Adventurer exploring the world one step at a time. 🌍",
  "Passionate about art, music, and endless creativity. 🎨🎵",
  "Tech enthusiast always seeking the next innovation. 💻",
  "Book lover lost in the pages of countless stories. 📚",
  "Coffee addict with a love for good conversations. ☕️",
  "Nature lover finding solace in the great outdoors. 🌿",
  "Dreamer chasing stars and following passions. ✨",
  "Fitness fanatic on a journey to health and wellness. 🏋️‍♂️",
  "Foodie exploring flavors from around the globe. 🍜",
  "Animal lover with a heart full of compassion. 🐾",
]

export const errorCode = {
  invalidEmail: "auth/invalid-email",
  wrongPassword: "auth/invalid-credential",
  weakPassword: "auth/weak-password",
  emailExists: "auth/email-already-in-use",
  missingPassword: "auth/missing-password",
}