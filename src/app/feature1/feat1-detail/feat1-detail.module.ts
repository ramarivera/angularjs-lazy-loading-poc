import uiRouter from '@uirouter/angularjs';
import * as angular from 'angular';

import { Feat1DetailComponent } from './feat1-detail.component';

const feat1DetailModule = angular
    .module('llpoc.feature1.Feat1Detail', [uiRouter])
    .component(Feat1DetailComponent.Name, new Feat1DetailComponent()).name;

export default feat1DetailModule;
