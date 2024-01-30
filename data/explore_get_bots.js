import { API_ROOT } from './api_root.js';
import { EXPLORE } from './api_endpoints.js';

const fetchData = async () => {
  try {
    const response = await fetch(`${API_ROOT}${EXPLORE}/`); // Using string interpolation
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


const transformData = (originalData) => {
  return originalData.map((item) => ({
    bot_id: item.bot_id,
    bot_name: item.bot_name,
    short_description: item.short_description,
    description: item.description,
    profile_picture: item.profile_picture,
    category: item.category,
    created_at: item.created_at || "2022-01-01T00:00:00Z", // You may need to adjust the default value
    voice_id: item.voice_id,
    num_chats: item.num_chats,
    likes: item.likes,
    created_by: item.created_by
  }));
};

export { fetchData, transformData };
