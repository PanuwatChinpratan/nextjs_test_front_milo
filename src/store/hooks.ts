"use client";

import { useSyncExternalStore } from "react";
import { store, type AppDispatch, type RootState } from "./store";

export const useAppDispatch = (): AppDispatch => store.dispatch;

export const useAppSelector = <Selected>(
  selector: (state: RootState) => Selected,
): Selected =>
  useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  );
