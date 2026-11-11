
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao';

@Component({
  selector: 'app-cabecalho',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cabecalho.html',
  styleUrl: './cabecalho.css'
})
export class Cabecalho {

  menuAberto = false;

  constructor(
    public autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  alternarMenu(): void {
    this.menuAberto = !this.menuAberto;
  }

  fecharMenu(): void {
    this.menuAberto = false;
  }

  sair(): void {
    this.autenticacaoService.sair();
    window.location.reload();
  }
}
