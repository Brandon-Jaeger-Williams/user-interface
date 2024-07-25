import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {TokenService} from "../token/token.service";
import {UserModel} from "../../models/user-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) {
  }

  getUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.userService.url}/v1/users/${this.tokenService.getUsername()}`);
  }
}
