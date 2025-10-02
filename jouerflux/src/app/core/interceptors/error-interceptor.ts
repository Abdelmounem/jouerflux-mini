import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';


export const errorInterceptor: HttpInterceptorFn = (req, next) => {
return next(req).pipe(); 
};


export function toUserMessage(err: unknown): string {
if (err instanceof HttpErrorResponse) {
if (err.status === 0) return 'Le serveur est injoignable.';
return `Erreur ${err.status}: ${err.error?.message ?? 'Requête invalide'}`;
}
return 'Une erreur inconnue est survenue.';
}