import * as angular from 'angular';
import * as angularAnimate from 'angular-animate';
import * as angularSanitize from 'angular-sanitize';

import RoutingModule from './app.routing';

const app = angular.module('llpoc', [
    angularAnimate,
    angularSanitize,
    RoutingModule
]);
