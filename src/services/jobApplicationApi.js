import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const APPLICATION_API_URL = `${API_BASE_URL}/api/job-applications`;
const UPLOAD_API_URL = `${API_BASE_URL}/api/upload`;

/**
 * Upload resume file
 * @param {File} file - Resume file (PDF, DOC, DOCX)
 * @returns {Promise<string>} URL of uploaded resume
 */
export const uploadResume = async (file) => {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axios.post(`${UPLOAD_API_URL}/resume`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data.url;
    } catch (error) {
        console.error('Error uploading resume:', error);
        throw new Error(error.response?.data?.error || 'Failed to upload resume');
    }
};

/**
 * Submit job application
 * @param {Object} applicationData - Application data
 * @param {string} applicationData.jobId - Job ID
 * @param {string} applicationData.fullName - Full name
 * @param {string} applicationData.email - Email
 * @param {string} applicationData.phoneNumber - Phone number
 * @param {string} applicationData.resumeUrl - Resume URL (optional)
 * @param {string} applicationData.coverLetter - Cover letter (optional)
 * @param {string} applicationData.skillsExperience - Skills/Experience (optional)
 * @returns {Promise<Object>} Submitted application
 */
export const submitApplication = async (applicationData) => {
    try {
        const response = await axios.post(APPLICATION_API_URL, applicationData);
        return response.data;
    } catch (error) {
        console.error('Error submitting application:', error);
        throw new Error(error.response?.data?.error || 'Failed to submit application');
    }
};
