(function () {
    'use strict';

    angular
        .module('gymio.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', 'Authentication', '$translate', 'datavalidation'];

    function RegisterController($location, $scope, Authentication, $translate, datavalidation) {
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

            var v;//validation buffer

            v = datavalidation.loginValidation(rc.username);
            if (!v.passed) {
                rc.registerErrorText = v.errorMsg;
                return;
            }
            rc.username = v.processedField;

            v = datavalidation.passwordValidation(rc.password);
            if (!v.passed) {
                rc.registerErrorText = v.errorMsg;
                return;
            }
            rc.password = v.processedField;

            v = datavalidation.fullNameValidation(rc.userFullName);
            if (!v.passed) {
                rc.registerErrorText = v.errorMsg;
                return;
            }
            rc.userFullName = v.processedField;

            v = datavalidation.phoneValidation(rc.userPhone);
            if (!v.passed) {
                rc.registerErrorText = v.errorMsg;
                return;
            }
            rc.userPhone = v.processedField;

            v = datavalidation.birthDateValidation(rc.userBirthday);
            if (!v.passed) {
                rc.registerErrorText = v.errorMsg;
                return;
            }
            rc.userBirthday = v.processedField;

            Authentication.register(rc.username, rc.password, rc.userFullName, rc.userPhone, rc.userGender, rc.userBirthday)
                .then(function (response) {
                    //auto login
                    Authentication.login(rc.username, rc.password)
                        .then(function (response) {
                            Authentication.setAuthenticatedUser(response.data);
                            $location.search({dashboardsection: 'my_profile'}).path('/dashboard');
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