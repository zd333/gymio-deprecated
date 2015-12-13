(function () {
    'use strict';

    var gymio = angular.module('gymio', [
        'ngMaterial',
        'ngMdIcons',
        'gymio.config',
        'gymio.routes',
        'gymio.services',
        'gymio.directives',
        'gymio.initialization',
        'gymio.root',
        'gymio.authentication',
        'gymio.mainMenu',
        'gymio.dashboard',
        'gymio.staffboard'
    ]);

    //services' container
    angular.module('gymio.services', []);

    //directives' container
    angular.module('gymio.directives', []);

    //add CSRF token settings to fit Django workflow
    gymio.run(run);
    run.$inject = ['$http', '$rootScope'];

    function run($http, $rootScope) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();