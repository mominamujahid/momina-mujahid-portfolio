import { bootstrapApplication } from '@angular/platform-browser';
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
