import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import Produto from "../models/produto";
import { Cart, LocalStorageCart } from "./cartModel";

export default class CartController {
  constructor() {}

  public static getCart(): LocalStorageCart {
    const localInfo = localStorage.getItem("cart");
    if (localInfo != null)
      return JSON.parse(localInfo);
    else
      return this.initCart();
  }

  public static initCart(): LocalStorageCart{
    let newCart : LocalStorageCart = {products:[]};
    this.saveCartLocalStorage(newCart);
    return newCart;
  }

  public static saveCart(cart: Cart){
    let localCart: LocalStorageCart = {products: []};
    if(cart?.products?.length > 0){
      for(let item of cart.products){
        if(item && item?.produto?.id)
          localCart.products.push({produtoId: item.produto.id, quantidade: item.quantidade ?? 1})
      }
      localStorage.setItem("cart", JSON.stringify(localCart));
    } else
      this.initCart();
  }

  public static saveCartLocalStorage(cart: LocalStorageCart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  public static cleanCart(){
    return this.initCart();
  }

  public static addProductToCart(produto: Produto){
    let cart: LocalStorageCart = this.getCart();
    if(produto.id)
      cart.products?.push({produtoId: produto.id, quantidade: 1});
    this.saveCartLocalStorage(cart);
  }
}
