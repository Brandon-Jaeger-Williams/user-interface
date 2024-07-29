import {Component, OnInit} from '@angular/core';
import {DocumentService} from "../../services/document/document.service";
import {ResultPageModel} from "../../models/result-page-model";
import {DocumentModel} from "../../models/document-model";
import {PageEvent} from "@angular/material/paginator";
import {NotificationService} from "../../services/notification/notification.service";

@Component({
  selector: 'app-processed-documents',
  templateUrl: './processed-documents.component.html',
  styleUrl: './processed-documents.component.scss'
})
export class ProcessedDocumentsComponent implements OnInit {
  page?: ResultPageModel<DocumentModel>;
  displayedColumns: string[] = ['fileName', 'fileType', 'createdAt', 'download'];

  constructor(
    private documentService: DocumentService,
    private notificationService: NotificationService,
  ) {
    this.setPage(0, 5);
  }

  ngOnInit(): void {
    this.getProcessed();
  }

  getLatestProcessedDocuments() {
    this.setPage(0, this.page?.pageable?.pageSize!);
    this.getProcessed();
  }

  onPageChange(page: PageEvent) {
    this.setPage(page.pageIndex, page.pageSize);
    this.getProcessed();
  }

  onDownload(data: DocumentModel) {
    this.documentService.download(data)
      .subscribe(_ => this.notificationService.info('Download successful'));
  }

  private getProcessed() {
    this.documentService
      .getProcessed(this.page?.pageable?.pageNumber!, this.page?.pageable?.pageSize!)
      .subscribe(page => this.page = page);
  }

  private setPage(page: number, size: number) {
    this.page = {
      ...this.page,
      pageable: {
        pageNumber: page,
        pageSize: size,
      }
    };
  }
}
