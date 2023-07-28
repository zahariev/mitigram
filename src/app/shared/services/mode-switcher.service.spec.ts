import { TestBed } from '@angular/core/testing';

import { ModeSwitcherService } from './mode-switcher.service';

describe('ModeSwitcherService', () => {
  let service: ModeSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
