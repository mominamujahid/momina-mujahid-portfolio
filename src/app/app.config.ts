import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';


=======

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

>>>>>>> 2c8a7784cb0f46b2d9354c9a12d751db40e8dccf
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()]
};
