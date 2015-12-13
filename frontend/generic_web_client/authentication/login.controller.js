(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'Authentication', '$translate', '$sanitize', '$mdToast'];

    function LoginController($location, Authentication, $translate, $sanitize, $mdToast) {
        var lc = this;

        lc.rememberMe = true;
        lc.login = login;

        //we don't need to initialize controller if it is authenticated user
        //why are you going here, go to main view!
        if (Authentication.isAuthenticated()) {
            $location.path('/');
        }

        function login() {
            Authentication.login($sanitize(lc.username), $sanitize(lc.password))
                .then(function (response) {
                    Authentication.setAuthenticatedUser(response.data, lc.rememberMe);
                    if ((!Authentication.getAuthenticatedUser().is_staff) || (!Authentication.getAuthenticatedUser().is_active)) {
                        $location.path('/dashboard/staffboard_overview');
                    }
                    else {
                        $location.path('/staffboard/staffboard_overview');
                    }
                }, function (response) {
                    $mdToast.showSimple($translate.instant('Wrong credentials'));
                });
        }
    }
})();