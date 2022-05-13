import Produto from "../models/produto";

export class LocalStorageCart {
  products: {produtoId: number, quantidade: number}[] = [];
}

export class Cart {
  totalPrice: number = 0;
  products: CartItem[] = [];
}

export class CartItem {
  produto?: Produto;
  quantidade?: number;
  precoTotalProduto?: number;
}
