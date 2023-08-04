import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SeparatorComponent } from 'src/app/core/components/separator/separator.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  standalone: true,
  imports: [CommonModule, SeparatorComponent],
})
export class EmailComponent {
  inviteUser(email: string) {
    console.log(email);
  }
}
