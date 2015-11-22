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
        rc.userGender = false;

        //we don't need to initialize controller if it is authenticated user
        //why are you going here, go to main view!
        if (Authentication.isAuthenticated()) {
            $location.path('/');
        }

        function register() {
            rc.registerErrorText = null;

            //register data validation
            if (rc.username.length < 3) {
                rc.registerErrorText = $translate.instant('Login too short');
                return;
            }

            if (rc.password.length < 3) {
                rc.registerErrorText = $translate.instant('Password too short');
                return;
            }

            var l = rc.userFullName.split(' ').length;
            if ((l < 2) || (l > 3) || (rc.userFullName.match(/\d/))) {
                rc.registerErrorText = $translate.instant('Wrong Full Name');
                return;
            }

            var p = rc.userPhone;
            p = p.replace('+', '').replace(' ', '').replace('-', '');

            if ((!p.match(/^\d+$/)) || (p.length > 12) || (p.length < 10)) {
                rc.registerErrorText = $translate.instant('Wrong phone');
                return;
            }
            rc.userPhone = p.slice(p.length - 10);

            var y = rc.userBirthday.getFullYear();
            var now = (new Date()).getFullYear();
            if ((y < 1930) || ((now - y) < 3)) {
                rc.registerErrorText = $translate.instant('Wrong age');
                return;
            }

            Authentication.register(rc.username, rc.password, rc.userFullName, rc.userPhone, rc.userGender, rc.userBirthday)
                .then(function (response) {
                    //auto login
                    Authentication.login(rc.username, rc.password)
                        .then(function (response) {
                            Authentication.setAuthenticatedUser(response.data);
                            //TODO: redirect to update user profile here
                            $location.path('/dashboard');
                        }, function (response) {
                            $location.path('/');
                        }
                    );
                }, function (response) {
                    rc.registerErrorText = $translate.instant('Something wrong with input data');
                }
            );
        }
    }
})();