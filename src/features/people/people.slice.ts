import type { PayloadAction } from "redux-toolkit";
import type { PeopleState, Person } from "./people.types";

const initialState: PeopleState = {
  items: [],
};

const ADD_PERSON = "people/addPerson" as const;
const UPDATE_PERSON = "people/updatePerson" as const;
const DELETE_PERSON = "people/deletePerson" as const;
const DELETE_MANY = "people/deleteMany" as const;

export const addPerson = (payload: Person): PayloadAction<Person> => ({
  type: ADD_PERSON,
  payload,
});

export const updatePerson = (payload: Person): PayloadAction<Person> => ({
  type: UPDATE_PERSON,
  payload,
});

export const deletePerson = (payload: string): PayloadAction<string> => ({
  type: DELETE_PERSON,
  payload,
});

export const deleteMany = (payload: string[]): PayloadAction<string[]> => ({
  type: DELETE_MANY,
  payload,
});

const isPerson = (value: unknown): value is Person => {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string" &&
    typeof candidate.phone === "string" &&
    typeof candidate.birthday === "string"
  );
};

const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((item) => typeof item === "string");

const isAddPersonAction = (
  action: PayloadAction<unknown>,
): action is PayloadAction<Person> =>
  action.type === ADD_PERSON && isPerson(action.payload);

const isUpdatePersonAction = (
  action: PayloadAction<unknown>,
): action is PayloadAction<Person> =>
  action.type === UPDATE_PERSON && isPerson(action.payload);

const isDeletePersonAction = (
  action: PayloadAction<unknown>,
): action is PayloadAction<string> =>
  action.type === DELETE_PERSON && typeof action.payload === "string";

const isDeleteManyAction = (
  action: PayloadAction<unknown>,
): action is PayloadAction<string[]> =>
  action.type === DELETE_MANY && isStringArray(action.payload);

const handleAddPerson = (state: PeopleState, action: PayloadAction<Person>) => ({
  ...state,
  items: [...state.items, action.payload],
});

const handleUpdatePerson = (
  state: PeopleState,
  action: PayloadAction<Person>,
) => ({
  ...state,
  items: state.items.map((item) =>
    item.id === action.payload.id ? action.payload : item,
  ),
});

const handleDeletePerson = (
  state: PeopleState,
  action: PayloadAction<string>,
) => ({
  ...state,
  items: state.items.filter((item) => item.id !== action.payload),
});

const handleDeleteMany = (
  state: PeopleState,
  action: PayloadAction<string[]>,
) => {
  const ids = new Set(action.payload);
  return {
    ...state,
    items: state.items.filter((item) => !ids.has(item.id)),
  };
};

export const peopleReducer = (
  state: PeopleState | undefined,
  action: PayloadAction<unknown>,
): PeopleState => {
  const currentState = state ?? initialState;

  if (isAddPersonAction(action)) {
    return handleAddPerson(currentState, action);
  }

  if (isUpdatePersonAction(action)) {
    return handleUpdatePerson(currentState, action);
  }

  if (isDeletePersonAction(action)) {
    return handleDeletePerson(currentState, action);
  }

  if (isDeleteManyAction(action)) {
    return handleDeleteMany(currentState, action);
  }

  return currentState;
};
