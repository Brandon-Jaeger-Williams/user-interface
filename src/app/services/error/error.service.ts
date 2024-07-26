import {Injectable} from '@angular/core';
import {NotificationService} from "../notification/notification.service";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
  ) {
  }

  handle(err: HttpErrorResponse) {
    switch (err.status) {
      case 401:
      case 403:
        this.authService.logout();
        break;
      default:
        this.notificationService.alert(err.error?.message ?? 'Something went wrong. Please try again later');
    }
  }
}
