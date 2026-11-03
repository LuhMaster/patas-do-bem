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
  constructor(
    public autenticacaoService: AutenticacaoService,
    private router: Router
  ) { }

  sair(): void {
    this.autenticacaoService.sair();
    window.location.reload();
  }
}