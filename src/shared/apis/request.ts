/**
 * 먼저 이 파일을 읽기 이전에 API가 어떻게 호출되는지 순서를 보고 가시면 좋겠어요.
 *
 * 1. request 함수가 호출돼요.
 * - request 함수가 API 호출의 시작점이라고 볼 수 있어요.
 * - request 함수는 크게 prepareRequest와 executeRequest 나뉘어요.
 * - prepareRequest와 executeRequest 함수는 말 그대로 함수를 준비하고 실행하는 함수들이에요.
 * 2. prepareRequest 함수가 호출돼요.
 * - baseurl과 request 함수를 호출할 때 인자로 넘긴 endpoint를 합성해 url을 생성해요.
 * - 만약 queryParmas가 있다면 url에 추가해요.
 * -
 */

import RequestError from "@/entities/errors/RequestError";
import {
  RequestGetError,
  WithErrorHandlingStrategy,
} from "@/entities/errors/RequestGetError";
import objectToQueryString from "@/shared/lib/utils/objectToQueryString";

// 우리 서비스에서 사용하는 HTTP Method를 정의한 유니온 타입이에요.
export type Method = "GET" | "POST" | "DELETE";

// { "string": "string" | 25 | true } 형식이라는 의미에요.
export type ObjectQueryParams = Record<string, string | number | boolean>;
export type Body = BodyInit | object | null;

const API_BASE_URL = "http://localhost:3001/api";

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

async function executeRequest({
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
  return executeRequest({
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

export async function requestDelete({
  headers = {},
  ...args
}: RequestMethodProps) {
  await request({ method: "DELETE", headers, ...args });
}
