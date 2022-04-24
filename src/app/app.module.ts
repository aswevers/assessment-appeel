import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSortModule} from '@angular/material/sort';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    DetailComponent,
    RepositoryListComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSortModule,
    ScrollingModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
