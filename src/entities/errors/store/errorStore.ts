import { create } from "zustand";
import RequestError from "@/entities/errors/RequestError";

type State = {
  appError: RequestError | null;
};

type Action = {
  updateAppError: (appError: State["appError"]) => void;
};

const appErrorStore = create<State & Action>((set) => ({
  appError: null,
  updateAppError: (appError) => set(() => ({ appError })),
}));

export const useAppError = () => appErrorStore((state) => state.appError);
export const useUpdateAppError = () =>
  appErrorStore((state) => state.updateAppError);
