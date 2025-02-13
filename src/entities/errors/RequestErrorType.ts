import { Body, Method } from "@/shared/apis/request";

export type RequestErrorType = Error & {
  requestBody: Body;
  status: number;
  endpoint: string;
  errorCode: string;
  message: string;
  method?: Method;
};
