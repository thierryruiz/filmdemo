import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Actor } from '../../../models/actor.model';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  @Input() actors: Actor[];

  @Input() small: Boolean = false;

  @Input() editable: Boolean = false;

  @Output() clickActor = new EventEmitter();

  @Output() clickAddActor = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    console.log('Is editable on init ? ' + this.editable );
  }

  onClickActor(id: any) {
    this.clickActor.emit( {actorId: id} ) ;
  }

  onClickAddActor(id: any) {
    this.clickAddActor.emit({});
  }


}
