import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from 'rxjs/operators'

import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const baseURL = environment.base_url;
declare const gapi : any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    this.googleInit();
  }

  googleInit() {

    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '370376360672-m6i27pjsqe1hk9pogkpj6ihtbhihut9j.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve();
      });
    });    
  }

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${baseURL}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any ) => {
        localStorage.setItem('token', resp.token);
      }),
      map( resp => true),
      catchError(error => of(false))
    );
  }

  crearUsuario(formData: RegisterForm) {
    return this.http.post(`${baseURL}/usuarios`, formData)
    .pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  login(formData: LoginForm) {
    return this.http.post(`${baseURL}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  loginGoogle(token: string) {
    return this.http.post(`${baseURL}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      );
  }

  logout() {
    localStorage.removeItem('token');

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( () => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'));
    });
  }
}
