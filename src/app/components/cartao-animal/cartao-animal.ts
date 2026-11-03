
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Animal } from '../../models/animal';
import { AnimaisService } from '../../services/animais';
import { AutenticacaoService } from '../../services/autenticacao';

@Component({
  selector: 'app-cartao-animal',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './cartao-animal.html',
  styleUrl: './cartao-animal.css'
})
export class CartaoAnimal {
  @Input({ required: true }) animal!: Animal;

  mostrarDetalhes = false;
  editando = false;
  animalEditado!: Animal;

  constructor(
    private animaisService: AnimaisService,
    public autenticacaoService: AutenticacaoService
  ) { }

  get classeSituacao(): string {
    const situacao = this.animal.situacao.toLowerCase().trim();

    switch (situacao) {
      case 'perdido':
        return 'etiqueta-perdido';
      case 'encontrado':
        return 'etiqueta-encontrado';
      case 'adoção':
        return 'etiqueta-adocao';
      default:
        return 'etiqueta-padrao';
    }
  }

  alternarDetalhes(): void {
    this.mostrarDetalhes = !this.mostrarDetalhes;
  }

  iniciarEdicao(): void {
    this.animalEditado = { ...this.animal };
    this.editando = true;
  }

  cancelarEdicao(): void {
    this.editando = false;
  }

  salvarEdicao(): void {
    if (
      !this.animalEditado.nome.trim() ||
      !this.animalEditado.especie ||
      !this.animalEditado.situacao ||
      !this.animalEditado.localizacao.trim()
    ) {
      alert('Preencha nome, espécie, situação e localização.');
      return;
    }

    this.animaisService.atualizar(this.animalEditado);
    this.editando = false;
    this.mostrarDetalhes = false;
  }

  excluirAnimal(): void {
    const confirmar = confirm(
      `Tem certeza que deseja excluir o cadastro de ${this.animal.nome}?`
    );

    if (!confirmar) {
      return;
    }

    this.animaisService.excluir(this.animal.id);
  }
}
