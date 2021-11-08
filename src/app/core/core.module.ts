import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './interceptors/headers.interceptor';
// import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  exports: [
    // HttpClient
    // SharedModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor,  multi: true }
  ]
})
export class CoreModule { }
