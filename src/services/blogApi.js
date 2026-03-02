import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const BLOG_API_URL = `${API_BASE_URL}/api/blogs`;

/**
 * Transform API blog data to match frontend format
 * @param {Object} blog - Blog object from API
 * @returns {Object} Transformed blog object
 */
const transformBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    image: blog.image,
    excerpt: blog.description, // API uses 'description', frontend uses 'excerpt' for list
    content: blog.description, // API uses 'description', frontend uses 'content' for single post
    tags: blog.tag || [], // API uses 'tag', frontend uses 'tags'
    date: blog.createdAt ? new Date(blog.createdAt).toISOString().split('T')[0] : '', // Format date
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
  };
};

/**
 * Get all blogs
 * @returns {Promise<Array>} Array of blog objects
 */
export const getAllBlogs = async () => {
  try {
    const response = await axios.get(BLOG_API_URL);
    return response.data.map(transformBlog);
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch blogs');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch blogs');
    }
  }
};

/**
 * Get single blog by ID
 * @param {string} blogId - Blog ID
 * @returns {Promise<Object>} Blog object
 */
export const getBlogById = async (blogId) => {
  try {
    const response = await axios.get(`${BLOG_API_URL}/${blogId}`);
    return transformBlog(response.data);
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Blog not found');
    } else if (error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch blog');
    } else if (error.request) {
      throw new Error('Network error. Please check your connection.');
    } else {
      throw new Error(error.message || 'Failed to fetch blog');
    }
  }
};
