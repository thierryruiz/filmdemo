import { Component, OnInit, Input } from '@angular/core';

import { MatExpansionPanelActionRow } from '@angular/material';
import { FilmService } from '../../services/film.service';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    public searchService: SearchService,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.searchService.searchAll('');
  }

}
