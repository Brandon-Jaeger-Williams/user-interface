import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserModel} from "../../models/user-model";
import {ProcessedDocumentsComponent} from "../processed-documents/processed-documents.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  user!: UserModel;

  @ViewChild('processDocuments') processedDocuments!: ProcessedDocumentsComponent;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  onGetLatestProcessedDocuments() {
    this.processedDocuments.getLatestProcessedDocuments();
  }

}
