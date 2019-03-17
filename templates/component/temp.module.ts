import * as angular from 'angular';
import uiRouter from 'angular-ui-router';

import { <%= upperName %>Component } from './<%= kebabName %>.component';

const <%= lowerName %>Module =
  angular.module('<%= rootModule %>.<%= upperName %>', [uiRouter])
         .component(<%= upperName %>Component.Name, new <%= upperName %>Component())
         .name;

export default <%= lowerName %>Module;