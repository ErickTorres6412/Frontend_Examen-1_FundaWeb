export const API_ENDPOINTS = {
  CULTURE: {
    BASE: '/api/Culture',
    GET_ALL: '/api/Culture',
    GET_BY_ID: (id) => `/api/Culture/${id}`,
    CREATE: '/api/Culture',
    UPDATE: (id) => `/api/Culture/${id}`,
    DELETE: (id) => `/api/Culture/${id}`
  }
};
