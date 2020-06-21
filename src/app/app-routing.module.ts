import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolioClassStudentComponent } from './folio-class-student/folio-class-student.component';
import { FolioClassStudentDynamicComponent } from './folio-class-student-dynamic/folio-class-student-dynamic.component';
import { FolioClassDynamicComponent } from './folio-class-dynamic/folio-class-dynamic.component';


const routes: Routes = [
  { path: '', component: FolioClassStudentComponent },
  { path: 'folio-class-student-dynamic', component: FolioClassStudentDynamicComponent },
  { path: 'folio-class-dynamic', component: FolioClassDynamicComponent },
  

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
