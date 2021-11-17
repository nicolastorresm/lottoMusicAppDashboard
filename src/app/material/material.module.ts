import { NgModule } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';



@NgModule({
  exports: [ 
    MatSidenavModule,
     MatCardModule,
     MatToolbarModule,
     MatIconModule,
     MatListModule,
     MatButtonModule,
     MatProgressSpinnerModule,
     MatGridListModule,
     MatAutocompleteModule,
     MatFormFieldModule,
     MatInputModule,
     MatSelectModule,
     MatDatepickerModule,
     MatNativeDateModule, 
     MatSnackBarModule
   
    

  ]
})
export class MaterialModule { }
