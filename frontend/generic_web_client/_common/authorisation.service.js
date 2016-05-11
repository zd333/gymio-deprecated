;
(function() {
  'use strict';

  angular
    .module('gymio.services')
    .factory('authorisation', ['$translate', 'Authentication', function($translate, Authentication) {
      return {
        getPossibleRights: getPossibleRights,
        getRightsAllowedToBeSetByLoggedInUser: getRightsAllowedToBeSetByLoggedInUser,
        getAllowedStaffboardModuleList: getAllowedStaffboardModuleList
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
          code: 'TK',
          text: $translate.instant('tickets keeper')
        }, {
          code: 'RA',
          text: $translate.instant('Reception admin')
        }, {
          code: 'HT',
          text: $translate.instant('Head trainer')
        }, ];
      }

      function getRightsAllowedToBeSetByLoggedInUser() {
        var usr = Authentication.getAuthenticatedUser();
        if ((!usr.is_staff) || (!usr.is_active)) return [];
        if (usr.userRights.indexOf('CO') >= 0) {
          return getPossibleRights();
        }
        if (usr.userRights.indexOf('HR') >= 0) {
          var t = getPossibleRights();
          t.shift(); //remove CO
          t.shift(); //remove FK
          t.shift(); //remove EI
          return t;
        }
        return []; //all regular staff is allowed to assign nobody
      }

      function getAllowedStaffboardModuleList() {
        var usr = Authentication.getAuthenticatedUser();
        if ((!usr.is_staff) || (!usr.is_active)) {
          return [];
        }

        var modules = ['staffboard_overview']; //common modules available for all staff
        var HTmodules = [
          //'group_workouts',//uncomment after implementation
          //'gym',//uncomment after implementation
          //'nutrition_courses',//uncomment after implementation
        ];
        var TKmodules = [
          //'tickets'//uncomment after implementation
        ];
        var HRmodules = [
          //'employee_tick',//uncomment after implementation
          'employees',
          'employee_roles'
        ];
        var EImodules = [
          //'expenses',//uncomment after implementation
          //'salary',//uncomment after implementation
        ];
        var FKmodules = [
          //'reports'//uncomment after implementation
        ];
        var RAmodules = [
          //'customer_tick',//uncomment after implementation
          //'pre_registration',//uncomment after implementation
          //'register_user',//uncomment after implementation
          'manage_users'
          //'ticket_sale',//uncomment after implementation
          //'ticket_freez',//uncomment after implementation
          //'customer_notification',//uncomment after implementation
        ];

        if ((usr.userRights.indexOf('RA') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(RAmodules);
        }
        if ((usr.userRights.indexOf('HR') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(HRmodules);
        }
        if ((usr.userRights.indexOf('HT') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(HTmodules);
        }
        if ((usr.userRights.indexOf('TK') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(TKmodules);
        }
        if ((usr.userRights.indexOf('EI') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(EImodules);
        }
        if ((usr.userRights.indexOf('FK') >= 0) || (usr.userRights.indexOf('CO') >= 0)) {
          modules = modules.concat(FKmodules);
        }

        return modules;
      }

    }]);
})();
