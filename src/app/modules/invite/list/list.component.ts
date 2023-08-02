import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FullNamePipe } from 'src/app/shared/pipes/name.pipe';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  standalone: true,
  imports: [CommonModule, FullNamePipe],
})
export class ListComponent {
  @Input() data: any[] = [];
}
