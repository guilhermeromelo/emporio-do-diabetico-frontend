import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import CartController from 'src/app/cartController/cartController';
import { Cart } from 'src/app/cartController/cartModel';
import { LoggedUser } from 'src/app/loginController/loggedUserModel';
import LoginController from 'src/app/loginController/loginController';
import Endereco from 'src/app/models/endereco';
import Pedido from 'src/app/models/pedido';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'checkout.component.html'
})
export class CheckoutComponent implements OnInit{
  cart: Cart = {totalPrice:0, products:[]};
  loggedUser: LoggedUser;
  addressForm: FormGroup = Object.create(null);
  paymentForm: FormGroup = Object.create(null);
  isOrderDetail: boolean;
  order: Pedido = {};

  constructor(private router:Router, private toastr: ToastrService, private service: AppService){
    this.initForms();
    this.loggedUser = <LoggedUser> LoginController.getLoggedUser();

    this.isOrderDetail = router.getCurrentNavigation()?.extras.state?.isOrderDetail ?? false;
    if(!this.isOrderDetail){
      let cart = router.getCurrentNavigation()?.extras.state?.cart;
      if(cart)
        this.cart = cart;
      else
        this.router.navigateByUrl('/carrinho');

    } else {
      console.log(router.getCurrentNavigation()?.extras.state)
      this.order = router.getCurrentNavigation()?.extras.state?.order;
      console.log(this.order)
      this.loadAddressInfo(this.order?.enderecoEntrega);
      this.loadOrderItens();
    }
  }

  ngOnInit(): void {
    console.log(this.cart)
  }

  async saveOrder(){
    if(this.addressForm.valid && this.paymentForm.valid){
      let addressResponse: Endereco = this.addressForm.value;
      addressResponse.clienteId = this.loggedUser.id;

      let itens:any[] = [];
      this.cart.products.map(prod =>{
        for(let i=0; i<(prod.quantidade ?? 1);i++){
          itens.push(prod.produto);
        }
      })

      let body = {
        "totalPrice": this.cart.totalPrice,
        "itens": itens,
        "clienteId": this.loggedUser.id,
        "enderecoEntrega": addressResponse,
      }

      let response:any = await this.service.postRequest('/pedidos', body);
      if(response && response?.id){
        this.toastr.success("Pedido Realizado com Sucesso");
        CartController.cleanCart();
        this.router.navigateByUrl('/pedidos')
      }
    } else {
      this.toastr.error("Preencha corretamente os campos necessários!");
      this.addressForm.markAllAsTouched();
      this.paymentForm.markAllAsTouched();
    }

  }

  initCartProducts(){
    let products = this.service.getRequest('/produtos');
  }

  initForms(){
    this.addressForm = new FormGroup({
      "rua": new FormControl(null, [Validators.required]),
      "numero": new FormControl(null, [Validators.required]),
      "bairro": new FormControl(null, [Validators.required]),
      "cidade": new FormControl(null, [Validators.required]),
      "estado": new FormControl(null, [Validators.required]),
      "nomeResponsavel": new FormControl(null, [Validators.required]),
    });

    this.paymentForm = new FormGroup({
      "cardNumber": new FormControl(null, [Validators.required]),
      "cardExpiration": new FormControl(null, [Validators.required]),
      "cvv": new FormControl(null, [Validators.required]),
      "ownerName": new FormControl(null, [Validators.required])
    });
  }

  loadAddressInfo(address?: Endereco){
    if(address){
      this.addressForm.patchValue({
        "rua": address.rua,
        "numero": address.numero,
        "bairro": address.bairro,
        "cidade": address.cidade,
        "estado": address.estado,
        "nomeResponsavel": address.nomeResponsavel,
      });

      this.addressForm.disable();
    }
  }

  loadOrderItens(){
    let newCart: Cart = { products: [], totalPrice: 0};
    this.order.itens?.map(item => {
      let produtExists = false;
      console.log(item)
      newCart.products.map(prod =>{
        if(prod.produto?.id == item.id){
          produtExists = true;
          prod.quantidade!++;
          prod.precoTotalProduto = prod.quantidade! * prod.produto?.preco!;
        }
      });

      if(!produtExists){
        newCart.products.push({
          produto: item,
          quantidade: 1,
          precoTotalProduto: item.preco
        });
      }
    });
    this.cart = newCart;
    this.updateCartTotalPrice();
  }

  updateCartTotalPrice(){
    let newTotal = 0;
    this.cart.products.map(prod =>{
      newTotal += prod.precoTotalProduto ?? 0;
    });
    this.cart.totalPrice = newTotal;
  }
}
