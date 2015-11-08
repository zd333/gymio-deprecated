(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication'];

    function RegisterController($location, $scope, Authentication) {
        var rc = this;

        rc.register = register;

        function register() {
            rc.registerErrorText = '';

            Authentication.register(rc.username, rc.password, rc.userFullName)
                .success(function (data, status, headers, config) {
                    //TODO: implement automatic login on backend, redirect to dashboard from here
                    $location.path('/dashboard');
                })
                .error(function (data, status, headers, config) {
                    //do not check what error was returned by backend
                    //TODO: perform validation here
                    rc.registerErrorText = 'Please check input data';
                });
        }
    }
})();