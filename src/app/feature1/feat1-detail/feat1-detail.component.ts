import { IComponentOptions } from 'angular';

import { Feat1DetailController } from './feat1-detail.controller';
import template from './feat1-detail.component.html';
import './feat1-detail.css';

export class Feat1DetailComponent implements IComponentOptions {
    public static Name = 'llpocFeat1Detail';

    public bindings = {};
    public template = template;
    public controller = Feat1DetailController;
    public controllerAs = "ctrl";
}

