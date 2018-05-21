import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Director } from '../../../models/director.model';
import { Film } from '../../../models/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DirectorService } from '../../../services/director.service';
import { ModelHelper } from '../../../shared/model.helper';
import { Utils } from '../../../shared/utils';

export class FirstNameStateMatcher implements ErrorStateMatcher {
  isErrorState(firstNameControl: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(firstNameControl && firstNameControl.invalid && (firstNameControl.dirty || firstNameControl.touched || isSubmitted));
  }
}

export class LastNameStateMatcher implements ErrorStateMatcher {
  isErrorState(lastNameControl: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(lastNameControl && lastNameControl.invalid && (lastNameControl.dirty || lastNameControl.touched || isSubmitted));
  }
}

export class PhotoStateMatcher implements ErrorStateMatcher {
  isErrorState(photoControl: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(photoControl && photoControl.invalid && (photoControl.dirty || photoControl.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-director-edit',
  templateUrl: './director-edit.component.html',
  styleUrls: ['./director-edit.component.css']
})
export class DirectorEditComponent implements OnInit {

  isNew: boolean;

  director: Director;

  firstNameFormControl = new FormControl('', [
    Validators.required
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required
  ]);

  photoFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(Utils.getUrlPattern())
  ]);
  firstNameStateMatcher = new FirstNameStateMatcher();
  lastNameStateMatcher = new LastNameStateMatcher();
  photoStateMatcher = new PhotoStateMatcher();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private directorService: DirectorService,
    private modelHelper: ModelHelper,
    private snackBar: MatSnackBar
  ) {
    this.director = modelHelper.createNewDirector();
  }

  ngOnInit() {
    console.log('DirectorEditComponent on init');
    // get the director id from route params and load actor
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (!id) {
        this.isNew = true;
        this.director = this.modelHelper.createNewDirector();
      } else {
        this.directorService.getById(id)
          .subscribe(gotDirector => {
            this.director = gotDirector;
            this.firstNameFormControl.setValue(this.director.firstName);
            this.lastNameFormControl.setValue(this.director.lastName);
            this.photoFormControl.setValue(this.director.image);
          });
        }
    });
  }

  save() {
    this.director.firstName = this.firstNameFormControl.value;
    this.director.lastName = this.lastNameFormControl.value;
    this.director.image = this.photoFormControl.value;
    if (this.isNew) {
      this.directorService.create(this.director).subscribe((created) => {
        this.director = created;
        this.isNew = false;
        this.snackBar.open('Le nouveau réalisateur  \'' + this.director.firstName + ' '
          + this.director.lastName + '\' a été créé', null, {
            duration: 3000
        });
        this.router.navigate(['director/detail/' + this.director.id]);
      });
    } else {
      this.directorService.update(this.director).subscribe((updated) => {
        this.director = updated;
        this.snackBar.open('Le réalisateur  \'' + this.director.firstName + ' '
          + this.director.lastName + '\' a été mis à jour', null, {
            duration: 3000
        });
        this.router.navigate(['director/detail/' + this.director.id]);
      });
    }
  }

}
