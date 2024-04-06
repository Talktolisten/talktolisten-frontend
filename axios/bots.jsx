import Api from "./api";

export const get_bot_info = async (botId) => {
  return await Api({
    method: "GET",
    url: `api/v1/explore/${botId}`,
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
}

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
}

export const optimize_description = async (bot_name, description) => {
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
}