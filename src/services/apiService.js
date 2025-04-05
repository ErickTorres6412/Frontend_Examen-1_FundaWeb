import { createGenericService } from '../services/createGenericService';
import { API_ENDPOINTS } from '../constants/API_ENDPOINTS';

export const cultureService = createGenericService(API_ENDPOINTS.CULTURE.BASE);