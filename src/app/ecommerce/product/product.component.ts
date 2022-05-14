import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'product.component.html'
})
export class ProductComponent implements OnInit{
  productArray: Produto[] = [];
  searchTerm: string | null= "";

  constructor(private _router: Router, private service: AppService, private activatedRoute: ActivatedRoute){
    this.searchTerm = this.activatedRoute.snapshot.paramMap.get("pesquisa");
  }

  async ngOnInit(): Promise<void> {
    await this.loadProducts();
    if(this.searchTerm && this.searchTerm != ""){
      console.log("filtrar ", this.searchTerm)
      this.productArray = this.productArray.filter(prod => { return prod.nome?.includes(this.searchTerm!)})
    }
  }

  goToProductPage(produto: Produto){
    return `/detalhes-produto/${produto.id}`;
  }

  async loadProducts(){
    this.productArray = <Produto[]> await this.service.getRequest('/produtos');
  }

  image = defaultImage;

}
