(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'Authentication', '$translate', '$sanitize'];

    function LoginController($location, Authentication, $translate, $sanitize) {
        var lc = this;

        lc.rememberMe = true;
        lc.login = login;

        //we don't need to initialize controller if it is authenticated user
        //why are you going here, go to main view!
        if (Authentication.isAuthenticated()) {
            $location.path('/');
        }

        function login() {
            lc.loginErrorText = null;
            Authentication.login($sanitize(lc.username), $sanitize(lc.password))
                .then(function (response) {
                    Authentication.setAuthenticatedUser(response.data, lc.rememberMe);
                    if ((!Authentication.getAuthenticatedUser().is_staff) || (!Authentication.getAuthenticatedUser().is_active)) {
                        $location.path('/dashboard');
                    }
                    else {
                        $location.path('/staffboard');
                    }
                }, function (response) {
                    lc.loginErrorText = $translate.instant('Wrong credentials');
                });
        }
    }
})();