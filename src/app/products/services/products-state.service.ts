import { inject, Injectable } from '@angular/core';
import { signalSlice } from 'ngxtension/signal-slice';
import { ProductInterface } from '../../shared/interfaces/product.interface';
import { ProductsService } from './products.service';
import { map, startWith, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface ProductsState {
  products: ProductInterface[];
  status: 'loading' | 'success' | 'error';
  page: number;
}

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ProductsStateService {
  private productsService = inject(ProductsService);

  private initialState: ProductsState = {
    products: [],

    /* El uso de "as const" en TypeScript tiene un propósito muy específico: convertir una expresión en un tipo de solo lectura y evitar que sus valores sean reasignados o inferidos de manera genérica.
      - Sin "as const" TypeScript infiere que status es un string genérico (string).
      - Con "as const" TypeScript infiere que status es específicamente el literal 'loading' y no puede cambiar a otro string arbitrario. */
    /* ¿Cuándo usar as const?
      - Cuando se quiere que un valor sea tratado como un literal inmutable en lugar de un tipo más genérico.
      - Cuando se definen objetos, arreglos o estados en los que los valores no deberían cambiar.
      - Cuando se trabaja con valores de configuración o constantes que no deberían modificarse accidentalmente.
    */
    status: 'loading' as const, // Garantiza que solo puede ser uno de los valores permitidos en "status" y hace que TypeScript trate un valor como inmutable y con tipado estricto.

    page: 1,
  };

  public changePage$ = new Subject<number>();

  public loadProducts$ = this.changePage$.pipe(
    startWith(1),

    switchMap((page) => this.productsService.getAllProducts(page)),

    /* aquí vamos a mapear la respuesta de este observable porque, si bien no nos estamos suscribiendo en ningún momento, signalSlice necesita que cualquier cosa que agreguemos aquí devuelva un nuevo estado, por eso haremos uso de los pipes y del map */
    map((products: ProductInterface[]) => ({
      products,
      status: 'success' as const,
    })),
  );

  /* signalSlice está inspirada vagamente en la API createSlice de Redux Toolkit. La idea general es que permite crear de forma declarativa una "porción" o "slice" de estado y este estado estará disponible como una señal de solo lectura. */
  state = signalSlice({
    initialState: this.initialState,

    /* Una forma de actualizar el estado es mediante el uso de sources. Estos están pensados ​​para ser utilizados para "fuentes automáticas" o "auto sources", es decir, flujos observables u "observable" que se emitirán automáticamente como un http.get(). Aunque también funcionará con un Subject, se recomienda que se utilice un actionSource para estas actualizaciones de estado de estilo imperativo. */
    sources: [
      this.changePage$.pipe(
        map((page) => ({
          status: 'loading' as const,
          page,
        })),
      ),

      this.loadProducts$,
    ],
  });
}
