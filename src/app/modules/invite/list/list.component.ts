import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input } from '@angular/core';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FullNamePipe],
})
export class ListComponent {
  @ContentChild('content') content!: any;
  @ContentChild('item') item!: any;
  @Input() data!: any;
}
