import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {Dialogs, jsPlumbToolkit, jsPlumbUtil} from 'jsplumbtoolkit';
import {jsPlumbService} from 'jsplumbtoolkit-angular';
import {FlowchartComponent} from '../flowchart';
import {DatasetComponent} from '../dataset';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(FlowchartComponent) flowchart: FlowchartComponent;
  @ViewChild(DatasetComponent) dataset: DatasetComponent;

  toolkitId: string;
  toolkit: jsPlumbToolkit;
  // nodeTypes = [
  //   {label: 'Question', type: 'question', w: 120, h: 120},
  //   {label: 'Action', type: 'action', w: 120, h: 70 },
  //   {label: 'Output', type: 'output', w: 120, h: 70},
  //   {label: 'Structure', type: 'structure', w: 120, h: 70}
  // ];
  toolkitParams = {
    nodeFactory: (type: string, data: any, callback: Function) => {
      data.id = jsPlumbUtil.uuid();
      if (type === 'structure') {
        data.nodes = [];
      }
      callback(data);
      // Dialogs.show({
      //   id: 'dlgText',
      //   title: 'Enter ' + type + ' name:',
      //   onOK: (d: any) => {
      //     data.text = d.text;
      //     // if the user entered a name...
      //     if (data.text) {
      //       // and it was at least 2 chars
      //       if (data.text.length >= 2) {
      //         // set an id and continue.
      //         data.id = jsPlumbUtil.uuid();
      //         callback(data);
      //       } else {
      //       // else advise the user.
      //         alert(type + ' names must be at least 2 characters!');
      //       }
      //     }
      //     // else...do not proceed.
      //   }
      // });
    },
    beforeStartConnect: (node: any, edgeType: string) => {
      return {label: '...'};
    }
  };

  constructor(private $jsplumb: jsPlumbService, private elementRef: ElementRef) {
    // this.toolkitId = this.elementRef.nativeElement.getAttribute('toolkitId');
    this.toolkitId = 'flowchart';
  }

  ngOnInit() {
    this.toolkit = this.$jsplumb.getToolkit(this.toolkitId, this.toolkitParams);
  }

  ngAfterViewInit() {
    // this.toolkit.load({url: 'data/flowchart-1.json'});
  }

}
