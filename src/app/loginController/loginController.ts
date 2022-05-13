import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import Produto from "../models/produto";
import { LoggedUser } from "./loggedUserModel";

export default class LoginController {
  constructor() {}

  public static getLoggedUser(): LoggedUser | null {
    const localInfo = localStorage.getItem("user");
    if (localInfo != null && localInfo != 'null')
      return JSON.parse(localInfo);
    else
      return null;
  }

  public static saveLoggedUser(loggedUser: LoggedUser){
    localStorage.setItem("user", JSON.stringify(loggedUser));
  }

  public static logout(){
    localStorage.setItem("user", 'null');
  }

  public static isLogged(){
    let user = LoginController.getLoggedUser();
    return user ? true : false;
  }
}
