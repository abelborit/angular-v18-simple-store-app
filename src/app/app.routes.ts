import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    /* FORMA 1: exportación por defecto del componente y ya no sería necesario usar promesas */
    // loadComponent: () => import('./products/components/product-shell/product.routes'),

    /* FORMA 2: como promesa y ya no sería necesaria la exportación por defecto del componente */
    loadChildren: () =>
      import('./products/components/product-shell/product.routes').then(
        (module) => module.productRoutes
      ),
  },
];
