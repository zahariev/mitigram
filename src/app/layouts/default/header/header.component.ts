/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClientModule } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatSlideToggleChange,
  MatSlideToggleModule,
} from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    RouterModule,
    TranslateModule,
    MatDividerModule,
    HttpClientModule,
  ],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Output() toggleSideBarForMe: EventEmitter<string> = new EventEmitter();
  @ViewChild('searchInput') searchInput!: ElementRef;

  selectedIdx = 1;
  value = '';
  user!: any;
  tabs!: any;
  filter = '';
  isEnglish!: boolean;
  defaultLanguage = '';
  searchString!: string;

  constructor(public translate: TranslateService) {
    this.user = { id: 1, firstName: 'User 1' };
  }

  toggleLanguage(event: MatSlideToggleChange): void {
    if (event.checked) this.translate.use('en');
    else this.translate.use(this.defaultLanguage);
  }

  menuClick(): void {}

  toggleSidebar(side: string): void {
    this.toggleSideBarForMe.emit(side);
    // Event triggering to resize components in Content container
  }

  signOut(): void {}
}
