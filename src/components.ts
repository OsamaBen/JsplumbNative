import {Dialogs, Node} from 'jsplumbtoolkit';
import {BaseNodeComponent} from 'jsplumbtoolkit-angular';
import {Component} from '@angular/core';


function isNode(obj: any): obj is Node {
  return obj.objectType === 'Node';
}

/**
 * This is the base class for editable nodes in this demo. It extends `BaseNodeComponent`
 */
export class BaseEditableNodeComponent extends BaseNodeComponent {

  removeNode() {
    let obj = this.getNode();
    if (obj != null) {
      if (isNode(obj)) {
        Dialogs.show({
          id: 'dlgConfirm',
          data: {
            msg: 'Delete \'' + obj.data.text + '\''
          },
          onOK: () => {
            this.toolkit.removeNode(<Node>obj);
          }
        });
      }
    }
  }

  editNode() {
    let obj = this.getNode();
    Dialogs.show({
      id: 'dlgText',
      data: obj.data,
      title: 'Edit ' + obj.data.type + ' name',
      onOK: (data: any) => {
        if (data.text && data.text.length > 2) {
          // if name is at least 2 chars long, update the underlying data and
          // update the UI.
          this.toolkit.updateNode(obj, data);
        }
      }
    });
  }

}

// ----------------- question node -------------------------------

@Component({templateUrl: 'templates/question.html'})
export class QuestionNodeComponent extends BaseEditableNodeComponent {
}

// ----------------- action node -------------------------------

@Component({templateUrl: 'templates/action.html'})
export class ActionNodeComponent extends BaseEditableNodeComponent {
  showDetails(obj) {
    console.log('xxxx', obj);
  }
}

// ----------------- start node -------------------------------

@Component({templateUrl: 'templates/start.html'})
export class StartNodeComponent extends BaseEditableNodeComponent {
}

// ----------------- output node -------------------------------

@Component({templateUrl: 'templates/output.html'})
export class OutputNodeComponent extends BaseEditableNodeComponent {
}

// ----------------- Structure node -------------------------------

@Component({templateUrl: 'templates/structure.html'})
export class StructureNodeComponent extends BaseEditableNodeComponent {
  showStruct() {
    console.log('ccccc', this.obj);
  }
}

// -------------- /node components ------------------------------------
