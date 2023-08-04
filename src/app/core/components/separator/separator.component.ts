import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-separator',
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.scss'],
  standalone: true,
  imports: [TranslateModule],
})
export class SeparatorComponent {
  @Input() text: string = '';
}
