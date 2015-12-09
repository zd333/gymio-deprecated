(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', 'Authentication', '$translate', 'datavalidation', '$mdToast'];

    function RegisterController($location, Authentication, $translate, datavalidation, $mdToast) {
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
            //use buffer variables not to broke view after sanitizing
            var username, password, userFullName, userPhone, userBirthday;

            var v;//validation buffer

            v = datavalidation.loginValidation(rc.username);
            if (!v.passed) {
                $mdToast.showSimple(v.errorMsg);
                return;
            }
            username = v.processedField;

            v = datavalidation.passwordValidation(rc.password);
            if (!v.passed) {
                $mdToast.showSimple(v.errorMsg);
                return;
            }
            password = v.processedField;

            v = datavalidation.fullNameValidation(rc.userFullName);
            if (!v.passed) {
                $mdToast.showSimple(v.errorMsg);
                return;
            }
            userFullName = v.processedField;

            v = datavalidation.phoneValidation(rc.userPhone);
            if (!v.passed) {
                $mdToast.showSimple(v.errorMsg);
                return;
            }
            userPhone = v.processedField;

            v = datavalidation.birthDateValidation(rc.userBirthday);
            if (!v.passed) {
                $mdToast.showSimple(v.errorMsg);
                return;
            }
            userBirthday = v.processedField;

            Authentication.register(username, password, userFullName, userPhone, rc.userGender, userBirthday)
                .then(function (response) {
                    //auto login
                    Authentication.login(rc.username, rc.password)
                        .then(function (response) {
                            Authentication.setAuthenticatedUser(response.data);
                            $location.path('/dashboard/myprofile');
                        }, function (response) {
                            $location.path('/');
                        }
                    );
                }, function (response) {
                    $mdToast.showSimple($translate.instant('Something wrong with input data'));
                }
            );
        }
    }
})();