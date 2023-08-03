import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AddressBookEntry } from 'src/app/shared/models/addressBookEntry.model';
import { Group } from 'src/app/shared/models/group.model';
import { DataService } from 'src/app/shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AddressBookService {
  public groups$: BehaviorSubject<Group[]> = new BehaviorSubject<Group[]>([]);
  public addressBook$: BehaviorSubject<AddressBookEntry[]> =
    new BehaviorSubject<AddressBookEntry[]>([]);

  private _rawAddressBook: AddressBookEntry[] = [];

  public filteredAddressBook$: Observable<AddressBookEntry[]> = new Observable<
    AddressBookEntry[]
  >();

  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(dataService: DataService) {
    dataService
      .getData()
      .pipe(
        tap((entities: AddressBookEntry[]) => {
          const groups = this.getUniqueGroups(entities);
          this.groups$.next(groups);

          this._rawAddressBook = entities;
          this;
        })
      )
      .subscribe();
    this.listenForSearch();
  }

  onSearch(event: any): void {
    this.searchQuery$.next(event);
  }

  private getUniqueGroups(data: any[]): Group[] {
    //
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

  private listenForSearch(): void {
    this.filteredAddressBook$ = this.searchQuery$.pipe(
      // wait 250ms after each keystroke before firing the search
      debounceTime(250),
      switchMap((searchVal: string) => {
        return of(
          this._rawAddressBook?.filter((entry: AddressBookEntry) => {
            return (
              entry.company.includes(searchVal) ||
              entry.email.includes(searchVal) ||
              `${entry.name.first} ${entry.name.last}`.includes(searchVal)
            );
          }) || []
        );
      })
    );
  }
}
