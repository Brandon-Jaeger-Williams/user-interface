import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
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
}
