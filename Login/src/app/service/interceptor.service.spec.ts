import { HttpHandler, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import { LoginServiceService } from './login-service.service';


describe('InterceptorService', () => {
  let httpMock: HttpTestingController
  let interceptor: InterceptorService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        LoginServiceService,
        {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    interceptor = TestBed.inject(InterceptorService);
  });

  it('testando interceptor', () => {
    const httpHand = {handle(req) {}} as HttpHandler;      // O {handle(req) {}} é o Mock do HttpHandler
    const httpReq = {clone: () => {}} as HttpRequest<any>; // O {clone: () => {}} é o Mock do HttpRequest
    
    interceptor.intercept(httpReq, httpHand);

    expect(httpReq.clone).toHaveBeenCalled();     // Tanto o HttpHandler quanto o HttpRequest precisaram 
    expect(httpHand.handle).toHaveBeenCalled();   // ser mockados pra serem testados
  });
});