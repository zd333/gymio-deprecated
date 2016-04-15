;(function () {
    'use strict';

    var gymio = angular.module('gymio', [
        'ngMaterial',
        'ngMdIcons',
        'gymio.config',
        'gymio.routes',
        'gymio.services',
        'gymio.directives',
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
    run.$inject = ['$http', '$rootScope', 'Authentication', '$location'];

    function run($http, $rootScope, Authentication, $location) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.$on('$routeChangeStart', function (event) {
          var path = $location.path();
          if ((path != '/') && (path != '/register') && (path != '/login') && (!Authentication.isAuthenticated())) {
            event.preventDefault();
            $location.path('/login');
          }
        });
    }
})();
