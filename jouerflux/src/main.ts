import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app/app.routes';
import { App } from './app/app';
import { appReducers, appEffects } from './app/state';
import { errorInterceptor } from './app/core/interceptors/error-interceptor';
import { provideZonelessChangeDetection } from '@angular/core';


bootstrapApplication(App, {
providers: [
provideRouter(routes),
provideZonelessChangeDetection(),
provideHttpClient(withInterceptors([errorInterceptor])),
provideStore(appReducers),
provideEffects(appEffects),
provideStoreDevtools({ maxAge: 25 })
]
}).catch(err => console.error(err));