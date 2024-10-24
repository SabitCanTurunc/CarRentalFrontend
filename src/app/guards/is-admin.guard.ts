
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const isAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const toastrService = inject(ToastrService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    
    return true;
  } else {
    // router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    router.navigate(['/login'], { state: { returnUrl: state.url } });

    toastrService.error('Admin yetkisinine sahip değilsiniz', 'Uyarı !');

    return false;
  }
};
