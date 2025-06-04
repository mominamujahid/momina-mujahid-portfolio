import { bootstrapApplication } from '@angular/platform-browser';
<<<<<<< HEAD
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Use `withFetch` for `fetch` APIs
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    [provideHttpClient()] ,
    provideHttpClient(withFetch()), provideAnimationsAsync(), // Enable `fetch` API support
  ],
}).catch((err) => console.error(err));
=======
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
>>>>>>> 2c8a7784cb0f46b2d9354c9a12d751db40e8dccf
