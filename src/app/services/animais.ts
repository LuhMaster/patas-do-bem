
import { Injectable } from '@angular/core';
import { Animal } from '../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  private readonly chaveArmazenamento = 'patas-do-bem-animais';

  private animais: Animal[] = [
    {
      id: 1,
      nome: 'Bob',
      especie: 'Cachorro(a)',
      localizacao: 'Centro',
      situacao: 'Perdido',
      dataRegistro: '15/10/2026',
      caracteristicas: 'Porte médio, pelagem caramelo',
      descricaoCaso: 'Animal desaparecido na região central.',
      observacoes: ''
    },
    {
      id: 2,
      nome: 'Mel',
      especie: 'Gato(a)',
      localizacao: 'Jardim Europa',
      situacao: 'Encontrado',
      dataRegistro: '15/10/2026',
      caracteristicas: 'Porte médio, pelagem branca',
      descricaoCaso: 'Gata encontrada no bairro.',
      observacoes: ''
    },
    {
      id: 3,
      nome: 'Thor',
      especie: 'Cachorro(a)',
      localizacao: 'Vila Nova',
      situacao: 'Adoção',
      dataRegistro: '12/03/2026',
      caracteristicas: 'Porte pequeno, cara de malvado',
      descricaoCaso: 'Animal disponível para adoção.',
      observacoes: ''
    }
  ];

  private proximoId = 4;

  constructor() {
    this.carregarAnimais();
  }

  private carregarAnimais(): void {
    const dadosSalvos = localStorage.getItem(
      this.chaveArmazenamento
    );

    if (dadosSalvos) {
      try {
        this.animais = JSON.parse(dadosSalvos);

        this.proximoId =
          this.animais.length > 0
            ? Math.max(...this.animais.map(animal => animal.id)) + 1
            : 1;

      } catch (erro) {
        console.error('Erro ao carregar animais:', erro);
      }
    } else {
      this.salvarAnimais();
    }
  }

  private salvarAnimais(): void {
    try {
      localStorage.setItem(
        this.chaveArmazenamento,
        JSON.stringify(this.animais)
      );
    } catch (erro) {
      console.error('Erro ao salvar animais:', erro);
    }
  }

  listar(): Animal[] {
    return [...this.animais];
  }

  adicionar(dados: Omit<Animal, 'id'>): void {
    const novoAnimal: Animal = {
      ...dados,
      id: this.proximoId++
    };

    this.animais = [novoAnimal, ...this.animais];

    this.salvarAnimais();

    console.log('Animal cadastrado:', novoAnimal);
  }

  atualizar(animalAtualizado: Animal): void {
  this.animais = this.animais.map(animal =>
    animal.id === animalAtualizado.id
      ? { ...animalAtualizado }
      : animal
  );

  this.salvarAnimais();

  console.log('Animal atualizado:', animalAtualizado);
}

excluir(id: number): void {
  this.animais = this.animais.filter(
    animal => animal.id !== id
  );

  this.salvarAnimais();

  console.log('Animal excluído. ID:', id);
}
}
