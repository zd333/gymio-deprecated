(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication', '$translate'];

    function LoginController($location, $scope, Authentication, $translate) {
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
            Authentication.login(lc.username, lc.password)
                .then(function (response) {
                    Authentication.setAuthenticatedUser(response.data, lc.rememberMe);
                    $location.path('/dashboard');
                }, function (response) {
                    lc.loginErrorText = $translate.instant('Wrong credentials');
                });
        }
    }
})();