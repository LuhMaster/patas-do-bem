
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao';

@Component({
  selector: 'app-login-voluntario',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login-voluntario.html',
  styleUrl: './login-voluntario.css'
})
export class LoginVoluntario {
  email = '';
  senha = '';
  mensagem = '';

  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) { }

  entrar(formulario: NgForm): void {
    if (formulario.invalid) {
      this.mensagem = 'Preencha um e-mail válido e a senha.';
      return;
    }

    this.autenticacaoService.entrar();

    this.router.navigate(['/cadastro-animal']);
  }
}
