import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

const materialCompon = [
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDialogModule,
  MatSortModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule

]

@NgModule({
  declarations: [],
  imports: [materialCompon],
  exports: [materialCompon]
})
export class MatModulesModule { }
