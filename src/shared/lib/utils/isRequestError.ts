import RequestError from "@/entities/errors/RequestError";

function isRequestError(error: Error): error is RequestError {
  return error instanceof RequestError;
}

export default isRequestError;
