//disable # in the routes
(function () {
    'use strict';

    var cfg = angular.module('gymio.config', ['pascalprecht.translate','ngCookies', 'ngSanitize']);

    cfg.config(['$locationProvider', '$translateProvider', function ($locationProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        //seems like this helps to work with old browsers which don't support html5 routing
        $locationProvider.hashPrefix('!');

        //translations
        $translateProvider.useStaticFilesLoader({
            prefix: '_common/translations/',
            suffix: '.json'
        });
        $translateProvider.useCookieStorage();
        $translateProvider.useSanitizeValueStrategy('escape');
    }]);
})();