import { Pipe, PipeTransform } from '@angular/core';
import { Name } from '../models/contact.model';

@Pipe({
  name: 'fullName',
  pure: true,
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(name: Name): string {
    return name.first + ' ' + name.last;
  }
}
