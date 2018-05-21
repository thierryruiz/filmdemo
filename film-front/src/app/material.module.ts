import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule  } from '@angular/material';
import { AddItemComponent } from './components/shared/add-item/add-item.component';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule],
  exports: [MatButtonModule, MatToolbarModule, MatIconModule, MatDialogModule],
  entryComponents: [AddItemComponent]
})
export class MaterialModule {}
