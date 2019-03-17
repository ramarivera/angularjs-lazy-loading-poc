import uiRouter from '@uirouter/angularjs';
import * as angular from 'angular';

import { Feat1ListComponent } from './feat1-list.component';

const feat1ListModule = angular
    .module('llpoc.feat1.Feat1List', [uiRouter])
    .component(Feat1ListComponent.Name, new Feat1ListComponent()).name;

export default feat1ListModule;
