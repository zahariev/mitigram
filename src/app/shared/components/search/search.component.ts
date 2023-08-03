/* eslint-disable prettier/prettier */
import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @ViewChild('searchInput') inputBox!: ElementRef<HTMLInputElement>;

  @Input() placeholder = 'Search';
  @Input() set setMe(value: string) {
    this.value = value;
    if (this.value.length > 0) this.isExpanded = true;
    else this.isExpanded = false;
  }

  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() command: EventEmitter<string> = new EventEmitter<string>();

  @HostListener('window:keydown', ['$event'])
  keyEvent(_event: KeyboardEvent): void {
    // this.isExpanded = true;
    this.inputBox.nativeElement.focus();
  }

  isExpanded = false;
  value = '';
  constructor() {}

  clearSelection(): void {
    this.isExpanded = false;
    this.value = '';

    this.search.emit(this.value);
  }

  toggleSearch(): void {
    this.isExpanded = !this.isExpanded;
    if (this.isExpanded) {
      this.inputBox.nativeElement.focus();
    } else this.value = '';
  }

  onKeyup(event: KeyboardEvent): void {
    const isMeta = [
      'Shift',
      'CapsLock',
      'Meta',
      'Tab',
      'Escape',
      'ArrowLeft',
      'ArrowRight',
    ].includes(event.key);
    if (!isMeta) {
      // if(event.key === ['Tab') return;
      if (event.key === 'Escape' || this.value === '') {
        this.clearSelection();
        return;
      }

      if (this.inputBox.nativeElement.value.length > 0) this.isExpanded = true;
      else this.isExpanded = false;

      if (this.value.trim().length > 1) this.search.emit(this.value.trim());
      //can't search for 1 character
      else this.search.emit('');
    }
  }
}
