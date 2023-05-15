import { config } from './config';

const { API_BASE_URL } = config;

export const GET_NUMBER_OF_USERS = `${API_BASE_URL}/is-it-safe/dashboard/user`;
export const DASHBOARD_LOGIN = `${API_BASE_URL}/is-it-safe/auth/dashboard/login`;
