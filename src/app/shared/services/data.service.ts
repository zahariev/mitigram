import { Injectable, signal } from '@angular/core';
import data from '../data.json';
import { Contact } from '../models/contact.model';
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

  getData(): Observable<Contact[]> {
    return this.httpClient
      .get<Contact[]>(this.JSON_DATA_URL)
      .pipe(shareReplay(1));
  }
}
