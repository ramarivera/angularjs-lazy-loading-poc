import * as angular from 'angular';

import { StateRegistry, Transition } from '@uirouter/angularjs';
import { ILazyLoad } from 'oclazyload';

const feature1Name = 'llpoc.feature1';
const feature1Module = angular.module(feature1Name, []);

const getOcLazyLoad = ($transition$: Transition): ILazyLoad => {
    return $transition$.injector().get('$ocLazyLoad');
};

feature1Module.config([
    '$stateRegistryProvider',
    ($stateRegistry: StateRegistry) => {
        $stateRegistry.register({
            parent: 'feature1',
            name: 'feat1-list',
            url: '/list',
            component: 'llpocFeat1List',
            lazyLoad: async $transition$ => {
                const module = await import(/* webpackChunkName: "feat1-list" */ './feat1-list/feat1-list.module');
                return getOcLazyLoad($transition$).load(module.default);
            }
        });

        $stateRegistry.register({
            parent: 'feature1',
            name: 'feat1-detail',
            url: '/detail',
            component: 'llpocFeat1Detail',
            lazyLoad: async $transition$ => {
                const module = await import(/* webpackChunkName: "feat1-detail" */ './feat1-detail/feat1-detail.module');
                return getOcLazyLoad($transition$).load(module.default);
            }
        });
    }
]);

export default feature1Name;
