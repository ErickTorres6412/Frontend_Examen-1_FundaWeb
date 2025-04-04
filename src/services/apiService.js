import { createGenericService } from '../services/createGenericService';
import { API_ENDPOINTS } from '../constants/API_ENDPOINTS';

export const empleadoService = createGenericService(API_ENDPOINTS.EMPLEADO.BASE);