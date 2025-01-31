import { ObjectQueryParams } from "@/shared/apis/request";

const objectToQueryString = (params: ObjectQueryParams): string =>
  Object.entries(params)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");

export default objectToQueryString;
