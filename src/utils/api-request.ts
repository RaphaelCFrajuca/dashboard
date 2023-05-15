import wretch, { Wretch } from 'wretch';

type RequestError = {
	status: number;
	message: string;
	error: null;
};

export type IPayload<returnType = null> =
	| {
			isSuccess: true;
			result: returnType;
	  }
	| {
			isSuccess: false;
			error: RequestError;
	  };

type IRequest = {
	url: string;
	authKey?: string;
};

export const apiRequest = ({ url, authKey }: IRequest): Wretch => {
	let req = wretch(url);
	if (authKey) req = req.auth(`Bearer ${authKey}`);
	return req;
};

function onSuccess<returnType = null>(
	response: returnType,
): IPayload<returnType> {
	return {
		isSuccess: true,
		result: response,
	};
}

function onError(
	error: null,
	status: number | string,
	message: string,
): IPayload {
	return {
		isSuccess: false,
		error: {
			error,
			message,
			status: Number(status),
		},
	};
}

export const createPayload = {
	success: onSuccess,
	error: onError,
};
