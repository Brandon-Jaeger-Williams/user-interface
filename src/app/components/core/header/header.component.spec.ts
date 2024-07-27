import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {AuthService} from "../../../services/auth/auth.service";
import {DocumentService} from "../../../services/document/document.service";
import {NotificationService} from "../../../services/notification/notification.service";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatMenuModule} from "@angular/material/menu";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let documentService: DocumentService;
  let notificationService: NotificationService;

  const mockAuthService = {
    logout: () => {
    }
  };

  const mockDocumentService = {
    process: () => {
      return of();
    }
  };

  const mockNotificationService = {
    info: (message: string) => {
      return message;
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [
        MatMenuModule
      ],
      providers: [
        {provide: NotificationService, useValue: mockNotificationService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: DocumentService, useValue: mockDocumentService},
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    notificationService = TestBed.inject(NotificationService);
    authService = TestBed.inject(AuthService);
    documentService = TestBed.inject(DocumentService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when onProcessDocuments is called', () => {
    beforeEach(() => {
      spyOn(notificationService, 'info');
      spyOn(documentService, 'process').and.returnValue(of());
      component.onProcessDocuments();
    });

    it('should have called notificationService.info', () => {
      expect(documentService.process).toHaveBeenCalled();
    });
  });

  describe('when onLogout is called', () => {
    beforeEach(() => {
      spyOn(authService, 'logout');
      component.onLogout();
    });

    it('should have called authService.logout', () => {
      expect(authService.logout).toHaveBeenCalled();
    });
  });
});
