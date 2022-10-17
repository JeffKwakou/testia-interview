import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefectFormComponent } from './defect-form/defect-form.component';

const routes: Routes = [
  {
    path: '',
    component: DefectFormComponent
  },
  {
    path: '**',
    redirectTo:'', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
