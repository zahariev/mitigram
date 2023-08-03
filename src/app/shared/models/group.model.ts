import { AddressBookEntry } from './addressBookEntry.model';

export interface Group {
  name: string;
  contacts: AddressBookEntry[];
}
