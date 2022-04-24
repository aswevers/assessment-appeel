import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { RepositoryListComponent } from './components/repository-list/repository-list.component';

const routes: Routes = [
  { path: 'commits/:username/:repositoryName', component: DetailComponent},
  { path: '', component: RepositoryListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
