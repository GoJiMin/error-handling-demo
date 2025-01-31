import RequestError from "@/entities/errors/RequestError";
import {
  RequestGetError,
  WithErrorHandlingStrategy,
} from "@/entities/errors/RequestGetError";
import objectToQueryString from "@/shared/lib/utils/objectToQueryString";

export type Method = "GET" | "POST";
export type ObjectQueryParams = Record<string, string | number | boolean>;
export type Body = BodyInit | object | null;

const API_BASE_URL = "http://localhost:3000/api";

type HeadersType = [string, string][] | Record<string, string> | Headers;

type RequestInitWithMethod = Omit<RequestInit, "method"> & { method: Method };

type RequestProps = {
  baseUrl?: string;
  endpoint: string;
  method: Method;
  headers?: HeadersType;
  body?: Body;
  queryParams?: ObjectQueryParams;
};

type RequestMethodProps = Omit<RequestProps, "method">;

type CreateRequestInitProps = {
  body?: Body;
  method: Method;
  headers?: HeadersType;
};

type FetchType = {
  url: string;
  requestInit: RequestInitWithMethod;
};

function createRequestInit({ method, headers, body }: CreateRequestInitProps) {
  const requestInit: RequestInitWithMethod = {
    credentials: "include",
    method,
  };

  if (body instanceof FormData) {
    return { ...requestInit, body };
  } else {
    return {
      ...requestInit,
      headers: { ...headers, "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    };
  }
}

function prepareRequest({
  baseUrl = API_BASE_URL,
  method,
  endpoint,
  headers,
  body,
  queryParams,
}: RequestProps) {
  let url = `${baseUrl}${endpoint}`;

  if (queryParams) url += `?${objectToQueryString(queryParams)}`;

  const requestInit = createRequestInit({ method, headers, body });

  return { url, requestInit };
}

async function excuteRequest({
  url,
  requestInit,
  errorHandlingStrategy,
}: WithErrorHandlingStrategy<FetchType>) {
  try {
    const response: Response = await fetch(url, requestInit);

    if (!response.ok) {
      throw await createError({
        response,
        body: requestInit.body ? JSON.stringify(requestInit.body) : null,
        requestInit,
        errorHandlingStrategy,
      });
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }

    throw error;
  }
}

type CreateError = {
  response: Response;
  body: Body;
  requestInit: RequestInitWithMethod;
};

type ErrorInfo = {
  errorCode: string;
  message: string;
};

async function request(props: WithErrorHandlingStrategy<RequestProps>) {
  const { url, requestInit } = prepareRequest(props);
  return excuteRequest({
    url,
    requestInit,
    errorHandlingStrategy: props.errorHandlingStrategy,
  });
}

async function createError({
  response,
  body,
  requestInit,
  errorHandlingStrategy,
}: WithErrorHandlingStrategy<CreateError>) {
  const { errorCode, message }: ErrorInfo = await response.json();

  if (requestInit.method === "GET") {
    return new RequestGetError({
      status: response.status,
      requestBody: body,
      endpoint: response.url,
      name: errorCode,
      method: requestInit.method,
      errorHandlingStrategy,
      message,
      errorCode,
    });
  }

  return new RequestError({
    status: response.status,
    requestBody: body,
    endpoint: response.url,
    name: errorCode,
    method: requestInit.method,
    message,
    errorCode,
  });
}

export async function requestGet<T>({
  headers = {},
  errorHandlingStrategy,
  ...args
}: WithErrorHandlingStrategy<RequestMethodProps>): Promise<T> {
  const response = await request({
    ...args,
    method: "GET",
    headers,
    errorHandlingStrategy,
  });

  const data: T = await response.json();
  return data;
}

export async function requestPostWithoutResponse({
  headers = {},
  ...args
}: RequestMethodProps) {
  await request({ method: "POST", headers, ...args });
}

export async function requestPostWithResponse<T>({
  headers = {},
  ...args
}: RequestMethodProps): Promise<T> {
  const response = await request({ method: "POST", headers, ...args });

  const data: T = await response.json();

  return data;
}
