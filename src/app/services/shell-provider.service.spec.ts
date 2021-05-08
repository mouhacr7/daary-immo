import { TestBed } from '@angular/core/testing';

import { ShellProviderService } from './shell-provider.service';

describe('ShellProviderService', () => {
  let service: ShellProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShellProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
