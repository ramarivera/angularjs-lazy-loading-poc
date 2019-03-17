import uiRouter from '@uirouter/angularjs';
import * as angular from 'angular';

import { RootComponent } from './root.component';

const rootModule = angular
    .module('llpoc.main.Root', [uiRouter])
    .component(RootComponent.Name, new RootComponent()).name;

export default rootModule;
