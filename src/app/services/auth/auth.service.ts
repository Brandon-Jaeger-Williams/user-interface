import {Injectable} from '@angular/core';
import {LoginRequestModel} from "../../models/login-request-model";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AuthResponseModel} from "../../models/auth-response-model";
import {environment} from "../../../environments/environment";
import {TokenService} from "../token/token.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  login(data: LoginRequestModel): Observable<AuthResponseModel> {
    return this.http.post<AuthResponseModel>(`${environment.userService.url}/v1/auth/login`, data)
      .pipe(map(data => {
        this.tokenService.storeToken(data.accessToken);
        return data;
      }));
  }

  logout() {
    this.tokenService.removeToken();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.getToken() != null;
  }
}
