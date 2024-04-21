export const SCREEN_NAMES = {
  NAV_TAB: "Tab Navigator",
  HOME: "Home",
  CHAT_TAB: "Chat Tab",
  CREATE_CHARACTER_TAB: "Create Character Tab",
  RANDOM_TAB: "Surprised me Tab",
  PROFILE_TAB: "Profile Tab",

  EXPLORE: "Explore",

  AUTH: "Authentication",
  WELCOME: "Welcome",
  LOGIN: "Login",
  SIGNUP: "Signup",
  USER_INFO: "UserInfo",

  RESET_PASSWORD: "Reset Password",
  PROFILE: "Profile",
  LIKED_CHARACTERS: "Liked Characters",
  CREATED_CHARACTERS: "Created Characters",
  USER_PROFILE: "User Profile",
  EDIT_PROFILE: "Edit Profile",
  EDIT_CHARACTER: "Edit Character",
  SETTINGS: "Settings",
  THEME_SETTING: "Theme Setting",
  NOTIFICATION: "Notification",
  FEEDBACK: "Feedback",
  REPORT: "Report",
  ABOUT_US: "About Us",

  CHAT: "Chat",
  MESSAGE: "Message",
  CREATE_GROUP_CHAT: "Create Group Chat",
  CREATE_GROUP_CHAT_2: "Create Group Chat Final",
  MESSAGE_GROUP: "Message Group",
  VOICE: "Voice",
  VOICE_GROUP: "Voice Group",

  RANDOM: "Surprised me",

  CREATE_CHARACTER: "Create Character",
  CREATE_CHARACTER_2: "Create Character step 2",
  CREATE_CHARACTER_3: "Create Character step 3",
  CREATE_CHARACTER_4: "Create Character step 4",
  CREATE_CHARACTER_5: "Create Character Final",
};

export const SCREEN_NAMES_NO_TAB = [
  SCREEN_NAMES.RESET_PASSWORD,
  SCREEN_NAMES.LIKED_CHARACTERS,
  SCREEN_NAMES.CREATED_CHARACTERS,
  SCREEN_NAMES.USER_PROFILE,
  SCREEN_NAMES.EDIT_PROFILE,
  SCREEN_NAMES.EDIT_CHARACTER,
  SCREEN_NAMES.SETTINGS,
  SCREEN_NAMES.THEME_SETTING,
  SCREEN_NAMES.NOTIFICATION,
  SCREEN_NAMES.FEEDBACK,
  SCREEN_NAMES.REPORT,
  SCREEN_NAMES.ABOUT_US,
  SCREEN_NAMES.CREATE_GROUP_CHAT,
  SCREEN_NAMES.CREATE_GROUP_CHAT_2,
  SCREEN_NAMES.MESSAGE,
  SCREEN_NAMES.MESSAGE_GROUP,
  SCREEN_NAMES.VOICE,
  SCREEN_NAMES.VOICE_GROUP,
  SCREEN_NAMES.CREATE_CHARACTER,
  SCREEN_NAMES.CREATE_CHARACTER_2,
  SCREEN_NAMES.CREATE_CHARACTER_3,
  SCREEN_NAMES.CREATE_CHARACTER_4,
];

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
  requiresRecentLogin: "auth/requires-recent-login",
}

export const LINKS = {
  TTLWebsite: 'https://talktolisten.com',
  acmWebsite: 'https://bullsconnect.usf.edu/acm/home/',
  acmInstagram: 'https://www.instagram.com/usfacm/',
  TTL_Terms_of_Use: 'https://talktolisten.com/terms-of-use',
  TTL_Privacy_Policy: 'https://talktolisten.com/privacy-policy',
};