export interface Name {
  first: string;
  last: string;
}

export interface AddressBookEntry {
  _id: number;
  picture: string;
  name: Name;
  company: string;
  email: string;
  phone: string;
  groups: string[];
}
