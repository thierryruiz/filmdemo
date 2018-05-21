import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private searchField: FormControl;
  title = 'app';
  showLogin = false;
  authenticated = false;

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router ) {
  }

  ngOnInit() {
    console.log('AppComponent on init');
    // By default display results of a search all on home page
    // this.searchService.searchAll('');
    // this.router.navigate(['']);
    this.searchField = new FormControl() ;
    this.searchField.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(v => {
        // Go to home page after search
        this.router.navigate(['']);
        return this.searchService.searchAll( v );
      });
  }

  showLoginForm() {
    this.showLogin = true;
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  onLogin() {
    this.authenticated = true;
    this.showLogin = false;
    this.router.navigate(['']);
  }

}
