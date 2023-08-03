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
  @ContentChild('item2') item2!: any;
  @Input() data!: any;

  trackById(index: number, content: any): string {
    return content._id;
  }
}
