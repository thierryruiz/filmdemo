import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Film } from '../models/film.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppConfig } from '../config/app.config';
import { ModelService } from './model.service';
import { environment } from '../../environments/environment';
import { ModelHelper } from '../shared/model.helper';
import { Actor } from '../models/actor.model';
import { Director } from '../models/director.model';
import { AuthService } from './auth.service';

const _headers = new HttpHeaders({ 'Content-Type': 'application/json' }) ;

@Injectable()
export class FilmService extends ModelService<Film> {

    constructor(
        protected authService: AuthService,
        protected http: HttpClient,
        protected modelHelper: ModelHelper,
        protected snackBar: MatSnackBar) {
        super(authService, http, snackBar);
    }

    getModelName(): string {
        return AppConfig.api.film.name;
    }

    modelFromJSON(json: any): Film {
        return this.modelHelper.createFilmFromJSON(json) ;
    }

    getActors( film: Film ): Observable< Actor[] > {
        return this.http.get(film.links[AppConfig.api.actor.collectionName]['href'])
            .pipe(
                map(res => {
                    return res['_embedded'][AppConfig.api.actor.collectionName].map( json => {
                        return this.modelHelper.createActorFromJSON(json);
                    });
                },
                catchError( this.handleError('getActors'))
            )
        );
    }

    getDirectors(film: Film): Observable<Director[]> {
        return this.http.get(film.links[AppConfig.api.director.collectionName]['href'])
            .pipe(
                map(res => {
                    return res['_embedded'][AppConfig.api.director.collectionName].map(json => {
                        return this.modelHelper.createDirectorFromJSON(json);
                    });
                },
                catchError(this.handleError('getDirectors'))
            )
        );
    }

    removeActor(film: Film, actorId: string ): Observable<any> {
        return this.removeFromCollection('' + film.id, AppConfig.api.actor.collectionName, actorId );
    }

    removeDirector(film: Film, directorId: string): Observable<any> {
        return this.removeFromCollection('' + film.id, AppConfig.api.director.collectionName, directorId);
    }

    addActor(film: Film, filmActors: Actor[], actor: Actor): Observable<any> {
        let uri = '';
        filmActors.forEach( item => {
            uri += item.links['self']['href'] + '\n';
        });
        return this.addToCollection('' + film.id, AppConfig.api.actor.collectionName,
            uri + actor.links['self']['href']);
    }

    addDirector(film: Film, filmDirectors: Director[], director: Director): Observable<any> {
        let uri = '';
        filmDirectors.forEach(item => {
            uri += item.links['self']['href'] + '\n';
        });
        return this.addToCollection('' + film.id, AppConfig.api.director.collectionName,
            uri + director.links['self']['href']);
    }

}
