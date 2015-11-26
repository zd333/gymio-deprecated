(function () {
    'use strict';

    var rts = angular.module('gymio.routes', ['ngRoute']);

    rts.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'mainview/mainview.html',
                reloadOnSearch: false
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'rc',
                templateUrl: 'authentication/register.html',
                reloadOnSearch: false
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'lc',
                templateUrl: 'authentication/login.html',
                reloadOnSearch: false
            })
            .when('/dashboard', {
                controller: 'DashboardController',
                controllerAs: 'dc',
                templateUrl: 'dashboard/dashboard.html',
                reloadOnSearch: false
            })
            .when('/staffboard', {
                controller: 'StaffboardController',
                controllerAs: 'sc',
                templateUrl: 'staffboard/staffboard.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();