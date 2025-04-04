export const API_ENDPOINTS = {
  EMPLEADO: {
    BASE: '/api/Empleado',
    GET_ALL: '/api/Empleado',
    GET_BY_ID: (id) => `/api/Empleado/${id}`,
    CREATE: '/api/Empleado',
    UPDATE: (id) => `/api/Empleado/${id}`,
    DELETE: (id) => `/api/Empleado/${id}`
  }
};
