import { Injectable, signal } from '@angular/core';
import data from '../data.json';
import { Contact } from '../models/contact.model';
import { Group } from '../models/group.model';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public contacts: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>(
    []
  );
  public groups: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);

  private _invitedContacts: Set<Contact> = new Set();
  public invitedContacts = signal(this._invitedContacts);

  constructor() {
    this.contacts.next(data as any);
    this.groups.next(this.getUniqueGroups(data));
  }

  inviteGroup(group: Group) {
    const contacts: Contact[] = [];
    group.contacts.forEach((contact) =>
      this.invitedContacts.mutate((values) => values.add(contact))
    );

    this.invitedContacts.mutate((values) => [...values, ...contacts]);
  }

  invite(contact: Contact) {
    this.invitedContacts.mutate((values) => values.add(contact));
    console.log(this.invitedContacts().size);
  }

  removeInvitation(contact: Contact) {
    this.invitedContacts.mutate((values) => values.delete(contact));
  }

  private getUniqueGroups(data: any[]): Group[] {
    const groupsWithChildRecords: Group[] = [];

    data.forEach((contact) => {
      // Check if the contact has groups
      if (contact.groups && Array.isArray(contact.groups)) {
        // Loop through each group in the contact
        contact.groups.forEach((group: string) => {
          // Check if the group already exists
          const existingGroup = groupsWithChildRecords.findIndex(
            (item) => item.name === group
          );

          // Group doesn't exist yet, so add it
          if (existingGroup === -1) {
            groupsWithChildRecords.push({ name: group, contacts: [contact] });
          } else {
            // Group already exists, so add the contact to it
            groupsWithChildRecords[existingGroup].contacts.push(contact);
          }
        });
      }
    });

    return groupsWithChildRecords;
  }
}
