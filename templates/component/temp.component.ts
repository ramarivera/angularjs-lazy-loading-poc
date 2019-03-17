import { IComponentOptions } from 'angular';

import { <%= upperName %>Controller } from './<%= kebabName %>.controller';
import template from './<%= kebabName %>.component.html';
import './<%= kebabName %>.css';

export class <%= upperName %>Component implements IComponentOptions {
    public static Name = '<%= appPrefix %><%= upperName %>';

    public bindings = {};
    public template = template;
    public controller = <%= upperName %>Controller;
    public controllerAs = "ctrl";
}

