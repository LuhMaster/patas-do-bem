
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

interface Patinha {
  id: number;
  x: number;
  y: number;
  rotacao: number;
  duracao: number;
}

@Component({
  selector: 'app-animacao-patinhas',
  standalone: true,
  templateUrl: './animacao-patinhas.html',
  styleUrl: './animacao-patinhas.css'
})
export class AnimacaoPatinhas implements OnInit, OnDestroy {
  patinhas: Patinha[] = [];

  private intervalo?: ReturnType<typeof setInterval>;
  private proximoId = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.criarPatinhas();

    this.intervalo = setInterval(() => {
      if (this.patinhas.length === 0) {
        this.criarPatinhas();
      }
    }, 500);
  }

  ngOnDestroy(): void {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  private criarPatinhas(): void {
    const novaPatinha: Patinha = {
      id: this.proximoId++,
      x: Math.random() * 85 + 5,
      y: Math.random() * 75 + 10,
      rotacao: 0,
      duracao: Math.random() * 4 + 6
    };

    this.patinhas = [...this.patinhas, novaPatinha];

    this.cdr.detectChanges();

    setTimeout(() => {
      this.patinhas = this.patinhas.filter(
        patinha => patinha.id !== novaPatinha.id
      );

      this.cdr.detectChanges();
    }, novaPatinha.duracao * 1000);
  }
}
