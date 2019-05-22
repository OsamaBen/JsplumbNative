import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ActionNodeComponent, OutputNodeComponent, QuestionNodeComponent, StartNodeComponent, StructureNodeComponent} from '../components';
import {ControlsComponent} from '../controls';
import {FlowchartComponent} from '../flowchart';
import {DatasetComponent} from '../dataset';
import {jsPlumbToolkitModule} from 'jsplumbtoolkit-angular';
import {jsPlumbToolkitDragDropModule} from 'jsplumbtoolkit-angular-drop';
import {Dialogs} from 'jsplumbtoolkit';
import { TestJsComponent } from './test-js/test-js.component';

@NgModule({
  declarations: [
    AppComponent, QuestionNodeComponent, ActionNodeComponent, StructureNodeComponent ,
    StartNodeComponent, OutputNodeComponent, DatasetComponent, FlowchartComponent, ControlsComponent, TestJsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    jsPlumbToolkitModule, jsPlumbToolkitDragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuestionNodeComponent, ActionNodeComponent, StartNodeComponent, OutputNodeComponent, StructureNodeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor() {
    Dialogs.initialize({
      selector: '.dlg'
    });
  }
}
