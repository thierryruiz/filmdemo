
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FilmService } from './film.service';
import { Film } from '../models/film.model';
import { ActorService } from './actor.service';
import { Actor } from '../models/actor.model';
import { Director } from '../models/director.model';
import { DirectorService } from './director.service';


@Injectable()
export class SearchService {

    constructor(
        private filmService: FilmService,
        private actorService: ActorService,
        private directorService: DirectorService
    ) {
    }

    private filmResultsSource = new BehaviorSubject<Film[]>([]);
    private actorResultsSource = new BehaviorSubject<Actor[]>([]);
    private directorResultsSource = new BehaviorSubject<Director[]>([]);


    public filmResults$ = this.filmResultsSource.asObservable();
    public actorResults$ = this.actorResultsSource.asObservable();
    public directorResults$ = this.directorResultsSource.asObservable();

    public searchAll(val: String) {
        this.filmService.search(val).subscribe(res => {
            this.filmResultsSource.next(res);
        });

        this.actorService.search(val).subscribe(res => {
            this.actorResultsSource.next(res);
        });

        this.directorService.search(val).subscribe(res => {
            this.directorResultsSource.next(res);
        });

    }
}
