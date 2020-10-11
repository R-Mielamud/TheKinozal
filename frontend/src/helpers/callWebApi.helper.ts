import qs from 'qs';
import { WebApiException } from '../typings/webApiException';
import { getToken } from './token.helper';

const BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '/';
const API = 'api/';

interface RequestArgs {
	endpoint: string;
	method: 'GET' | 'POST' | 'PUT' | 'DELETE';
	skipAuthorization?: boolean;
	query?: Record<string, any>;
	body?: any;
	attachment?: File;
	attachmentFieldName?: string;
}

type Body =
	| string
	| Blob
	| ArrayBufferView
	| ArrayBuffer
	| FormData
	| URLSearchParams
	| ReadableStream<Uint8Array>
	| null
	| undefined;

export default async function callWebApi(args: RequestArgs): Promise<Response> {
	try {
		const res: Response = await fetch(getUrl(args), getArgs(args));
		await throwIfResponseFailed(res);
		return res;
	} catch (err) {
		throw err;
	}
}

export async function throwIfResponseFailed(res: Response) {
	if (!res.ok) {
		const exception: WebApiException = {
			status: res.status,
			statusText: res.statusText,
			url: res.url,
			clientException: null,
		};

		try {
			exception.clientException = await res.json();
		} catch {}
		throw exception;
	}
}

const getUrl = (args: RequestArgs): RequestInfo =>
	BASE_URL + API + args.endpoint + (args.query ? `?${qs.stringify(args.query)}` : '');

const getArgs = (args: RequestArgs): RequestInit => {
	const headers: Headers | string[][] | Record<string, string> | undefined = {};
	const token = getToken();
	let body: Body;
	if (token && !args.skipAuthorization) {
		headers.Authorization = `Bearer ${token}`;
	}

	if (args.attachment) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support attachments.');
		}
		const formData = new FormData();
		formData.append(args.attachmentFieldName ?? 'image', args.attachment);

		if (args.body) {
			Object.entries(args.body).forEach(([key, value]) => {
				formData.append(key, String(value));
			});
		}

		body = formData;
	} else if (args.body) {
		if (args.method === 'GET') {
			throw new Error('GET request does not support request body.');
		}
		body = JSON.stringify(args.body);
		headers['Content-Type'] = 'application/json';
		headers.Accept = 'application/json';
	}

	return {
		method: args.method,
		headers,
		...(args.method === 'GET' ? {} : { body }),
	};
};
