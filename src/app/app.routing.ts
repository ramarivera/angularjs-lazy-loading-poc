// tslint:disable:max-classes-per-file
import * as angular from 'angular';
// tslint:disable-next-line:no-duplicate-imports
import { IRootScopeService } from 'angular';

import { UIRouter } from '@uirouter/angularjs';

import { ILazyLoad } from 'oclazyload';

import {
    IState,
    IStateProvider,
    IStateService,
    IUrlRouterProvider
} from 'angular-ui-router';

export const Name = 'llpoc.Routing';

const routingModule = angular.module(Name, [
    'ui.router',
    'ui.router.state.events',
    'oc.lazyLoad'
]);

export const rootState = {
    name: 'root',
    url: '/',
    component: 'llpocRoot'
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

        // $stateRegistry.register(appState);
        // $stateRegistry.register(homeState);
        // $stateRegistry.register(loginState);
        // $stateRegistry.register(welcomeState);

        // $stateRegistry.register(contactsFutureState);
        // $stateRegistry.register(prefsFutureState);
        // $stateRegistry.register(mymessagesFutureState);
    }
]);
