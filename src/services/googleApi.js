import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

/**
 * Get autocomplete predictions for address input
 * @param {string} input - The address input string
 * @returns {Promise<Array>} Array of predictions with placeId and description
 */
export const getAutocompletePredictions = async (input) => {
  try {
    if (!input || input.length < 2) {
      return [];
    }
    const { data } = await axios.get(`${API_BASE_URL}/api/google/autocomplete`, {
      params: { input },
    });
    return data || [];
  } catch (err) {
    console.error("Error fetching autocomplete predictions:", err);
    return [];
  }
};

/**
 * Get place details by placeId
 * @param {string} placeId - The Google Place ID
 * @returns {Promise<Object>} Address object with street, apt, city, state, zip, etc.
 */
export const getPlaceDetails = async (placeId) => {
  try {
    if (!placeId) {
      return null;
    }
    const { data } = await axios.get(`${API_BASE_URL}/api/google/place-details`, {
      params: { placeId },
    });
    return data || null;
  } catch (err) {
    console.error("Error fetching place details:", err);
    return null;
  }
};
