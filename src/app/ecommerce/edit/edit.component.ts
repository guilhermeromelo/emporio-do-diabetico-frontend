import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { defaultImage } from 'src/app/app-constants';
import { AppService } from 'src/app/app.service';
import Produto from 'src/app/models/produto';
@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent {
  produto: Produto = {};
  form: FormGroup;
  imageError:string = "";
  imagem:string = "";

  constructor(private fb: FormBuilder, private service: AppService, private toastr: ToastrService, private router: Router){
    this.form = fb.group({
      nome:[this.produto.nome,[]],
      subtitulo:[this.produto.subtitulo,[]],
      categoria:[this.produto.categoria,[]],
      descricao:[this.produto.descricao,[]],
      preco:[this.produto.preco,[]],
      imagem:[this.produto.imagem,[]],
    });
  }


  ngOnInit(): void {
    this.initImage()
  }

  async salvar(){
    this.form.patchValue({ imagem: this.imagem});
    try{
      let result:any = await this.service.postRequest('/produtos',this.form.value);
      this.toastr.success('Produto Salvo com sucesso!');
      this.router.navigateByUrl(`/detalhes-produto/${result.id}`);
    } catch (err){
      this.toastr.error('Ocorreu um erro ao salvar o produto!');
    }
  }

  ArrayImagesString:any;
  fileChangeEvent(fileInput: any) {
    this.imageError = ""
    this.ArrayImagesString = [];

    if (fileInput.target.files) {
      // Size Filter Bytes
      const max_size = 21000000;

      let i: number = 1;
      for (i = 0; i < fileInput.target.files.length; i++) {
        if (fileInput.target.files[i].size > max_size) {
            this.imageError = 'Problema Encontrado! Há arquivo(s) com tamanho superior a 20Mb';
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = (rs: any) => {
                let imageTo64base = e.target.result;//.split("base64,")[1]
                this.ArrayImagesString.push(imageTo64base)
                this.imagem = imageTo64base;
            };
        };
        reader.readAsDataURL(fileInput.target.files[i]);
      };
    }
  }


  initImage(){
    this.imagem = defaultImage;
  }
}
