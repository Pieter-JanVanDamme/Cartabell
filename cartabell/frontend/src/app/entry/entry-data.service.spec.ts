import { TestBed, inject } from '@angular/core/testing';

import { EntryDataService } from './entry-data.service';

describe('EntryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryDataService]
    });
  });

  it('should be created', inject([EntryDataService], (service: EntryDataService) => {
    expect(service).toBeTruthy();
  }));
});
