import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthenticationInterceptorService } from './core/interceptors/authentication-interceptor.service';
import { HttpErrorInterceptor } from './core/interceptors/http-error-interceptor';
import { MessagingService } from './core/service/messaging.service';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localePt);
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forChild([
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ]),
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    MessagingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
