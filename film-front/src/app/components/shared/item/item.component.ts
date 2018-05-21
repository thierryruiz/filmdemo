import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() label: string ;

  @Input() image: string;

  @Input() detailLink: string;

  @Input() editable: Boolean = false ;

  constructor() { }

  ngOnInit() {
  }
}
