;
(function() {
  'use strict';

  angular
    .module('gymio.services')
    .factory('authorisation', ['$translate', 'Authentication', function($translate, Authentication) {
      return {
        getPossibleRights: getPossibleRights,
        getRightsAllowedToBeSetByLoggedInUser: getRightsAllowedToBeSetByLoggedInUser
      };

      function getPossibleRights() {
        //this list must exactly match correspondidng backend list (RIGHT_CHOICES)
        return [{
          code: 'CO',
          text: $translate.instant('Club owner')
        }, {
          code: 'FK',
          text: $translate.instant('Finance keeper')
        }, {
          code: 'EI',
          text: $translate.instant('Expenses compositor')
        }, {
          code: 'HR',
          text: $translate.instant('Human resources')
        }, {
          code: 'SK',
          text: $translate.instant('Sales keeper')
        }, {
          code: 'RA',
          text: $translate.instant('Reception admin')
        }, {
          code: 'HT',
          text: $translate.instant('Head trainer')
        }, ];
      }

      function getRightsAllowedToBeSetByLoggedInUser() {
        //TODO: move this to authorisation module
        var usr = Authentication.getAuthenticatedUser();
        if (!usr.is_staff) return [];
        if (usr.userRights.indexOf('CO') >= 0) {
          return getPossibleRights();
        }
        if (usr.userRights.indexOf('HR') >= 0) {
          var t = getPossibleRights();
          t.shift();//remove CO
          t.shift();//remove FK
          t.shift();//remove EI
          return t;
        }
        return [];//all regular staff is allowed to assign nobody
      }

    }]);
})();
