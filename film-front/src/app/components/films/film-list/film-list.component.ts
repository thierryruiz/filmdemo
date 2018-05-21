import { Component, OnInit, Input } from '@angular/core';
import { Film } from '../../../models/film.model';
import { FilmService } from '../../../services/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  @Input() films: Film[];

  @Input() small: Boolean = false;

  @Input() editable: Boolean = false;

  constructor(
    private filmService: FilmService,
    private router: Router ) {
  }

  ngOnInit() {
  }

}
