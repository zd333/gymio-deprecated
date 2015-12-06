//disable # in the routes
(function () {
    'use strict';

    var cfg = angular.module('gymio.config', ['pascalprecht.translate', 'ngCookies', 'ngSanitize']);

    cfg.config(['$locationProvider', '$translateProvider', '$mdThemingProvider', function ($locationProvider, $translateProvider, $mdThemingProvider) {
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

        //DEPLOY: customize site colors here
        //material design theme customization
        $mdThemingProvider.theme('default')
        //.dark()//TODO: check how it impacts on UI
            .primaryPalette('blue')
            .accentPalette('yellow')
            .warnPalette('red')
            .backgroundPalette('grey');
    }]);
})();