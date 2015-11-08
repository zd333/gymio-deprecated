(function () {
    'use strict';

    var rts = angular.module('gymio.routes', ['ngRoute']);

    rts.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', { //TODO: fix stub (need dashboard or welcome page if unauthenticated)
                controller: 'RegisterController',
                controllerAs: 'rc',
                templateUrl: '/authentication/register.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'rc',
                templateUrl: '/authentication/register.html'
            })
            .when('/dashboard', {
                controller: 'DashboardController',
                controllerAs: 'dc',
                templateUrl: '/dashboard/dashboard.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();