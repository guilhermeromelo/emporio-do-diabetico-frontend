import Produto from "../models/produto";

export class LocalStorageCart {
  products: {produtoId: number, quantidade: number}[] = [];
}

export class Cart {
  totalPrice: number = 0;
  products: {produto: Produto, quantidade: number, precoTotalProduto: number}[] = [];
}
