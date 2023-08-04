import { Injectable, signal } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressBookEntry } from 'src/app/shared/models/addressBookEntry.model';
import { Group } from 'src/app/shared/models/group.model';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
  private _invitedContacts: Set<AddressBookEntry> = new Set();
  public invitedContacts = signal(this._invitedContacts);

  constructor(private _snackBar: MatSnackBar) {}

  inviteGroup(group: Group) {
    const contacts: AddressBookEntry[] = [];
    group.contacts.forEach((contact) =>
      this.invitedContacts.mutate((values) => values.add(contact))
    );

    this.invitedContacts.mutate((values) => [...values, ...contacts]);
  }

  isInvited(contact: AddressBookEntry): boolean {
    return this._invitedContacts.has(contact);
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

  inviteByMail(email: string) {
    if (!email) return;
    if (this.validateEmail(email)) {
      const contact = new AddressBookEntry({ email });
      this.invitedContacts.mutate((values) => values.add(contact));
    } else this.openSnackBar('Invalid email', '');
  }

  validateEmail(email: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1500,
      panelClass: ['snackbar'],
    });
  }
}
