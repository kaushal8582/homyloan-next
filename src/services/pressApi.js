import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const PRESS_API_URL = `${API_BASE_URL}/api/press`;

/**
 * Transform API press data to match frontend format
 * @param {Object} press - Press object from API
 * @returns {Object} Transformed press object
 */
const transformPress = (press) => {
  return {
    id: press._id,
    title: press.title,
    image: press.image,
    excerpt: press.description, // API uses 'description', frontend uses 'excerpt' for list
    content: press.description, // API uses 'description', frontend uses 'content' for single post
    meta: press.description?.substring(0, 100) + '...', // Truncated description for list view
    tags: press.tag || [], // API uses 'tag', frontend uses 'tags'
    date: press.createdAt ? new Date(press.createdAt).toISOString().split('T')[0] : '', // Format date
    createdAt: press.createdAt,
    updatedAt: press.updatedAt,
  };
};

/**
 * Get all press items
 * @returns {Promise<Array>} Array of press objects
 */
export const getAllPress = async () => {
  try {
    const response = await axios.get(PRESS_API_URL);
    return response.data.map(transformPress);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch press');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch press');
    }
  }
};

/**
 * Get single press item by ID
 * @param {string} pressId - Press ID
 * @returns {Promise<Object>} Press object
 */
export const getPressById = async (pressId) => {
  try {
    const response = await axios.get(`${PRESS_API_URL}/${pressId}`);
    return transformPress(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Press not found');
    } else if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch press');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch press');
    }
  }
};
