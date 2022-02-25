import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: 'edit.component.html'
})
export class EditComponent {

  formArray: FormGroup[] = [];
  especificacoesMock = [
    {
      titulo: "Cor",
      descricao: "Marrom",
    },
    {
      titulo: "Material",
      descricao: "Couro",
    },
    {
      titulo: "Dimensões",
      descricao: "Altura: 81 centimetroslargura: 46 centimetrosprofundidade: 45 centimetrospeso máximo recomendado: 90 quilos.",
    },
    {
      titulo: "Garantia",
      descricao: "12 meses",
    },
  ]

  ngOnInit(): void {
    this.especificacoesMock.forEach(element => {
      this.insertNewEspecificacaoForm(element);
    });
  }

  insertNewEspecificacaoForm(especificacao: { titulo?: string, descricao?: string} | null) {
    this.formArray.push(new FormGroup({
      "titulo": new FormControl(especificacao?.titulo, [Validators.required]),
      "descricao": new FormControl(especificacao?.descricao, [Validators.required])
    }));
  }

}
