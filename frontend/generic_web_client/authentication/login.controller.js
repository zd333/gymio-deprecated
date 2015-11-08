(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    function LoginController($location, $scope, Authentication) {
        var lc = this;

        lc.login = login;

        //we don't need to initialize controller if it is authenticated user
        //why are you going here, go to main view!
        if (Authentication.isAuthenticated()) {
            $location.path('/');
        }

        function login() {
            lc.loginErrorText = null;
            Authentication.login(lc.username, lc.password)
                .success(function(data, status, headers, config){
                    Authentication.setAuthenticatedUser(data);
                    $location.path('/dashboard');
                })
                .error(function (data, status, headers, config) {
                    lc.loginErrorText = 'Credentials are incorrect';
                });
        }
    }
})();