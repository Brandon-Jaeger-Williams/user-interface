import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProcessedDocumentsComponent} from './processed-documents.component';
import {of} from "rxjs";
import {DocumentService} from "../../services/document/document.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('ProcessedDocumentsComponent', () => {
  let component: ProcessedDocumentsComponent;
  let fixture: ComponentFixture<ProcessedDocumentsComponent>;
  let documentService: DocumentService;

  const mockDocumentService = {
    getProcessed: () => {
      return of({});
    },
    download: () => {
      return of();
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessedDocumentsComponent],
      providers: [
        {provide: DocumentService, useValue: mockDocumentService},
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents();

    documentService = TestBed.inject(DocumentService);
    fixture = TestBed.createComponent(ProcessedDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when onPageChange is called', () => {
    beforeEach(() => {
      spyOn(documentService, 'getProcessed').and.returnValue(of({}));
      component.onPageChange({pageSize: 10, pageIndex: 0, length: 0});
    });

    it('should have called documentService.getProcessed', () => {
      expect(documentService.getProcessed).toHaveBeenCalledWith(0, 10);
    });
  });

  describe('when getLatestProcessedDocuments is called', () => {
    beforeEach(() => {
      spyOn(documentService, 'getProcessed').and.returnValue(of({}));
      component.page = {
        ...component.page,
        pageable: {
          pageNumber: 0,
          pageSize: 20,
        }
      };
      component.getLatestProcessedDocuments();
    });

    it('should have called documentService.getProcessed', () => {
      expect(documentService.getProcessed).toHaveBeenCalledWith(0, 20);
    });
  });

  describe('when onDownload is called', () => {
    beforeEach(() => {
      spyOn(documentService, 'download').and.returnValue(of());
      component.onDownload({
        key: 'test',
        fileType: 'csv',
        fileName: 'test',
      });
    });

    it('should have called documentService.download', () => {
      expect(documentService.download).toHaveBeenCalledWith({
        key: 'test',
        fileType: 'csv',
        fileName: 'test',
      });
    });
  });
});
