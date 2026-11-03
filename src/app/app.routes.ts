
import { Routes } from '@angular/router';
import { ListaAnimais } from './components/lista-animais/lista-animais';
import { LoginVoluntario } from './components/login-voluntario/login-voluntario';
import { CadastroAnimal } from './components/cadastro-animal/cadastro-animal';
import { voluntarioGuard } from './services/voluntario.guard';

export const routes: Routes = [
  { path: '', component: ListaAnimais },
  { path: 'login', component: LoginVoluntario },
  {
    path: 'cadastro-animal',
    component: CadastroAnimal,
    canActivate: [voluntarioGuard]
  },
  { path: '**', redirectTo: '' }
];
