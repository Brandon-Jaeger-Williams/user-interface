import {TestBed} from '@angular/core/testing';

import {ErrorService} from './error.service';
import {AuthService} from "../auth/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../notification/notification.service";

describe('ErrorService', () => {
  let service: ErrorService;
  let authService: AuthService;
  let notificationService: NotificationService;

  const mockAuthService = {
    logout: () => {}
  };

  const mockNotificationService = {
    alert: () => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AuthService, useValue: mockAuthService},
        {provide: NotificationService, useValue: mockNotificationService}
      ]
    });
    service = TestBed.inject(ErrorService);
    authService = TestBed.inject(AuthService);
    notificationService = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when handle is called', () => {
    describe('and error is 401', () => {
      beforeEach(() => {
        spyOn(authService, 'logout');
        service.handle(new HttpErrorResponse({
          status: 401
        }));
      });

      it('should call authService.logout()', () => {
        expect(authService.logout).toHaveBeenCalled();
      });
    });

    describe('and error is 403', () => {
      beforeEach(() => {
        spyOn(authService, 'logout');
        service.handle(new HttpErrorResponse({
          status: 403
        }));
      });

      it('should call authService.logout()', () => {
        expect(authService.logout).toHaveBeenCalled();
      });
    });
  });

  describe('when error is 500', () => {
    describe('and error is 500 error message', () => {
      beforeEach(() => {
        spyOn(notificationService, 'alert');
        service.handle(new HttpErrorResponse({
          status: 500,
          error: {
            message: '500 error message'
          }
        }));
      });

      it('should call notificationService.alert()', () => {
        expect(notificationService.alert).toHaveBeenCalledWith('500 error message');
      });
    });

    describe('and error is null', () => {
      beforeEach(() => {
        spyOn(notificationService, 'alert');
        service.handle(new HttpErrorResponse({
          status: 500,
        }));
      });

      it('should call notificationService.alert()', () => {
        expect(notificationService.alert).toHaveBeenCalledWith('Something went wrong. Please try again later');
      });
    });
  });
});
