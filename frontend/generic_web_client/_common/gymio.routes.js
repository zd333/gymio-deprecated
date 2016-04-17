;(function() {
  'use strict';

  var checkRouting = function($q, $rootScope, $location, global, $timeout) {
    if (global.gymioPlatformSettings && global.clubSettings) {
      return true;
    } else {
      var deferred = $q.defer();

      var getSettingsErrorHandler = function(response) {
        getSettingsErrorHandler.retryCounter++;
        if (getSettingsErrorHandler.retryCounter > getSettingsErrorHandler.maxRetries) {
          console.log('Stopped trying to get settings');
          deferred.reject('Tried to get settings ' + getSettingsErrorHandler.maxRetries + ' times');
        }
        else {
          console.error('Can not get platform settings, retrying ' + getSettingsErrorHandler.retryCounter);
          $timeout(getSettings, 5000);
        }
      };
      getSettingsErrorHandler.retryCounter = 0;
      getSettingsErrorHandler.maxRetries = 100;

      function getSettings() {
        global.deferredRequestGymioPlatformSettings().then(function(response) {
          global.gymioPlatformSettings = response.data;
          global.deferredRequestClubSettings().then(function(response) {
            global.clubSettings = response.data;
            $rootScope.appIsInitialized = true;
            deferred.resolve(true);
          }, getSettingsErrorHandler);
        }, getSettingsErrorHandler);
      }
      getSettings();

      return deferred.promise;
    }
  };

  var rts = angular.module('gymio.routes', ['ngRoute']);

  rts.config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'mainview/mainview.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/register', {
        controller: 'RegisterController',
        controllerAs: 'rc',
        templateUrl: 'authentication/register.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/login', {
        controller: 'LoginController',
        controllerAs: 'lc',
        templateUrl: 'authentication/login.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/dashboard_overview', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/dashboard_overview/dashboard_overview.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/tickets', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/tickets/tickets.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/group_workouts', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/group_workouts/group_workouts.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/gym', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/gym/gym.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/sport_journal', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/sport_journal/sport_journal.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/nutrition', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/nutrition/nutrition.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/woomens_calendar', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/woomens_calendar/woomens_calendar.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/my_results', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'dashboard/my_results/my_results.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/dashboard/my_profile', {
        controller: 'MyProfileController',
        controllerAs: 'mpc',
        templateUrl: 'dashboard/my_profile/my_profile.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/staffboard_overview', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/staffboard_overview/staffboard_overview.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/customer_tick', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/customer_tick/customer_tick.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/pre_registration', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/pre_registration/pre_registration.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/register_user', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/register_user/register_user.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/manage_users', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/manage_users/manage_users.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/ticket_sale', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/ticket_sale/ticket_sale.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/ticket_freez', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/ticket_freez/ticket_freez.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/tickets', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/tickets/tickets.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/group_workouts', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/group_workouts/group_workouts.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/gym', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/gym/gym.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/nutrition_courses', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/nutrition_courses/nutrition_courses.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/customer_notification', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/customer_notification/customer_notification.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/expenses', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/expenses/expenses.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/salary', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/salary/salary.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/employee_tick', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/employee_tick/employee_tick.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/employees', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/employees/employees.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/positions', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/positions/positions.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/system_rights', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/system_rights/system_rights.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .when('/staffboard/reports', {
        //controller: '',
        //controllerAs: '',
        templateUrl: 'staffboard/reports/reports.html',
        reloadOnSearch: false,
        resolve: {
          factory: checkRouting
        }
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
})();
