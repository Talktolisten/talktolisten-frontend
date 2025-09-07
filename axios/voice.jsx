import Api from "./api";

export const get_all_voices = async () => {
  return await Api({
    method: "GET",
    url: "api/v1/voice/",
  }).then((res) => {
    return res.data;
  });
};

export const get_voice = async (id) => {
  return await Api({
    method: "GET",
    url: `api/v1/voice/${id}`,
  }).then((res) => {
    return res.data;
  });
};
