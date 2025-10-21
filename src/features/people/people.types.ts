export interface Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday: string;
}

export interface PeopleState {
  items: Person[];
}
