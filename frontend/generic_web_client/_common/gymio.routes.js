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
            //TODO: in every route, which can be hided by root controller, need to check if it is not hided (backend parameters are already here)
            //probably can use resolve http://code.ciphertrick.com/2014/12/14/check-condition-before-loading-route-in-angular-js/
            //or add all this parameters dynamically after backend data are loaded and route section can be shown
            .when('/dashboard/overview', {
                //TODO: specify controller
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/dashboard_overview/dashboard_overview.html',
                reloadOnSearch: false
            })
            .when('/staffboard/overview', {
                //TODO: specify controller
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/staffboard_overview/staffboard_overview.html',
                reloadOnSearch: false
            })
            .when('/dashboard/myprofile', {
                controller: 'MyProfileController',
                controllerAs: 'mpc',
                templateUrl: 'dashboard/my_profile/my_profile.html',
                reloadOnSearch: false
            })
            //TODO: add routes to all dashboard and staffboard modules
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();