import Api from "./api";

export const get_all_voices = async () => {
    return await Api({
        method: "GET",
        url: 'api/v1/voice/',
    }).then((res) => {
        return res.data;
    });
};