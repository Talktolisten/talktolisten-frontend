import Api from "./api";

export const get_bot_info = async (botId) => {
  return await Api({
    method: "GET",
    url: `api/v1/explore/${botId}`,
  }).then((res) => {
    return res.data;
  });
};

export const get_bot_info_toEdit = async (botId) => {
  return await Api({
    method: "GET",
    url: `api/v1/bot/edit_bot/${botId}`,
  }).then((res) => {
    return res.data;
  });
};

export const get_random_bot = async () => {
  return await Api({
    method: "GET",
    url: `api/v1/explore/random`,
  }).then((res) => {
    return res.data;
  });
};

export const get_liked_bot = async () => {
  return await Api({
    method: "GET",
    url: `api/v1/bot/liked_bot`,
  }).then((res) => {
    return res.data;
  });
};

export const get_created_bot = async () => {
  return await Api({
    method: "GET",
    url: `api/v1/bot/created_bot`,
  }).then((res) => {
    return res.data;
  });
};

export const create_new_bot = async (
  bot_name,
  short_description,
  description,
  greeting,
  profile_picture,
  category,
  voice_id,
  privacy,
  gender,
  created_by,
) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/`,
    data: {
      bot_name,
      short_description,
      description,
      greeting,
      profile_picture,
      category,
      voice_id,
      privacy,
      gender,
      created_by,
    },
  }).then((res) => {
    return res.data;
  });
};

export const update_bot = async (
  bot_id,
  bot_name,
  short_description,
  description,
  profile_picture,
  voice_id,
  greeting,
  privacy,
  gender,
) => {
  return await Api({
    method: "PATCH",
    url: `api/v1/bot/${bot_id}`,
    data: {
      bot_name,
      short_description,
      description,
      profile_picture,
      voice_id,
      greeting,
      privacy,
      gender,
    },
  }).then((res) => {
    return res.data;
  });
};

export const delete_bot = async (bot_id) => {
  return await Api({
    method: "DELETE",
    url: `api/v1/bot/${bot_id}`,
  }).then((res) => {
    return res.data;
  });
};

export const generate_avatar = async (image_prompt) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/create_bot/generate_image`,
    data: {
      image_prompt,
    },
  }).then((res) => {
    return res.data;
  });
};

export const generate_greeting_description = async (bot_name, description) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/create_bot/generate`,
    data: {
      bot_name,
      description,
    },
  }).then((res) => {
    return res.data;
  });
};

export const optimize_description = async (bot_name, description) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/create_bot/optimize_description`,
    data: {
      bot_name,
      description,
    },
  }).then((res) => {
    return res.data;
  });
};

export const generate_image_prompt = async (bot_name, description) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/create_bot/generate_img_prompt`,
    data: {
      bot_name,
      description,
    },
  }).then((res) => {
    return res.data;
  });
};

export const optimize_image_prompt = async (image_prompt) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/create_bot/optimize_img_prompt`,
    data: {
      image_prompt,
    },
  }).then((res) => {
    return res.data;
  });
};

export const user_likes_bot = async (bot_id) => {
  return await Api({
    method: "POST",
    url: `api/v1/bot/like/${bot_id}`,
    data: {
      bot_id,
    },
  }).then((res) => {
    return res.data;
  });
};

export const user_unlikes_bot = async (bot_id) => {
  return await Api({
    method: "DELETE",
    url: `api/v1/bot/unlike/${bot_id}`,
    data: {
      bot_id,
    },
  }).then((res) => {
    return res.data;
  });
};
