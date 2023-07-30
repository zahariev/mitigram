import { Injectable } from '@angular/core';
import data from '../data.json';
import { Contact } from '../models/contact.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public contacts: any[] = data;
  public groups: Group[] = [];

  name = 'Mitigram Contacts';

  constructor() {
    this.groups = this.getUniqueGroups(this.contacts);
    console.log(this.groups);
  }

  getUniqueGroups(data: Contact[]): any[] {
    const uniqueGroupsSet = new Set();
    console.log(data);

    data.forEach((record) => {
      if (record.groups && Array.isArray(record.groups)) {
        record.groups.forEach((group) => {
          uniqueGroupsSet.add(group);
        });
      }
    });

    return Array.from(uniqueGroupsSet);
  }
}
