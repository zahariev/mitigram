import { Pipe, PipeTransform } from '@angular/core';
import { Name } from '../models/addressBookEntry.model';

@Pipe({
  name: 'fullName',
  pure: true,
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(name: Name): string {
    if (typeof name === 'string') return name;
    else return name.first + ' ' + name.last;
  }
}
