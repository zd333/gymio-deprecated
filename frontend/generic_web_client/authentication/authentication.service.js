(function () {
    'use strict';

    angular
        .module('gymio.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$global'];

    function Authentication($cookies, $http, $global) {
        var Authentication = {
            register: register,
            login: login,
            setAuthenticatedUser: setAuthenticatedUser,
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            logout: logout,
            unAuthenticate: unAuthenticate
        };

        return Authentication;

        //TODO: refactor this - replace 6 input parameters with 1 object
        function register(username, password, userFullName, userPhone, userGender, userBirthday) {
            return $http.post($global.restUrl('users'), {
                username: username,
                password: password,
                user_full_name: userFullName,
                user_phone: userPhone,
                user_gender: userGender,
                user_birthday: $global.stringifyDate(userBirthday)
            })
        }

        function login(username, password) {
            return $http.post($global.restUrl('login'), {
                username: username,
                password: password
            });
        }

        function setAuthenticatedUser(user) {
            $cookies.authenticatedUser = JSON.stringify(user);
        }

        function getAuthenticatedUser() {
            if (!$cookies.authenticatedUser) {
                return;
            }
            return JSON.parse($cookies.authenticatedUser);
        }

        function isAuthenticated() {
            return !!$cookies.authenticatedUser;
        }

        function logout(){
            return $http.post($global.restUrl('logout'));
        }

        function unAuthenticate() {
            delete $cookies.authenticatedUser;
        }
    }
})();