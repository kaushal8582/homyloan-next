import axios from "axios";

const API_BASE_URL =  "http://localhost:3001";

export const getHomePageContent = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/page-content/home`);
    return data;
  } catch (err) {
    console.warn("Failed to fetch home page content:", err);
    return null;
  }
};

export const getPageContent = async (page) => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/page-content/${page}`);
    return data;
  } catch (err) {
    console.warn("Failed to fetch page content:", err);
    return null;
  }
};
