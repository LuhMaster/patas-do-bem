
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AnimaisService } from '../../services/animais';
import { Router } from '@angular/router';

interface DadosAnimal {
  nome: string;
  especie: string;
  situacao: string;
  localizacao: string;
  dataRegistro: string;
  caracteristicas: string;
  descricaoCaso: string;
  foto?: string;
}

@Component({
  selector: 'app-cadastro-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro-animal.html',
  styleUrl: './cadastro-animal.css'
})
export class CadastroAnimal {
  animal: DadosAnimal = this.novoAnimal();
  constructor(
    private animaisService: AnimaisService,
    private router: Router
  ) { }

  voltarParaInicio(): void {
    this.router.navigate(['/']);
  }
  selecionarFoto(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const arquivo = input.files?.[0];

    if (!arquivo) {
      this.animal.foto = '';
      return;
    }

    if (!arquivo.type.startsWith('image/')) {
      this.mensagem = 'Selecione um arquivo de imagem válido.';
      input.value = '';
      return;
    }

    if (arquivo.size > 2 * 1024 * 1024) {
      this.mensagem = 'A foto deve ter no máximo 2 MB.';
      input.value = '';
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      this.animal.foto = leitor.result as string;
      this.mensagem = '';
    };

    leitor.onerror = () => {
      this.mensagem = 'Não foi possível carregar a foto.';
    };

    leitor.readAsDataURL(arquivo);
  }

  mensagem = '';

  private dataHoje(): string {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');

    return `${ano}-${mes}-${dia}`;
  }

  private novoAnimal(): DadosAnimal {
    return {
      nome: '',
      especie: '',
      situacao: '',
      localizacao: '',
      dataRegistro: this.dataHoje(),
      caracteristicas: '',
      descricaoCaso: '',
      foto: ''
    };
  }

  cadastrarAnimal(formulario: NgForm): void {
    if (formulario.invalid) {
      formulario.control.markAllAsTouched();
      this.mensagem = 'Preencha todos os campos obrigatórios.';
      return;

    }

    const novoCadastro = {
      ...this.animal,
      dataRegistro: this.animal.dataRegistro
        .split('-')
        .reverse()
        .join('/'),
      observacoes: ''

    };

    this.animaisService.adicionar(novoCadastro);

    this.mensagem =
      'Animal cadastrado com sucesso! Ele já foi adicionado à lista da aplicação.';

    this.animal = this.novoAnimal();
    formulario.resetForm(this.animal);
  }

  limparFormulario(formulario: NgForm): void {
    this.animal = this.novoAnimal();
    formulario.resetForm(this.animal);
    this.mensagem = '';
  }
}
