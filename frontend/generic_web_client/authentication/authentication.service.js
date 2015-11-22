(function () {
    'use strict';

    angular
        .module('gymio.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$global', '$rootScope'];

    function Authentication($cookies, $http, $global, $rootScope) {
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
            $rootScope.$broadcast('userWasAuthenticated');
            $cookies.put('authenticatedUser', JSON.stringify(user));
        }

        function getAuthenticatedUser() {
            var usr = $cookies.get('authenticatedUser');
            if (!usr) {
                return;
            }
            return JSON.parse(usr);
        }

        function isAuthenticated() {
            return !!$cookies.get('authenticatedUser');
        }

        function logout() {
            return $http.post($global.restUrl('logout'));
        }

        function unAuthenticate() {
            $rootScope.$broadcast('userWasUnauthenticated');
            $cookies.remove('authenticatedUser');
        }
    }
})();