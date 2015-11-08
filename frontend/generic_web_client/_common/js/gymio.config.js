//disable # in the routes
(function () {
    'use strict';

    var cfg = angular.module('gymio.config', []);

    cfg.config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
        //TODO: check what is this and enable if needed
        //$locationProvider.hashPrefix('!');
    }]);
})();