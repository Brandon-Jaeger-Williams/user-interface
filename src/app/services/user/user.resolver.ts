import {inject} from '@angular/core';
import {ResolveFn} from "@angular/router";
import {UserModel} from "../../models/user-model";
import {UserService} from "./user.service";

export const userResolver: ResolveFn<UserModel> = (route, state) => {
  return inject(UserService).getUser();
}
