import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when setItem is called', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
      service.setItem('test', 'test123');
    });

    it('should set localstorage item', () => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('when getItem is called', () => {
    beforeEach(() => {
      service.setItem('test', 'test123');
    });

    it('should return an object', () => {
      expect(service.getItem('test')).toBe('test123');
    });
  });

  describe('when removeItem is called', () => {
    beforeEach(() => {
      spyOn(localStorage, 'removeItem');
      service.setItem('test', 'test123');
      service.removeItem('test');
    });

    it('should remove localstorage item', () => {
      expect(localStorage.removeItem).toHaveBeenCalledWith('test');
    });
  });
});
