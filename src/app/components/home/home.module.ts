import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from "./home.component";
import {HeaderComponent} from "../core/header/header.component";
import {ProcessedDocumentsComponent} from "../processed-documents/processed-documents.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProcessedDocumentsComponent,
  ],
  imports: [
    CommonModule,
    MatToolbar,
    MatIcon,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ]
})
export class HomeModule {
}
