import * as angular from 'angular';

import { StateRegistry, Transition } from '@uirouter/angularjs';
import { ILazyLoad } from 'oclazyload';

const feature1Name = 'llpoc.feature1';
const feature1Module = angular.module(feature1Name, []);

const getOcLazyLoad = ($transition$: Transition): ILazyLoad => {
    return $transition$.injector().get('$ocLazyLoad');
};

feature1Module
    .config([
        '$stateRegistryProvider',
        ($stateRegistry: StateRegistry) => {
            $stateRegistry.register({
                parent: 'root',
                name: 'feature1',
                url: '/feature1',
                views: {
                    root: {
                        template:
                            '<i>I am the FEATURE1 root feature state</i> <div ui-view/>'
                    }
                },
                redirectTo: () => {
                    return 'list';
                }
            });

            $stateRegistry.register({
                parent: 'feature1',
                name: 'list',
                url: '/list',
                component: 'llpocFeat1List',
                lazyLoad: async $transition$ => {
                    const module = await import(/* webpackChunkName: "feat1-list" */ './feat1-list/feat1-list.module');
                    return getOcLazyLoad($transition$).inject(module.default);
                }
            });

            $stateRegistry.register({
                parent: 'feature1',
                name: 'detail',
                url: '/detail',
                component: 'llpocFeat1Detail',
                lazyLoad: async $transition$ => {
                    const module = await import(/* webpackChunkName: "feat1-detail" */ './feat1-detail/feat1-detail.module');
                    return getOcLazyLoad($transition$).inject(module.default);
                }
            });
        }
    ])
    .run([
        () => {
            // tslint:disable-next-line:no-console
            console.log('I AM RUNNING FROM A LAZY LOADED MODULE ');
        }
    ]);

export default feature1Name;
