import { StateService } from '@uirouter/core';
import { IComponentController } from 'angular';

export class RootController implements IComponentController {
    public static Name = nameof<RootController>();
    public static $inject = ['$state'];

    public name: string = RootController.Name;

    constructor(private $state: StateService) {}

    public $onInit() {}

    public goToFeature1() {
        this.$state.go('feature1');
    }
}
