import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Director } from '../../../models/director.model';

@Component({
  selector: 'app-director-list',
  templateUrl: './director-list.component.html',
  styleUrls: ['./director-list.component.css']
})
export class DirectorListComponent implements OnInit {

  @Input() directors: Director[];

  @Input() small: Boolean = false;

  @Input() editable: Boolean = false;

  @Output() clickDirector = new EventEmitter();

  @Output() clickAddDirector = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log('Is editable on init ? ' + this.editable);
  }

  onClickActor(id: any) {
    this.clickDirector.emit({directorId: id});
  }

  onClickAddActor(id: any) {
    this.clickAddDirector.emit({});
  }

}
