import axios from "axios";

export const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
      Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`,
      'Accept-Version': "v1",
  },
});

// Log all responses
// unsplashApi.interceptors.response.use(
//   response => {
//     if (response.config.url?.includes('/photos')) {
//       const dataLength = Array.isArray(response.data) ? response.data.length : 'not-array';
//       console.log(`📡 API Response: ${response.config.url}`, {
//         dataLength,
//         status: response.status,
//         hasData: !!response.data
//       });
//     }
//     return response;
//   },
//   error => {
//     console.error('❌ API Error:', error.message);
//     return Promise.reject(error);
//   }
// );
