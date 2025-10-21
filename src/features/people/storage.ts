import type { PeopleState } from "./people.types";

const STORAGE_KEY = "peopleState";

export interface PersistedPeopleState {
  people: PeopleState;
}

const isBrowser = (): boolean => typeof window !== "undefined";

export const loadState = (): PersistedPeopleState | undefined => {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return undefined;
    }

    const parsed = JSON.parse(stored) as PersistedPeopleState;
    if (!parsed || !parsed.people || !Array.isArray(parsed.people.items)) {
      return undefined;
    }

    return parsed;
  } catch {
    return undefined;
  }
};

export const saveState = (state: PersistedPeopleState): void => {
  if (!isBrowser()) {
    return;
  }

  try {
    const serialized = JSON.stringify(state);
    window.localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // Silently ignore persistence issues (e.g., private mode quota restrictions).
  }
};
