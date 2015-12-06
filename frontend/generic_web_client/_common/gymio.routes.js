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
            //TODO: add routes to all dashboard and staffboard modules
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();