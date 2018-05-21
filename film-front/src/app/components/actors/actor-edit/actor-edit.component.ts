import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Actor } from '../../../models/actor.model';
import { Film } from '../../../models/film.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ActorService } from '../../../services/actor.service';
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
  selector: 'app-actor-edit',
  templateUrl: './actor-edit.component.html',
  styleUrls: ['./actor-edit.component.css']
})
export class ActorEditComponent implements OnInit {

  isNew: boolean;

  actor: Actor;

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
    private actorService: ActorService,
    private modelHelper: ModelHelper,
    private snackBar: MatSnackBar
  ) {
    this.actor = modelHelper.createNewActor();
  }

  ngOnInit() {
    console.log('ActorEditComponent on init');
    // get the actor id from route params and load actor
    this.route.paramMap.subscribe(params => {
      const id: string = params.get('id');
      if (!id) {
        this.isNew = true;
        this.actor = this.modelHelper.createNewActor();
      } else {
        this.actorService.getById(id)
          .subscribe(gotActor => {
            this.actor = gotActor;
            this.firstNameFormControl.setValue(this.actor.firstName);
            this.lastNameFormControl.setValue(this.actor.lastName);
            this.photoFormControl.setValue(this.actor.image);
          });
        }
    });
  }

  save() {
    this.actor.firstName = this.firstNameFormControl.value;
    this.actor.lastName = this.lastNameFormControl.value;
    this.actor.image = this.photoFormControl.value;
    if (this.isNew) {
      this.actorService.create(this.actor).subscribe((created) => {
        this.actor = created;
        this.isNew = false;
        this.snackBar.open('Le ou la nouvel(lle) acteur/actice  \'' + this.actor.firstName + ' '
          + this.actor.lastName + '\' a été créé(e)', null, {
          duration: 3000
        });
        this.router.navigate(['actor/detail/' + this.actor.id]) ;
      });
    } else {
      this.actorService.update(this.actor).subscribe((updated) => {
        this.actor = updated;
        this.snackBar.open('L\'acteur/actrice  \'' + this.actor.firstName + ' '
          + this.actor.lastName + '\' a été mis(e) à jour', null, {
            duration: 3000
        });
        this.router.navigate(['actor/detail/' + this.actor.id]);
      });
    }
  }
}
