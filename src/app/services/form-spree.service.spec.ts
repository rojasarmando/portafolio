import { TestBed } from '@angular/core/testing';

import { FormSpreeService } from './form-spree.service';

describe('FormSpreeService', () => {
  let service: FormSpreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormSpreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
