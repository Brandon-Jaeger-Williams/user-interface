import {Component, Input} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {UserModel} from "../../../models/user-model";
import {DocumentService} from "../../../services/document/document.service";
import {NotificationService} from "../../../services/notification/notification.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() user?: UserModel;

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private notificationService: NotificationService,
  ) {
  }

  onProcessDocuments() {
    this.documentService
      .process()
      .subscribe(_ => this.notificationService.info('Processed successfully!'));
  }

  onLogout() {
    this.authService.logout();
  }
}
