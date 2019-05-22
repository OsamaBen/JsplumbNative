import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {CanvasLocation, Dialogs, DrawingTools, Edge, jsPlumbToolkit, Surface} from 'jsplumbtoolkit';

import {jsPlumbSurfaceComponent} from 'jsplumbtoolkit-angular';

import {ActionNodeComponent, OutputNodeComponent, QuestionNodeComponent, StartNodeComponent, StructureNodeComponent} from './components';


@Component({
  selector: 'jsplumb-flowchart',
  templateUrl: './flowchart.html'
})
export class FlowchartComponent implements OnDestroy , AfterViewInit {

  @ViewChild(jsPlumbSurfaceComponent) surfaceComponent: jsPlumbSurfaceComponent;

  toolkit: jsPlumbToolkit;
  surface: Surface;

  toolkitId: string;
  surfaceId: string;

  nodeTypes = [
    {label: 'Question', type: 'question', w: 120, h: 120},
    {label: 'Action', type: 'action', w: 120, h: 70 },
    {label: 'Output', type: 'output', w: 120, h: 70},
    {label: 'Structure', type: 'structure', w: 120, h: 70}
  ];

  view = {
    nodes: {
      start: {
        component: StartNodeComponent
      },
      selectable: {
        events: {
          tap: (params: any) => {
            this.toggleSelection(params.node);
          }
        }
      },
      question: {
        parent: 'selectable',
        component: QuestionNodeComponent
      },
      output: {
        parent: 'selectable',
        component: OutputNodeComponent
      },
      action: {
        parent: 'selectable',
        component: ActionNodeComponent
      },
      structure: {
        parent: 'selectable',
        component: StructureNodeComponent
      },

    },
    edges: {
      default: {
        anchor: 'AutoDefault',
        endpoint: 'Blank',
        connector: ['Flowchart', {cornerRadius: 5}],
        paintStyle: {strokeWidth: 2, stroke: 'rgb(132, 172, 179)', outlineWidth: 3, outlineStroke: 'transparent'},
        hoverPaintStyle: {strokeWidth: 2, stroke: 'rgb(67,67,67)'}, // hover paint style for this edge type.
        events: {
          dblclick: (params: any) => {
            Dialogs.show({
              id: 'dlgConfirm',
              data: {
                msg: 'Delete Edge'
              },
              onOK: () => {
                this.removeEdge(params.edge);
              }
            });
          }
        },
        overlays: [
          ['Arrow', {location: 1, width: 10, length: 10}],
          ['Arrow', {location: 0.3, width: 10, length: 10}]
        ]
      },
      connection: {
        parent: 'default',
        overlays: [
          [
            'Label', {
            label: '${label}',
            events: {
              click: (params: any) => {
                this.editLabel(params.edge);
              }
            }
          }
          ]
        ]
      }
    },
    ports: {
      start: {
        endpoint: 'Blank',
        anchor: 'Continuous',
        uniqueEndpoint: true,
        edgeType: 'default'
      },
      source: {
        endpoint: 'Blank',
        paintStyle: {fill: '#84acb3'},
        anchor: 'AutoDefault',
        maxConnections: -1,
        edgeType: 'connection'
      },
      target: {
        maxConnections: -1,
        endpoint: 'Blank',
        anchor: 'AutoDefault',
        paintStyle: {fill: '#84acb3'},
        isTarget: true
      }
    }
  };
  renderParams = {
    layout: {
      type: 'Spring'
    },
    events: {
      edgeAdded: (params: any) => {
        if (params.addedByMouse) {
          this.editLabel(params.edge);
        }
      }
    },
    consumeRightClick: false,
    dragOptions: {
      filter: '.jtk-draw-handle, .node-action, .node-action i'
    }
  };

  constructor() {
    this.toolkitId = 'flowchart';
    this.surfaceId = 'flowchartSurface';
  }

  getToolkit(): jsPlumbToolkit {
    return this.toolkit;
  }

  toggleSelection(node: any) {
    this.toolkit.toggleSelection(node);
  }

  // disabling linter so you can see all of the method arguments

  removeEdge(edge: any) {
    this.toolkit.removeEdge(edge);
  }

  onCanvasDrop(surface: Surface, data: any, positionOnSurface: CanvasLocation) {
    data.left = positionOnSurface.left;
    data.top = positionOnSurface.top;
    surface.getToolkit().addFactoryNode(data.type, data);
  }

  // eslint-disable-next-line
  onEdgeDrop(surface: Surface, data: any, edge: Edge, positionOnSurface: CanvasLocation) {
    const toolkit = surface.getToolkit();
    toolkit.addFactoryNode(data.type, data,
      (newNode) => {
        const currentSource = edge.source; // the current source node
        const currentTarget = edge.target; // the target node
        toolkit.removeEdge(edge);
        toolkit.addEdge({source: currentSource, target: newNode, data: {label: '...', type: 'connection'}});
        toolkit.addEdge({source: newNode, target: currentTarget, data: {label: '...', type: 'connection'}});
        surface.setPosition(newNode, positionOnSurface.left, positionOnSurface.top);
      }
    );
  }

  editLabel(edge: any) {
    Dialogs.show({
      id: 'dlgText',
      data: {
        text: edge.data.label || ''
      },
      onOK: (data: any) => {
        this.toolkit.updateEdge(edge, {label: data.text});
      }
    });
  }

  // typeExtractor(el:Element) {
  //   return el.getAttribute("data-node-type");
  // }

  dataGenerator(el: Element) {
    return {
      type: el.getAttribute('data-node-type'),
      w: parseInt(el.getAttribute('jtk-width'), 10),
      h: parseInt(el.getAttribute('jtk-height'), 10)
    };
  }

  ngAfterViewInit() {
    this.surface = this.surfaceComponent.surface;
    this.toolkit = this.surface.getToolkit();

    // new DrawingTools({
    //   renderer: this.surface
    // });
  }

  ngOnDestroy() {
    console.log('flowchart being destroyed');
  }

  createStructure() {
    let nodesToAdd = [];
    this.toolkit.getSelection().getNodes().forEach( n => {
      nodesToAdd.push(n);
    });
    this.toolkit.addNode({label: 'Structure', type: 'structure', w: 120, h: 70, nodes: nodesToAdd});
  }
}
