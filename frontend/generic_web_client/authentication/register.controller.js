(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication', '$translate'];

    function RegisterController($location, $scope, Authentication, $translate) {
        var rc = this;

        rc.register = register;
        rc.userBirthday = new Date(1990, 0, 1);
        rc.userGender=false

        //we don't need to initialize controller if it is authenticated user
        //why are you going here, go to main view!
        if (Authentication.isAuthenticated()) {
            $location.path('/');
        }

        function register() {
            rc.registerErrorText = null;
            Authentication.register(rc.username, rc.password, rc.userFullName, rc.userPhone, rc.userGender, rc.userBirthday)
                .success(function (data, status, headers, config) {
                    //auto login
                    Authentication.login(rc.username, rc.password)
                        .success(function(data, status, headers, config){
                            Authentication.setAuthenticatedUser(data);
                            $location.path('/dashboard');
                        })
                        .error(function (data, status, headers, config) {
                            $location.path('/');
                        });
                })
                .error(function (data, status, headers, config) {
                    //do not check what error was returned by backend
                    //TODO: perform input data validation here
                    rc.registerErrorText = $translate.instant('Input data can not be accepted');
                });
        }
    }
})();