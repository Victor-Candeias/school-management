import axios from "axios"; // Import the axios library for making HTTP requests

// Define the base URL for the authentication API, falling back to localhost if the environment variable is not set
// const API_BASE_AUTH_URL = process.env.NEXT_PUBLIC_API_AUTH_URL || "http://127.0.0.1:8010/";

// Define the base URL for the school-related API, falling back to localhost if the environment variable is not set
const API_BASE_SCHOLL_URL = process.env.NEXT_PUBLIC_API_SCHOLL_URL || "http://127.0.0.1:8020";

// Create an axios instance for authentication-related API requests
export const apiAuthClient = axios.create({
  baseURL: API_BASE_SCHOLL_URL, // Set the base URL for authentication API requests
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON for all requests
  },
});

// Create an axios instance for school-related API requests
export const apiSChoolClient = axios.create({
  baseURL: API_BASE_SCHOLL_URL, // Set the base URL for school API requests
  headers: {
    "Content-Type": "application/json", // Set the content type to JSON for all requests
  },
});
