// tslint:disable:max-classes-per-file
import * as angular from 'angular';
// tslint:disable-next-line:no-duplicate-imports
import { IRootScopeService } from 'angular';

import { StateDeclaration, Transition, UIRouter } from '@uirouter/angularjs';

import { ILazyLoad } from 'oclazyload';

import rootComponent from './main/root/root.module';

const routingModuleName = 'llpoc.Routing';

const routingModule = angular.module(routingModuleName, [
    'ui.router',
    'ui.router.state.events',
    'oc.lazyLoad',
    rootComponent
]);

export const rootState = {
    name: 'root',
    url: '/',
    component: 'llpocRoot'
};

export const feature1FutureState: StateDeclaration = {
    parent: 'root',
    name: 'feature1.**',
    url: '/feature1',
    lazyLoad: async $transition$ => {
        const $ocLazyLoad: ILazyLoad = $transition$
            .injector()
            .get('$ocLazyLoad');

        const module = await import(/* webpackChunkName: "feature1" */ './feature1/feature1.module');
        return $ocLazyLoad.load(module.default);
    }
};

routingModule.config([
    '$uiRouterProvider',
    ($uiRouter: UIRouter) => {
        // Enable tracing of each TRANSITION... (check the javascript console)
        // This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
        // Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
        $uiRouter.trace.enable(1);

        // If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
        const $urlService = $uiRouter.urlService;
        $urlService.rules.otherwise({ state: 'root' });

        const $stateRegistry = $uiRouter.stateRegistry;

        $stateRegistry.register(rootState);
        $stateRegistry.register(feature1FutureState);
        // $stateRegistry.register(homeState);
        // $stateRegistry.register(loginState);
        // $stateRegistry.register(welcomeState);

        // $stateRegistry.register(contactsFutureState);
        // $stateRegistry.register(prefsFutureState);
        // $stateRegistry.register(mymessagesFutureState);
    }
]);

export default routingModuleName;
