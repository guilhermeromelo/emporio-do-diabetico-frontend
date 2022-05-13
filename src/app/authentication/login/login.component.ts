import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import LoginController from 'src/app/loginController/loginController';
import Cliente from 'src/app/models/cliente';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  loginForm:FormGroup;
  clienteNotFound = false;

  constructor(private router: Router, private service: AppService) {
    this.loginForm = new FormGroup({
      "email": new FormControl(null,[]),
      "senha": new FormControl(null,[])
    });
  }

  async login(){
    try{
      this.clienteNotFound = false;
      let response: Cliente = <Cliente> await this.service.postRequest('/clientes/login', this.loginForm.value)
      console.log({id: response.id, name: response.nome});
      LoginController.saveLoggedUser({id: response.id, name: response.nome});
      this.router.navigateByUrl('/');
    } catch (error) {
      this.clienteNotFound = true;
    }
  }
}
/*
{
  "login": "guilhermeromelo@gmail.com",
  "senha": "1234256"
}
*/
