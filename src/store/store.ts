import { configureStore } from "redux-toolkit";
import { peopleReducer } from "@/features/people/people.slice";
import type { PeopleState } from "@/features/people/people.types";
import {
  loadState,
  saveState,
  type PersistedPeopleState,
} from "@/features/people/storage";

const preloadedState: PersistedPeopleState | undefined =
  typeof window !== "undefined" ? loadState() : undefined;

export const store = configureStore<{ people: PeopleState }>({
  reducer: {
    people: peopleReducer,
  },
  preloadedState,
});

if (typeof window !== "undefined") {
  store.subscribe(() => {
    saveState({ people: store.getState().people });
  });
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
