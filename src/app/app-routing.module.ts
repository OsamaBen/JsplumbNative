import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FlowchartComponent} from '../flowchart';
import {DatasetComponent} from '../dataset';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FlowchartComponent },
  { path: 'data', component: DatasetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
