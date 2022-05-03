import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import CartController from 'src/app/cartController/cartController';
import { Cart, LocalStorageCart } from 'src/app/cartController/cartModel';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit{
  cart: Cart = {totalPrice:0, products:[]};
  produtosFromAPI: Produto[] = [];

  constructor(private appService: AppService, private toastr: ToastrService){

  }

  ngOnInit(): void {
    this.buildCartFromLocalStorageCart();
  }


  async buildCartFromLocalStorageCart(){
    let localCart = CartController.getCart();
    await this.getProductsFromAPI();
    this.cart = this.parseLocalCartToCart(localCart);
    console.log(this.cart)
  }

  async getProductsFromAPI(){
    this.produtosFromAPI = <Produto[]> await this.appService.getRequest('/produtos');
    console.log(this.produtosFromAPI)
  }

  parseLocalCartToCart(localCart: LocalStorageCart){
    console.log(localCart)
    let newCart: Cart = {products:[], totalPrice:0};
    for(let item of localCart.products){
      let produto: Produto | null | undefined = null;
      produto = this.produtosFromAPI.find(element => element.id == item.produtoId);

      if(produto)
        newCart.products.push({produto: produto, quantidade: item.quantidade ?? 1,
          precoTotalProduto: produto.preco ? (produto.preco * (item.quantidade ?? 1)): 0})
      else
        this.toastr.error("Um erro inesperado Ocorreu! Recarregue a página e o erro persista, limpe o carrinho!");
    }
    return newCart;
  }

  goToCheckoutPage(){
    return '/finalizar-compra';
  }

  image = defaultImage;
}
