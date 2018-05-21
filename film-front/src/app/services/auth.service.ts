import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppConfig } from '../config/app.config';
import { environment } from '../../environments/environment';


export const JWT_TOKEN = 'jwt_token';

@Injectable()
export class AuthService {

    token: any;

    constructor(
        protected http: HttpClient,
        protected snackBar: MatSnackBar) {
    }

    login(username: string, password: string) {
        const body =
            `username=${encodeURIComponent(username)}` +
            `&password=${encodeURIComponent(password)}&client_id=${encodeURIComponent(AppConfig.api.clientId)}` +
            `&grant_type=${encodeURIComponent('password')}&scope=${encodeURIComponent(AppConfig.api.scope)}` ;

        const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
            .append('Authorization', 'Basic ' + btoa(AppConfig.api.clientId + ':' + AppConfig.api.secret));

        return this.http.post<any>(
            environment.authUrl,
            body,
            { headers: headers }
        ).pipe(
            tap((token: any) => {
            localStorage.setItem(JWT_TOKEN, token.access_token);
            })
        );
    }

    logout() {
        localStorage.removeItem(JWT_TOKEN);
    }

    getToken() {
        return localStorage.getItem(JWT_TOKEN);
    }

    isAuthenticated(): boolean  {
        const token: any = localStorage.getItem(JWT_TOKEN);

        if (!token) {
            return false;
        }
        // FIXME check expiration
        return true;
    }

}
