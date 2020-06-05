import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {InfoComponent} from './info/info.component';
import { AddEditComponent } from './add-edit/add-edit.component';


const routes: Routes = [
  {path: '', component: InfoComponent},
  {path: 'view', component: ListComponent},
  {path: 'add', component: AddEditComponent},
  { path: 'edit/:id', component: AddEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
