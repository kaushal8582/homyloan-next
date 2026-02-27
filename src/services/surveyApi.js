import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Submit survey form data
 * @param {Object} surveyData - The complete survey form data
 * @returns {Promise<Object>} Response with survey submission details
 */
export const submitSurvey = async (surveyData) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/survey`, surveyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (err) {
    console.error("Error submitting survey:", err);
    if (err.response) {
      throw new Error(err.response.data.error || "Failed to submit survey");
    }
    throw new Error("Network error. Please try again.");
  }
};
