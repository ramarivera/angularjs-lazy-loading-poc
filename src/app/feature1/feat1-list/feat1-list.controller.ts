import { IComponentController } from 'angular';

export class Feat1ListController implements IComponentController {
    public static Name = nameof<Feat1ListController>();
    public static $inject = [];

    public name: string = Feat1ListController.Name;

    constructor() {}

    public $onInit() {}
}
