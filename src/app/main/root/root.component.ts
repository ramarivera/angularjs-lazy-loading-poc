import { IComponentOptions } from 'angular';

import { RootController } from './root.controller';
import template from './root.component.html';
import './root.css';

export class RootComponent implements IComponentOptions {
    public static Name = 'llpocRoot';

    public bindings = {};
    public template = template;
    public controller = RootController;
    public controllerAs = "ctrl";
}

