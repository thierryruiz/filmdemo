import { Component, OnInit, Inject  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../services/search.service';
import { Observable } from 'rxjs/Observable';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {


  searchField: FormControl;

  constructor(
    private searchService: SearchService,
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any) {
  }

  ngOnInit() {
    this.searchService.searchAll('');
    this.searchField = new FormControl();
    this.searchField.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(v => {
        return this.searchService.searchAll(v) ;
      });
  }

  onItemSelected(event: any) {
    this.dialogRef.close(event) ;
  }

}
