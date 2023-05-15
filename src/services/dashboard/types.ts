export type GetNumberOfUsersProps = {
	authKey: string;
};

export type GetNumberOfUsersResult = {
	chart: [
		{
			count_by_month: [
				{
					count: number;
					month: string;
				},
			];
			count_by_year: number;
			year: string;
		},
	];
	gender: [
		{
			count: number;
			name: string;
		},
	];
	sexual_orientation: [
		{
			count: number;
			name: string;
		},
	];
	total_users: number;
};

export type DashboardLoginResult = {
	refresh_token: string;
	token_jwt: string;
	token_type: string;
	user: {
		email: string;
		id: number;
		name: string;
		role: string;
	};
};
