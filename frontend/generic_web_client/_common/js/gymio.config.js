//disable # in the routes
(function () {
    'use strict';

    var cfg = angular.module('gymio.config', []);

    cfg.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
        //seems like this helps to work with old browsers which don't support html5 routing
        $locationProvider.hashPrefix('!');
    }]);
})();