import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class EmailComponent {
  inviteUser(email: string) {
    console.log(email);
  }
}
