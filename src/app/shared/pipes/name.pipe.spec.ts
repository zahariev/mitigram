import { TestBed } from '@angular/core/testing';
import { FullNamePipe } from './name.pipe';
import { Name } from '../models/addressBookEntry.model';
fdescribe('FullNamePipe', () => {
  let pipe: FullNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FullNamePipe],
    });

    pipe = TestBed.inject(FullNamePipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the full name when a Name object is provided', () => {
    const name: Name = {
      first: 'John',
      last: 'Doe',
    };
    const result = pipe.transform(name);
    expect(result).toBe('John Doe');
  });

  it('should return the same name when a string is provided', () => {
    const name = 'John Doe';
    const result = pipe.transform(name);
    expect(result).toBe(name);
  });
});
