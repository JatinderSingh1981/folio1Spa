import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FolioClassStudentComponent } from './folio-class-student/folio-class-student.component';
import { AlertComponent } from './alert/alert.component';
import { FolioClassStudentDynamicComponent } from './folio-class-student-dynamic/folio-class-student-dynamic.component';
import { FolioClassDynamicComponent } from './folio-class-dynamic/folio-class-dynamic.component';
import { FolioStudentDynamicComponent } from './folio-student-dynamic/folio-student-dynamic.component';
import { CustomMinDirective } from '../shared/customvalidators/custom-min-validator.directive';
import { CustomMaxDirective } from '../shared/customvalidators/custom-max-validator.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    FolioClassStudentComponent,
    AlertComponent,
    FolioClassStudentDynamicComponent,
    FolioClassDynamicComponent,
    FolioStudentDynamicComponent,

    CustomMinDirective,
    CustomMaxDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
