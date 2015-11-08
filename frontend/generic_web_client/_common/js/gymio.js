(function () {
    'use strict';

    var gymio = angular.module('gymio', [
        'gymio.config',
        'gymio.routes',
        'gymio.services',
        'gymio.authentication',
        'gymio.dashboard'
    ]);

    //common services
    angular.module('gymio.services', []);

    //add CSRF token settings to fit Django workflow
    gymio.run(run);
    run.$inject = ['$http', '$rootScope'];

    function run($http, $rootScope) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }
})();