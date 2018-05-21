import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { AppConfig } from '../config/app.config';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

const _headers = new HttpHeaders({ 'Content-Type': 'application/json' }) ;


/*
 * Base service to for model CRUDs operations based RESTful API (HATEOAS)
*/
export abstract class ModelService<T> {

    abstract getModelName(): string;

    abstract modelFromJSON(json: any): T;

    constructor(
        protected authService: AuthService,
        protected http: HttpClient,
        protected snackBar: MatSnackBar
    ) {}


    protected handleError(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error( 'Error occured on ' + this.getModelName() + ' data service request', error );
            console.error(`${operation} failed: ${error.message}`);
            // FIXME better error message to the user
            this.snackBar.open('An error occured sorry', null, {
                duration: 3000
            });
            return of(result as T);
        };
    }

    protected getModelCollectionName(): string {
        return AppConfig.api[this.getModelName()]['collectionName'];
    }

    protected getBaseUrl() {
        return environment.apiUrl + '/' + this.getModelCollectionName();
    }


    getById( id: string ): Observable<T> {
        return this.http.get( this.getBaseUrl() + '/' + id )
            .pipe(
                map(json => this.modelFromJSON(json)),
                catchError(this.handleError('getById'))
            );
    }

    getAuthHeaders() {
        const token = this.authService.getToken();
        return (token != null) ? new HttpHeaders({ 'Content-Type': 'application/json' })
            .append('Authorization', 'Bearer ' + token) : new HttpHeaders({ 'Content-Type': 'application/json' });
    }

    list(): Observable<T[]> {
        return this.http.get( this.getBaseUrl() )
            .pipe(
                map( res => {
                    return res['_embedded'][ this.getModelCollectionName() ].map( json => {
                        return this.modelFromJSON( json ) ;
                    });
                },
                catchError(this.handleError('list'))
            )
        );
    }

    create( data: T ): Observable<T> {
        console.log('Add  new ' + this.getModelName() + ' ' +  JSON.stringify(data));
        const token = this.authService.getToken();
        const headers = (token != null ) ? new HttpHeaders({ 'Content-Type': 'application/json' })
            .append('Authorization', 'Bearer ' + token) : new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<T>(
            environment.apiUrl + '/' + this.getModelCollectionName(),
            data,
            {headers: headers}
        ).pipe(
            tap((created: any) => {
                console.log('added  new ' + this.getModelName() + ' ' + JSON.stringify(created));
            }),
            catchError(this.handleError('create'))
        );
    }

    update(data: T): Observable<T> {
        console.log('Update ' + this.getModelName() + ' ' + JSON.stringify(data));
        return this.http.put<T>(
            environment.apiUrl + '/' + this.getModelCollectionName() + '/' + data['id'],
            data,
            { headers: this.getAuthHeaders() }
        ).pipe(
            tap((updated: any) => {
                console.log('updated ' + this.getModelName() + ' ' + JSON.stringify(updated));
            }),
            catchError(this.handleError('update'))
        );
    }

     delete(data: T): Observable<T> {
        console.log('Delete ' + this.getModelName() + ' ' + JSON.stringify(data));
        return this.http.delete<T>(
            environment.apiUrl + '/delete' + this.getModelName() + '/' + data['id'],
            { headers: this.getAuthHeaders() }
        ).pipe(
            tap((any) => {
                console.log('updated ' + this.getModelName() + ' ' + JSON.stringify(data));
            }),
            catchError(this.handleError('delete'))
        );
    }


    search(param: String): Observable<T[]> {
        const searchUrl = this.getBaseUrl() + AppConfig.api[this.getModelName()].searchUrl;
        return this.http.get(searchUrl + param)
            .pipe(
                map( res => {
                    return res['_embedded'][this.getModelCollectionName()].map( json => {
                        return this.modelFromJSON(json);
                    });
                },
                catchError(this.handleError('search'))
            )
        );
    }


    removeFromCollection(id: string, collectionName: string, removeId: string): Observable<any> {
        return this.http.delete(
            this.getBaseUrl() + '/'  + id + '/' + collectionName + '/' + removeId,
            { headers: this.getAuthHeaders() }
        ).pipe(
            tap( any => {
                console.log('added  new element to ' + collectionName + ' of ' + this.getModelName() );
            }),
            catchError( this.handleError('removeFromCollection') )
        );
    }

    addToCollection(id: string, collectionName: string, uriList: string ): Observable<any> {
        const token = this.authService.getToken();
        const headers = new HttpHeaders({ 'Content-Type': 'text/uri-list' })
            .append('Authorization', 'Bearer ' + token);
        return this.http.put(
            this.getBaseUrl() + '/' + id + '/' + collectionName,
            uriList,
            { headers: headers  }
        ).pipe(
            tap(any => {
                console.log('added  new element to ' + collectionName + ' of ' + this.getModelName());
            }),
            catchError(this.handleError('addToCollection'))
        );
    }

}
