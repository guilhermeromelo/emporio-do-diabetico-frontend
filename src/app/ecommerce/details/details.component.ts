import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import CartController from 'src/app/cartController/cartController';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'details.component.html'
})
export class DetailsComponent implements OnInit{

  image:string = "";
  produto: Produto | null = null;
  productId: any;

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private service: AppService){
    this.productId = this.activatedRoute.snapshot.paramMap.get("id");

  }

  ngOnInit(): void {
    this.initImage();
    this.loadProductDetails(this.productId);
  }

  initImage(){
    this.image = defaultImage;
  }

  async loadProductDetails(productId: any){
    this.produto = <Produto> await this.service.getRequest(`/produtos/${productId}`);
    this.image = this.produto?.imagem ?? defaultImage;
  }

  addAndGoToCartPage(){
    if(this.produto != null)
      CartController.addProductToCart(this.produto);
    this.router.navigateByUrl('/carrinho');
  }
}
