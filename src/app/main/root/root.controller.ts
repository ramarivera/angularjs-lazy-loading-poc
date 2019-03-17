import { IComponentController } from 'angular';

export class RootController implements IComponentController {
    public static Name = nameof<RootController>();
    public static $inject = [];

    public name: string = RootController.Name;

    constructor() {}

    public $onInit() {}
}
