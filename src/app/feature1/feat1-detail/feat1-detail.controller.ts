import { IComponentController } from 'angular';

export class Feat1DetailController implements  IComponentController {

    public static Name = nameof <Feat1DetailController > ();
    public static $inject = [];

    public name: string = Feat1DetailController.Name;

    constructor() { }

    public $onInit() { }
}
