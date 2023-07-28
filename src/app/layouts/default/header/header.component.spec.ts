import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    let translateService: TranslateService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                HeaderComponent,
                TranslateModule.forRoot(),
                BrowserAnimationsModule,
                HttpClientTestingModule,
                RouterTestingModule,
            ],
            providers: [],
            schemas: [NO_ERRORS_SCHEMA],
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        // dom = fixture.nativeElement;
        translateService = TestBed.inject(TranslateService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle language to English when slide toggle is checked', () => {
        spyOn(translateService, 'use');

        const slideToggleChange = new MatSlideToggleChange({} as any, true);
        slideToggleChange.checked = true;

        component.toggleLanguage(slideToggleChange);

        expect(translateService.use).toHaveBeenCalledWith('en');
    });

    it('should toggle language to default language when slide toggle is not checked', () => {
        spyOn(translateService, 'use');

        const slideToggleChange = new MatSlideToggleChange({} as any, true);
        slideToggleChange.checked = false;

        component.toggleLanguage(slideToggleChange);

        expect(translateService.use).toHaveBeenCalledWith(component.defaultLanguage);
    });

    it('should emit toggleSideBarForMe event when toggleSidebar is called', () => {
        spyOn(component.toggleSideBarForMe, 'emit');
        component.toggleSidebar('left');

        expect(component.toggleSideBarForMe.emit).toHaveBeenCalledWith('left');
    });

    xit('should sign out', fakeAsync(() => {
        spyOn(component, 'signOut');
        const elements = fixture.debugElement.nativeElement;
        fixture.detectChanges();
        const menuButton = elements.querySelector('#userMenuBtn');
        menuButton.click();
        fixture.detectChanges(); // detect changes to show the menu
        tick();
        fixture.detectChanges(); // detect changes to show the menu
        const signOutButton = elements.querySelector('#signOut');
        signOutButton.click();
        expect(component.signOut).toHaveBeenCalled();
    }));
});
