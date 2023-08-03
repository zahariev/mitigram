import { Injectable, signal } from '@angular/core';
import { AddressBookEntry } from '../models/addressBookEntry.model';
import { Group } from '../models/group.model';
import {
  BehaviorSubject,
  Observable,
  debounceTime,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
// A Service for fetching data from a JSON file
export class DataService {
  private readonly JSON_DATA_URL = '../../../assets/data.json';

  constructor(private readonly httpClient: HttpClient) {}

  getData(): Observable<AddressBookEntry[]> {
    return this.httpClient
      .get<AddressBookEntry[]>(this.JSON_DATA_URL)
      .pipe(shareReplay(1));
  }
}
