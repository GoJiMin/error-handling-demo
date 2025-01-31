import { endpoints } from "@/shared/lib/consts/endpoints";
import { requestGet } from "../request";

export type User = {
  userId: string;
  userName: string;
  userEmail: string;
};

export const requestGetUser = async (id: string): Promise<User> => {
  return requestGet<User>({
    endpoint: endpoints.users.getUser(id),
    errorHandlingStrategy: "errorBoundary",
  });
};
