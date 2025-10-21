import type { RootState } from "@/store/store";
import type { PeopleState, Person } from "./people.types";

export const selectPeopleState = (state: RootState): PeopleState => state.people;

export const selectPeopleItems = (state: RootState): Person[] =>
  selectPeopleState(state).items;
