
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaoAnimal } from './cartao-animal';
import { Animal } from '../../models/animal';

describe('CartaoAnimal', () => {
  let component: CartaoAnimal;
  let fixture: ComponentFixture<CartaoAnimal>;

  const animalTeste: Animal = {
    id: 1,
    nome: 'Rex',
    especie: 'Cachorro',
    localizacao: 'Praça Central',
    situacao: 'Perdido',
    dataRegistro: '2026-11-06',
    caracteristicas: 'Pelagem marrom',
    descricaoCaso: 'Animal desaparecido durante a tarde.',
    observacoes: '',
    foto: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartaoAnimal],
    }).compileComponents();

    fixture = TestBed.createComponent(CartaoAnimal);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('animal', animalTeste);

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
