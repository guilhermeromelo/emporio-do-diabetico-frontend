import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {

  clientForm: FormGroup;
  //addressForm: FormGroup;
  termsAccepted:boolean = false;
  invalidPasswordError:boolean = false;

  constructor(private toastr: ToastrService, private service: AppService, private router: Router) {
    this.clientForm = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      sobrenome: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      cpf: new FormControl(null, [Validators.required]),
      telefone: new FormControl(null, [Validators.required]),
      senha: new FormControl(null, [Validators.required]),
      confirmarSenha: new FormControl(null, [Validators.required]),
    });

/*     this.addressForm = new FormGroup({
      rua: new FormControl(null, [Validators.required]),
      numero: new FormControl(null, [Validators.required]),
      bairro: new FormControl(null, [Validators.required]),
      cidade: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      nomeResponsavel: new FormControl(null, [Validators.required]),
      clienteId: new FormControl(null, [])
    }); */
  }

  async signUp(){
    if(this.validateForms()){
      let requestBody = JSON.parse(JSON.stringify(this.clientForm.value));
      requestBody.nome += ' ';
      requestBody.nome += requestBody.sobrenome;
      delete requestBody.confirmarSenha;
      delete requestBody.sobrenome;
      try{
        let response = await this.service.postRequest('/clientes', requestBody);
        this.toastr.success('Você foi cadastrado com sucesso!');
        this.router.navigateByUrl(`/`);
      } catch (err){
        this.toastr.error('Ocorreu um erro ao salvar o produto!');
      }
    }
  }

  validateForms(){
    if(this.clientForm.invalid /*|| this.addressForm.invalid*/){
      this.toastr.error("Preencha todos os campos obrigatórios!!!");
      this.clientForm.markAllAsTouched();
      //this.addressForm.markAllAsTouched();
      return false;
    } else if(this.clientForm.value.senha != this.clientForm.value.confirmarSenha){
      this.toastr.error("A senha e confirmação da senha devem ser iguais!");
      this.invalidPasswordError = true;
    } else if(this.termsAccepted == false){
      this.toastr.error("Você deve aceitar os termos de uso para se cadastrar!!!");
      return false;
    } else {
      return true;
    }
  }

}
