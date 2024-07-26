import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthService} from "../../services/auth/auth.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {of} from "rxjs";
import {Router} from "@angular/router";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  const mockAuthService = {
    login: () => {
      return of({});
    }
  };

  const mockRouter = {
    navigate: () => {
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        {provide: Router, useValue: mockRouter},
        {provide: AuthService, useValue: mockAuthService},
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when onLogin is called', () => {
    beforeEach(() => {
      spyOn(authService, 'login').and.returnValue(of({accessToken: '123'}));
      spyOn(router, 'navigate');
      component.form.get('username')?.setValue('User1');
      component.form.get('password')?.setValue('Password123');
      component.onLogin();
    });

    it('should have called documentService.getProcessed', () => {
      expect(router.navigate).toHaveBeenCalledWith(['/home']);
      expect(authService.login).toHaveBeenCalledWith({
        username: 'User1',
        password: 'Password123',
      });
    });
  });

  describe('when isValid is called', () => {
    describe('and form is valid', () => {
      beforeEach(() => {
        component.form.get('username')?.setValue('User1');
        component.form.get('password')?.setValue('Password123');
      });

      it('should return true', () => {
        expect(component.isValid).toBeTruthy();
      });
    });

    describe('and form is not valid', () => {
      beforeEach(() => {
        component.form.get('username')?.setValue(null);
        component.form.get('password')?.setValue('Password123');
      });

      it('should return false', () => {
        expect(component.isValid).toBeFalsy();
      });
    });
  });
});
