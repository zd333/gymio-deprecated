(function () {
    'use strict';

    angular
        .module('gymio.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', 'global', '$rootScope', '$translate'];

    function Authentication($cookies, $http, global, $rootScope, $translate) {
        var authenticatedUser = undefined;//will store logged in user's profile

        var Authentication = {
            register: register,
            login: login,
            setAuthenticatedUser: setAuthenticatedUser,
            getAuthenticatedUser: getAuthenticatedUser,
            isAuthenticated: isAuthenticated,
            logout: logout,
            unAuthenticate: unAuthenticate,
            updateUser: updateUser
        };

        return Authentication;

        function register(username, password, userFullName, userPhone, userGender, userBirthday) {
            return $http.post(global.restUrl('users'), {
                username: username,
                password: password,
                user_full_name: userFullName,
                user_phone: userPhone,
                user_gender: userGender,
                user_birthday: global.stringifyDate(userBirthday)
            })
        }

        function updateUser(userFormData, userId) {
            return $http.post(global.restUrl('users', userId), userFormData, {                
                headers: {'Content-Type': undefined},//set undefined, browser will replace it with multipart\form and set boundaries
                transformRequest: angular.identity//to avoid JSON serialization
            });
        }

        function login(username, password) {
            return $http.post(global.restUrl('login'), {
                username: username,
                password: password
            });
        }

        function setAuthenticatedUser(user, remeber) {
            authenticatedUser = user;
            if (remeber || $cookies.get('authenticatedUser')) $cookies.put('authenticatedUser', JSON.stringify(user));

            //date is coming and stored in cookies in string YYYY-MM-DD format
            authenticatedUser.user_birthday = global.datifyString(authenticatedUser.user_birthday);
            authenticatedUser.date_joined = global.datifyString(authenticatedUser.date_joined);

            $rootScope.$broadcast('userWasAuthenticated');
        }

        function getAuthenticatedUser() {
            if (!authenticatedUser) {
                var cu = $cookies.get('authenticatedUser');
                if (cu){
                    authenticatedUser = JSON.parse(cu);
                    //date is coming and stored in cookies in string YYYY-MM-DD format
                    authenticatedUser.user_birthday = global.datifyString(authenticatedUser.user_birthday);
                    authenticatedUser.date_joined = global.datifyString(authenticatedUser.date_joined);
                }
            }

            return authenticatedUser;
        }

        function isAuthenticated() {
            return !!getAuthenticatedUser();
        }

        function logout() {
            return $http.post(global.restUrl('logout'));
        }

        function unAuthenticate() {
            authenticatedUser = undefined;
            $cookies.remove('authenticatedUser');

            $rootScope.$broadcast('userWasUnauthenticated');
        }
    }
})();