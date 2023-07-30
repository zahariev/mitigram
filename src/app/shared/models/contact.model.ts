export interface Name {
  first: string;
  last: string;
}

export interface Contact {
  _id: number;
  picture: string;
  name: Name;
  company: string;
  email: string;
  phone: string;
  groups: string[];
}
