import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { MenuComponent } from './menu/menu.component';
import { InfoComponent } from './info/info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TextMaskModule} from 'angular2-text-mask';
import { SearchPipe } from './pipes/search.pipe';
import { AddEditComponent } from './add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MenuComponent,
    InfoComponent,
    SearchPipe,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
