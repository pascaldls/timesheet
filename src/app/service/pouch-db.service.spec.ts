import { TestBed, inject } from '@angular/core/testing';

import { PouchDbService } from './pouch-db.service';

describe('PouchDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PouchDbService]
    });
  });

  it('should be created', inject([PouchDbService], (service: PouchDbService) => {
    expect(service).toBeTruthy();
  }));
});
