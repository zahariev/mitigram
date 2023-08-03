import { Injectable, signal } from '@angular/core';
import { Contact } from 'src/app/shared/models/contact.model';
import { Group } from 'src/app/shared/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  private _invitedContacts: Set<Contact> = new Set();
  public invitedContacts = signal(this._invitedContacts);

  constructor() {}

  inviteGroup(group: Group) {
    const contacts: Contact[] = [];
    group.contacts.forEach((contact) =>
      this.invitedContacts.mutate((values) => values.add(contact))
    );

    this.invitedContacts.mutate((values) => [...values, ...contacts]);
  }

  invite(contact: Contact) {
    this.invitedContacts.mutate((values) => values.add(contact));
  }

  removeInvitation(contact: Contact) {
    this.invitedContacts.mutate((values) => values.delete(contact));
  }

  clearAllInvitations() {
    this.invitedContacts.mutate((values) => values.clear());
  }
}
