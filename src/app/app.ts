
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Cabecalho } from './components/cabecalho/cabecalho';
import { ListaAnimais } from './components/lista-animais/lista-animais';
import { AnimacaoPatinhas } from './components/animacao-patinhas/animacao-patinhas';

@Component({
  selector: 'app-root',
  standalone: true,
   imports: [RouterOutlet, Cabecalho, ListaAnimais, AnimacaoPatinhas],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(public router: Router) {}
}
