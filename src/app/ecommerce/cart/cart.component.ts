import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/app.service';
import CartController from 'src/app/cartController/cartController';
import { Cart, CartItem, LocalStorageCart } from 'src/app/cartController/cartModel';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit{
  cart: Cart = {totalPrice:0, products:[]};
  produtosFromAPI: Produto[] = [];

  constructor(private appService: AppService, private toastr: ToastrService, private navi: Router){

  }

  async ngOnInit(): Promise<void> {
    await this.buildCartFromLocalStorageCart();
    this.updateCartTotalPrice();
  }

  async buildCartFromLocalStorageCart(){
    let localCart = CartController.getCart();
    await this.getProductsFromAPI();
    this.cart = this.parseLocalCartToCart(localCart);
    console.log(this.cart)
  }

  async getProductsFromAPI(){
    this.produtosFromAPI = <Produto[]> await this.appService.getRequest('/produtos');
    this.produtosFromAPI.map(produto => {
      produto.preco = Number.parseFloat(produto.preco?.toString() ?? '0');
    });
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

  onQtChange(event:any, i: any){
    this.updateQt(event,i);
    this.updateTotalItemPrice(this.cart.products[i]);
    this.updateCartTotalPrice();
    CartController.saveCart(this.cart);
    console.log("comprar", this.cart);
  }

  updateQt(event:any,i:any){
    try{
      let newValue:string = event.target.value == '' ? 1 : event.target.value;
      let qt = Number.parseInt(newValue);
      this.cart.products[i].quantidade = qt > 0 ? qt : 1;
    } catch(e){
      this.cart.products[i].quantidade = 1;
    }
  }

  updateTotalItemPrice(item: CartItem){
    item.precoTotalProduto = item.produto?.preco ? (item.produto.preco * (item.quantidade ?? 1)): 0
  }

  updateCartTotalPrice(){
    let newTotal = 0;
    this.cart.products.map(prod =>{
      newTotal += prod.precoTotalProduto ?? 0;
    });
    this.cart.totalPrice = newTotal;
  }

  removeItem(i:any){
    this.cart.products.splice(i,1)
    this.updateCartTotalPrice();
    CartController.saveCart(this.cart);
    console.log("comprar", this.cart);
  }

  goToCheckoutPage(){
    if(this.cart.products.length>0)
      this.navi.navigateByUrl('/finalizar-compra',{state: {cart: this.cart}})
    else
      this.toastr.error('Não há itens no carrinho!')
  }
}
