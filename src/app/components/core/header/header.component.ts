import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Output() processDocumentEvent = new EventEmitter();

  constructor(
    private authService: AuthService,
    private documentService: DocumentService,
    private notificationService: NotificationService,
  ) {
  }

  onProcessDocuments() {
    this.documentService
      .process()
      .subscribe(_ => {
        this.notificationService.info('Processed successfully!');
        setTimeout(() => {
          this.processDocumentEvent.emit();
        }, 500);
      });
  }

  onLogout() {
    this.authService.logout();
  }
}
