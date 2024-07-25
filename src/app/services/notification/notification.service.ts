import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {
  }

  alert(message: string) {
    this.showSnackBar(message, 'alert-snackbar');
  }

  info(message: string) {
    this.showSnackBar(message, 'info-snackbar');
  }

  private showSnackBar(message: string, cssClass?: string) {
    this.snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: cssClass ? [cssClass] : undefined,
    });
  }
}
