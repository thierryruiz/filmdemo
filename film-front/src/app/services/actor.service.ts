import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Actor } from '../models/actor.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppConfig } from '../config/app.config';
import { ModelService } from './model.service';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { Film } from '../models/film.model';
import { ModelHelper } from '../shared/model.helper';

@Injectable()
export class ActorService extends ModelService<Actor> {

    constructor(
        protected authService: AuthService,
        protected http: HttpClient,
        protected modelHelper: ModelHelper,
        protected snackBar: MatSnackBar) {
        super(authService, http, snackBar);
    }

    getModelName(): string {
        return AppConfig.api.actor.name;
    }

    modelFromJSON(json: any): Actor {
        return this.modelHelper.createActorFromJSON(json);
    }


    getFilms(actor: Actor): Observable<Film[]> {
        return this.http.get(actor.links[AppConfig.api.film.collectionName]['href'])
            .pipe(
                map(res => {
                    return res['_embedded'][AppConfig.api.film.collectionName].map(json => {
                        return this.modelHelper.createFilmFromJSON(json);
                    });
                },
                    catchError(this.handleError('getFilms'))
                )
            );
    }

}
