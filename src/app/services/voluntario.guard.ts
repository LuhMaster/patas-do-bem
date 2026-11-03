import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacaoService } from './autenticacao';

export const voluntarioGuard: CanActivateFn = () => {
  const autenticacao = inject(AutenticacaoService);
  const router = inject(Router);

  if (autenticacao.estaLogado()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};