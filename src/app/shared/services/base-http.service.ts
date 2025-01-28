import {
  HttpClient, // Servicio de Angular para realizar solicitudes HTTP (GET, POST, PUT, DELETE, etc.).
  HttpErrorResponse, // Clase para manejar errores HTTP (como errores de red o respuestas 4xx/5xx).
  HttpHeaders, // Clase para configurar headers personalizados (como Content-Type o tokens de autenticación).
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  private readonly httpClient = inject(HttpClient);
  // private readonly baseUrl = environment.BASE_API_URL;

  /**
   * Headers predeterminados para todas las solicitudes HTTP.
   */
  /* Headers predeterminados: Agregado un getter para headers comunes (Content-Type, Accept), facilitando su configuración en un solo lugar. */
  private get defaultHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json', // Indica que el cuerpo de las solicitudes es JSON.
      Accept: 'application/json', // Indica que esperamos respuestas en formato JSON.
    });
  }

  /**
   * Realiza una solicitud HTTP GET.
   * @param baseUrl - La ruta base para realizar la solicitud.
   * @param endpoint - El endpoint relativo al cual realizar la solicitud.
   * @param options - Opciones adicionales como headers, parámetros, etc.
   * @returns Observable con la respuesta procesada o un error.
   */
  public getBaseHttp<T>(
    baseUrl: string,
    endpoint: string,
    options: object = {}
  ): Observable<T> {
    return this.httpClient
      .get<T>(`${baseUrl}/${endpoint}`, {
        headers: this.defaultHeaders,
        ...options,
      })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Realiza una solicitud HTTP POST.
   * @param baseUrl - La ruta base para realizar la solicitud.
   * @param endpoint - El endpoint relativo al cual realizar la solicitud.
   * @param body - El cuerpo de la solicitud.
   * @param options - Opciones adicionales como headers, parámetros, etc.
   * @returns Observable con la respuesta procesada o un error.
   */
  public postBaseHttp<T>(
    baseUrl: string,
    endpoint: string,
    body: object,
    options: object = {}
  ): Observable<T> {
    return this.httpClient
      .post<T>(`${baseUrl}/${endpoint}`, body, {
        headers: this.defaultHeaders,
        ...options,
      })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Realiza una solicitud HTTP PUT.
   * @param baseUrl - La ruta base para realizar la solicitud.
   * @param endpoint - El endpoint relativo al cual realizar la solicitud.
   * @param body - El cuerpo de la solicitud.
   * @param options - Opciones adicionales como headers, parámetros, etc.
   * @returns Observable con la respuesta procesada o un error.
   */
  public putBaseHttp<T>(
    baseUrl: string,
    endpoint: string,
    body: object,
    options: object = {}
  ): Observable<T> {
    return this.httpClient
      .put<T>(`${baseUrl}/${endpoint}`, body, {
        headers: this.defaultHeaders,
        ...options,
      })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Realiza una solicitud HTTP DELETE.
   * @param baseUrl - La ruta base para realizar la solicitud.
   * @param endpoint - El endpoint relativo al cual realizar la solicitud.
   * @param options - Opciones adicionales como headers, parámetros, etc.
   * @returns Observable con la respuesta procesada o un error.
   */
  public deleteBaseHttp<T>(
    baseUrl: string,
    endpoint: string,
    options: object = {}
  ): Observable<T> {
    return this.httpClient
      .delete<T>(`${baseUrl}/${endpoint}`, {
        headers: this.defaultHeaders,
        ...options,
      })
      .pipe(
        map((response) => response),
        catchError((error) => this.handleError(error))
      );
  }

  /**
   * Maneja errores de las solicitudes HTTP.
   * @param error - El error recibido de la solicitud.
   * @returns Observable que emite el error procesado.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';

    if (error.error instanceof ErrorEvent) {
      /* Error del lado del cliente. Si el error proviene del cliente (por ejemplo, problemas de red), se usa ErrorEvent.
       */
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      /* Error del lado del servidor. Si el error proviene del servidor (códigos 4xx o 5xx), se procesa el código de estado (status) y el mensaje (message). */
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage); // Log para depuración

    /* Se devuelve un throwError con un mensaje procesado. Devuelve un observable con el error para que los componentes que usen este servicio puedan manejarlo (por ejemplo, mostrar un mensaje de error al usuario). */
    return throwError(() => new Error(errorMessage));
  }
}
