import axios from 'axios';

// API base URL - use environment variable or fallback to localhost:3000
const API_BASE_URL =  'http://localhost:3001';
const JOB_API_URL = `${API_BASE_URL}/api/jobs`;

/**
 * Transform API job data to match frontend format
 * @param {Object} job - Job object from API
 * @returns {Object} Transformed job object
 */
const transformJob = (job) => {
  return {
    id: job._id,
    title: job.title,
    description: job.description,
    location: job.location,
    type: job.type,
    department: job.department,
    image: job.image,
    tags: job.tag || [], // API uses 'tag', frontend uses 'tags'
    applicationLink: job.applicationLink,
    status: job.status || 'open',
    date: job.createdAt ? new Date(job.createdAt).toISOString().split('T')[0] : '', // Format date
    createdAt: job.createdAt,
    updatedAt: job.updatedAt,
  };
};

/**
 * Get all jobs
 * @returns {Promise<Array>} Array of job objects
 */
export const getAllJobs = async () => {
  try {
    const response = await axios.get(JOB_API_URL);
    return response.data.map(transformJob);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch jobs');
  }
};

/**
 * Get a single job by ID
 * @param {string} id - Job ID
 * @returns {Promise<Object>} Job object
 */
export const getJobById = async (id) => {
  try {
    const response = await axios.get(`${JOB_API_URL}/${id}`);
    return transformJob(response.data);
  } catch (error) {
    console.error('Error fetching job:', error);
    throw new Error(error.response?.data?.error || 'Failed to fetch job');
  }
};
