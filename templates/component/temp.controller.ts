import { IComponentController } from 'angular';

export class <%= upperName %>Controller implements  IComponentController {

    public static Name = nameof <<%= upperName %>Controller > ();
    public static $inject = [];

    public name: string = <%= upperName %>Controller.Name;

    constructor() { }

    public $onInit() { }
}
