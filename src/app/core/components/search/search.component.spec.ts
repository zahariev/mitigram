import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';
import { SearchComponent } from './search.component';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        SearchComponent,
        FormsModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set focus on input on keydown', () => {
    const event = new KeyboardEvent('keydown', { key: 't' });
    spyOn(component.inputBox.nativeElement, 'focus');

    window.dispatchEvent(event);
    expect(component.inputBox.nativeElement.focus).toHaveBeenCalled();
  });

  it('should clear the search value and emit the search event when the clear button is clicked', () => {
    spyOn(component.search, 'emit');
    component.isExpanded = true;
    component.value = 'test';
    fixture.detectChanges();
    const button =
      fixture.debugElement.nativeElement.querySelector('.search-close');
    button.click();
    expect(component.value).toBe('');
    expect(component.search.emit).toHaveBeenCalledWith('');
  });

  it('should expand the search input when the search button is clicked', () => {
    const button =
      fixture.debugElement.nativeElement.querySelector('.search-btn');
    button.click();
    fixture.detectChanges();
    const input =
      fixture.debugElement.nativeElement.querySelector('.search-input');
    expect(input.classList.contains('expanded')).toBeTruthy();
  });

  it('should collapse the search input and clear the search value when the clear button is clicked', () => {
    component.isExpanded = true;
    component.value = 'test';
    fixture.detectChanges();
    const button =
      fixture.debugElement.nativeElement.querySelector('.search-close');
    button.click();
    fixture.detectChanges();
    const input =
      fixture.debugElement.nativeElement.querySelector('.search-input');
    expect(input.classList.contains('expanded')).toBeFalsy();
    expect(component.value).toBe('');
  });

  it('should emit search event when keypress event is fired with a specific key', fakeAsync(() => {
    const searchSpy = spyOn(component.search, 'emit');
    const testKey = 'a';
    const input = fixture.debugElement.query(
      By.css('.search-input')
    ).nativeElement;

    const event = new KeyboardEvent('keydown', { key: testKey });
    window.dispatchEvent(event);
    input.dispatchEvent(new KeyboardEvent('keyup', { key: testKey }));

    tick();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(searchSpy).toHaveBeenCalledWith(testKey);
    });
  }));

  it('should emit the search value when the user types in the search input', () => {
    spyOn(component.search, 'emit');
    const input =
      fixture.debugElement.nativeElement.querySelector('.search-input');
    component.value = 'test';
    input.dispatchEvent(new KeyboardEvent('keyup'));
    fixture.detectChanges();
    expect(component.search.emit).toHaveBeenCalledWith('test');
  });
});
