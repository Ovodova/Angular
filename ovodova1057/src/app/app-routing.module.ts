import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';


const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'list', component: ListComponent },
  { path: 'productsAdd', component: AddEditComponent },
  { path: 'productsEdit/:id', component: AddEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
