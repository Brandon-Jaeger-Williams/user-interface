import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, map} from "rxjs";
import {environment} from "../../../environments/environment";
import {DocumentModel} from "../../models/document-model";
import {ResultPageModel} from "../../models/result-page-model";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private http: HttpClient,
  ) {
  }

  getProcessed(page: number, size: number): Observable<ResultPageModel<DocumentModel>> {
    return this.http.get<ResultPageModel<DocumentModel>>(`${environment.documentService.url}/v1/documents?page=${page}&size=${size}`);
  }

  process(): Observable<void> {
    return this.http.post<void>(`${environment.documentService.url}/v1/documents/process`, {});
  }

  download(data: DocumentModel): Observable<void> {
    const headers = { 'responseType': 'blob' as 'json'};
    return this.http.get<Blob>(`${environment.documentService.url}/v1/documents/${data.id}/download`, headers).pipe(map(blob => {
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = `${data.fileName}.${data.fileType}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
    }));
  }
}
