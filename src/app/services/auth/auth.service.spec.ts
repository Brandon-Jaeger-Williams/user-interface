import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {TokenService} from "../token/token.service";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('AuthService', () => {
  let service: AuthService;
  let tokenService: TokenService;
  let http: HttpClient;
  let router: Router;

  const mockHttpClient = {
    post: () => {
      return of({});
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: mockHttpClient},
      ]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
    tokenService = TestBed.inject(TokenService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when login is called', () => {
    beforeEach(() => {
      spyOn(http, 'post').and.returnValue(of({accessToken: 'test123'}));
      spyOn(tokenService, 'storeToken');
    });

    it('should return a valid token', () => {
      service.login({username: 'test', password: 'test123'}).subscribe(data => {
        expect(data).toEqual({accessToken: 'test123'});
        expect(tokenService.storeToken).toHaveBeenCalledWith('test123');
      })
    });
  });

  describe('when logout is called', () => {
    beforeEach(() => {
      spyOn(tokenService, 'removeToken');
      spyOn(router, 'navigate');
      service.logout();
    });

    it('should remove token', () => {
      expect(tokenService.removeToken).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('when isAuthenticated is called', () => {
    describe('and token is populated', () => {
      beforeEach(() => {
        spyOn(tokenService, 'getToken').and.returnValue('test123');
      });

      it('should return true', () => {
        expect(service.isAuthenticated()).toBeTruthy();
      });
    });

    describe('and token is null', () => {
      beforeEach(() => {
        spyOn(tokenService, 'getToken').and.returnValue(null);
      });

      it('should return false', () => {
        expect(service.isAuthenticated()).toBeFalsy();
      });
    });
  });
});
