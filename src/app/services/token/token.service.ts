import { Injectable } from '@angular/core';
import {StorageService} from "../storage/storage.service";
import {jwtDecode, JwtPayload} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private tokenKey = 'access-token';

  constructor(private localStorageService: StorageService) { }

  storeToken(token: string) {
    this.localStorageService.setItem(this.tokenKey, token);
  }

  doesTokenExist(): boolean {
    return this.getToken() != null;
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.tokenKey);
  }

  removeToken() {
    this.localStorageService.removeItem(this.tokenKey);
  }

  getUsername(): string | null {
    try {
      const jwtPayload: JwtPayload = jwtDecode((this.getToken() ?? ''));
      return jwtPayload.sub ?? '';
    } catch (err) {
      console.error('Error occurred while decoding token');
      console.error(err);
      return null;
    }
  }
}
