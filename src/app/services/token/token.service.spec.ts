import {TestBed} from '@angular/core/testing';

import {TokenService} from './token.service';
import {StorageService} from "../storage/storage.service";

describe('TokenService', () => {
  let service: TokenService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);
    storageService = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when storeToken is called', () => {
    beforeEach(() => {
      spyOn(storageService, 'setItem');
      service.storeToken('test123');
    });

    it('should store the token', () => {
      expect(storageService.setItem).toHaveBeenCalledWith('access-token', 'test123');
    });
  });

  describe('when doesTokenExist is called', () => {
    describe('and token does exist', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue('test123');
      });

      it('should return true', () => {
        expect(service.doesTokenExist()).toBeTruthy();
      });
    });

    describe('and token does not exist', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue(null);
      });

      it('should return true', () => {
        expect(service.doesTokenExist()).toBeFalse();
      });
    });
  });

  describe('when getToken is called', () => {
    describe('and token does exist', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue('test123');
      });

      it('should return the token', () => {
        expect(service.getToken()).toBe('test123')
      });
    });

    describe('and token does not exist', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue(null);
      });

      it('should return null', () => {
        expect(service.getToken()).toBeNull();
      });
    });
  });

  describe('when removeToken is called', () => {
    beforeEach(() => {
      spyOn(storageService, 'removeItem');
      service.removeToken();
    });

    it('should remove the token', () => {
      expect(storageService.removeItem).toHaveBeenCalledWith('access-token');
    });
  });

  describe('when getUsername is called', () => {
    describe('and token is populated', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
      });

      it('should return the username', () => {
        expect(service.getUsername()).toBe('1234567890');
      });
    });

    describe('and token is null', () => {
      beforeEach(() => {
        spyOn(storageService, 'getItem').and.returnValue(null);
      });

      it('should return null', () => {
        expect(service.getUsername()).toBeNull();
      });
    });
  });
});
