
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CartaoAnimal } from '../cartao-animal/cartao-animal';
import { Animal } from '../../models/animal';
import { AnimaisService } from '../../services/animais';

@Component({
  selector: 'app-lista-animais',
  standalone: true,
  imports: [FormsModule, CartaoAnimal],
  templateUrl: './lista-animais.html',
  styleUrl: './lista-animais.css'
})
export class ListaAnimais {
  busca = '';
  filtroAtual = 'Todos';
  escalaTexto = 1;

aumentarTexto() {
  this.escalaTexto = Math.min(1.5, this.escalaTexto + 0.1);
}

diminuirTexto() {
  this.escalaTexto = Math.max(0.8, this.escalaTexto - 0.1);
}

  constructor(private animaisService: AnimaisService) { }

  get animais(): Animal[] {
    return this.animaisService.listar();
  }

  filtrar(situacao: string) {
    this.filtroAtual = situacao;
  }

  get animaisFiltrados(): Animal[] {
    const termo = this.busca.toLowerCase().trim();

    return this.animais.filter((animal) => {
      const correspondeBusca =
        animal.nome.toLowerCase().includes(termo) ||
        animal.localizacao.toLowerCase().includes(termo);

      const correspondeSituacao =
        this.filtroAtual === 'Todos' ||
        animal.situacao === this.filtroAtual;

      return correspondeBusca && correspondeSituacao;
    });
  }
}
