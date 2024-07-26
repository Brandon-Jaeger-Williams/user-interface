import {Component} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  onLogin() {
    this.authService.login(this.form.value)
      .subscribe(_ => {
        this.router.navigate(['/home']);
      });
  }

  get isValid() {
    return this.form?.valid;
  }
}
