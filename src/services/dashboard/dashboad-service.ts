import { apiRequest, createPayload } from '../../utils/api-request';
import { DASHBOARD_LOGIN, GET_NUMBER_OF_USERS } from '../../utils/api-urls';
import {
	DashboardLoginResult,
	GetNumberOfUsersProps,
	GetNumberOfUsersResult,
} from './types';

const GetNumberOfUsers = async ({ authKey }: GetNumberOfUsersProps) => {
	return await apiRequest({ url: GET_NUMBER_OF_USERS, authKey })
		.get()
		.json((response) => {
			const resp = response as GetNumberOfUsersResult;
			return createPayload.success(resp);
		})
		.catch((e) => createPayload.error(e, e.status, e.message));
};

const DashBoardLogin = async () => {
	return await apiRequest({ url: DASHBOARD_LOGIN })
		.post({
			username: 'admin@gmail.com',
			password: '123456',
		})
		.json((response) => {
			const resp = response as DashboardLoginResult;
			return createPayload.success(resp);
		})
		.catch((e) => createPayload.error(e, e.status, e.message));
};

export const DashboardService = { GetNumberOfUsers, DashBoardLogin };
