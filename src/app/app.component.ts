import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mitigram';

  isEnglish!: boolean;
  defaultLanguage = '';

  constructor(public translate: TranslateService) {
    this.defaultLanguage = this.translate.getDefaultLang();
    // console.log(this.translate.langs);

    this.isEnglish = this.defaultLanguage === 'en';
    translate.addLangs(['en', 'bg']);
  }
}
