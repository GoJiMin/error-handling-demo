"use client";

import { useEffect } from "react";
import { useAppError } from "@/entities/errors/store/errorStore";
import { useToast } from "@/shared/lib/hooks/use-toast";
import isRequestError from "@/shared/lib/utils/isRequestError";
import { SERVER_ERROR_MESSAGE } from "@/shared/lib/consts/errorMessage";

const isPredictableError = (error: Error) => {
  if (isRequestError(error) && error.errorCode === "INTERNAL_SERVER_ERROR")
    return false;

  return SERVER_ERROR_MESSAGE[error.name] !== undefined;
};

const ErrorCatcher = ({ children }: { children: React.ReactNode }) => {
  const error = useAppError();
  const { toast } = useToast();

  useEffect(() => {
    if (!error) return;

    if (!isRequestError(error) || !isPredictableError(error)) throw error;

    toast({
      title: "에러가 발생했어요.",
      description: SERVER_ERROR_MESSAGE[error.errorCode],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return children;
};

export default ErrorCatcher;
