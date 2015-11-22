(function () {
    'use strict';

    var rts = angular.module('gymio.routes', ['ngRoute']);

    rts.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'mainview/mainview.html'
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'rc',
                templateUrl: 'authentication/register.html'
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'lc',
                templateUrl: 'authentication/login.html'
            })
            .when('/dashboard', {
                controller: 'DashboardController',
                controllerAs: 'dc',
                templateUrl: 'dashboard/dashboard.html'
            })
            .when('/staffboard', {
                controller: 'StaffboardController',
                controllerAs: 'sc',
                templateUrl: 'staffboard/staffboard.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();