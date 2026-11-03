import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  private readonly chaveSessao = 'patas-do-bem-voluntario';

  estaLogado = signal(
    localStorage.getItem(this.chaveSessao) === 'true'
  );

  entrar(): void {
    localStorage.setItem(this.chaveSessao, 'true');
    this.estaLogado.set(true);
  }

  sair(): void {
    localStorage.removeItem(this.chaveSessao);
    this.estaLogado.set(false);
  }
}