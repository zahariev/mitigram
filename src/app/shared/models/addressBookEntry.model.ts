export interface Name {
  first: string;
  last: string;
}

export class AddressBookEntry {
  _id: number;
  picture: string;
  name: Name;
  company: string;
  email: string;
  phone: string;
  groups: string[];

  constructor(data: any) {
    this._id = data._id;
    this.picture = data.picture || '';
    this.name = data.name || { first: 'guest', last: '' };
    this.company = data.company || '';
    this.email = data.email || '';
    this.phone = data.phone || '';
    this.groups = data.groups || [];
  }
}
