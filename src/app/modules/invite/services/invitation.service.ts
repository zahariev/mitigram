import { Injectable, signal } from '@angular/core';
import { AddressBookEntry } from 'src/app/shared/models/addressBookEntry.model';
import { Group } from 'src/app/shared/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  private _invitedContacts: Set<AddressBookEntry> = new Set();
  public invitedContacts = signal(this._invitedContacts);

  constructor() {}

  inviteGroup(group: Group) {
    const contacts: AddressBookEntry[] = [];
    group.contacts.forEach((contact) =>
      this.invitedContacts.mutate((values) => values.add(contact))
    );

    this.invitedContacts.mutate((values) => [...values, ...contacts]);
  }

  invite(contact: AddressBookEntry) {
    this.invitedContacts.mutate((values) => values.add(contact));
  }

  removeInvitation(contact: AddressBookEntry) {
    this.invitedContacts.mutate((values) => values.delete(contact));
  }

  clearAllInvitations() {
    this.invitedContacts.mutate((values) => values.clear());
  }
}
