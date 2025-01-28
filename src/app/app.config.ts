import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    /* Configura la detección de cambios basada en Zone.js con la opción de "event coalescing". Event Coalescing: Agrupa múltiples eventos en un solo ciclo de detección de cambios, lo que mejora el rendimiento al reducir el número de verificaciones de cambios */
    provideZoneChangeDetection({ eventCoalescing: true }), // si se está usando "zoneless" entonces hay que retirar lo que se está usando todavía del Zone.js para tener todos los beneficios del "zoneless" porque si no dará un error similar a -- NG0408: Invalid change detection configuration: provideZoneChangeDetection and provideExperimentalZonelessChangeDetection cannot be used together. --

    /* Proporciona las rutas para la aplicación. routes: Es un arreglo que define la navegación de la aplicación (equivalente a RouterModule.forRoot(routes) en configuraciones tradicionales) */
    provideRouter(routes),

    /* HttpClient se proporciona mediante la función auxiliar "provideHttpClient" que es una nueva funcionalidad introducida como parte de la modernización del manejo de solicitudes HTTP, permitiendo el uso de la API Fetch en lugar de depender de XMLHttpRequest (XHR). Entonces para usar fetch de forma predeterminada en lugar de XMLHttpRequest, se configura el "provideHttpClient" ya que acepta una lista de configuraciones de funciones opcionales para habilitar o configurar el comportamiento de diferentes aspectos del cliente. En este caso se usa "withFetch" y sirve para que el cliente use de forma predeterminada el fetch en lugar del XMLHttpRequest. */
    provideHttpClient(withFetch()),
  ],
};
