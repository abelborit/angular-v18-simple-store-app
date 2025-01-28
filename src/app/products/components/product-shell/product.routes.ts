import { Routes } from '@angular/router';

export const productRoutes: Routes = [
  {
    path: 'products',
    /* FORMA 1: exportación por defecto del componente y ya no sería necesario usar promesas */
    // loadComponent: () => import('../product-list/product-list.component'),

    /* FORMA 2: como promesa y ya no sería necesaria la exportación por defecto del componente */
    loadComponent: () =>
      import('../product-list/product-list.component').then(
        (module) => module.ProductListComponent
      ),
  },

  {
    path: '**',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
