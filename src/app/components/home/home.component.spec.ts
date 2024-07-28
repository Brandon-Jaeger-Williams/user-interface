import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ActivatedRoute} from "@angular/router";
import {HeaderComponent} from "../core/header/header.component";
import {ProcessedDocumentsComponent} from "../processed-documents/processed-documents.component";
import {NotificationService} from "../../services/notification/notification.service";
import {AuthService} from "../../services/auth/auth.service";
import {DocumentService} from "../../services/document/document.service";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatMenuModule} from "@angular/material/menu";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const mockActivatedRoute = {
    snapshot: {
      data: {}
    }
  };

  const mockAuthService = {
    logout: () => {
    }
  };

  const mockDocumentService = {
    process: () => {
      return of();
    },
    getProcessed() {
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
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: NotificationService, useValue: mockNotificationService},
        {provide: AuthService, useValue: mockAuthService},
        {provide: DocumentService, useValue: mockDocumentService},
      ],
      imports: [
        MatMenuModule,
      ],
      declarations: [
        HomeComponent,
        HeaderComponent,
        ProcessedDocumentsComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when onGetLatestProcessedDocuments is called', () => {
    beforeEach(() => {
      spyOn(component.processedDocuments, 'getLatestProcessedDocuments');
      component.onGetLatestProcessedDocuments();
    });

    it('should have called getLatestProcessedDocuments', () => {
      expect(component.processedDocuments.getLatestProcessedDocuments).toHaveBeenCalled();
    });
  });
});
