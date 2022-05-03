import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent implements OnInit{
  productArray: Produto[] = [];

  constructor(private _router: Router, private service: AppService){

  }

  ngOnInit(): void {
    this.loadProducts();
  }

  goToProductPage(produto: Produto){
    return `/detalhes-produto/${produto.id}`;
  }

  async loadProducts(){
    this.productArray = <Produto[]> await this.service.getRequest('/produtos');
  }

  image = defaultImage;

}
