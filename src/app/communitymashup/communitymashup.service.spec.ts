import { TestBed } from '@angular/core/testing';

import { CommunitymashupService } from './communitymashup.service';

describe('CommunitymashupService', () => {
  let service: CommunitymashupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommunitymashupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
