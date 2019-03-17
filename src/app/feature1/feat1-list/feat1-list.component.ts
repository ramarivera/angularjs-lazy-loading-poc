import { IComponentOptions } from 'angular';

import template from './feat1-list.component.html';
import { Feat1ListController } from './feat1-list.controller';
import './feat1-list.css';

export class Feat1ListComponent implements IComponentOptions {
    public static Name = 'llpocFeat1List';

    public bindings = {};
    public template = template;
    public controller = Feat1ListController;
    public controllerAs = 'ctrl';
}
