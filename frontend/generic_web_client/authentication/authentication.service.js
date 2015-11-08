(function () {
    'use strict';

    angular
        .module('gymio.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http', '$global'];

    function Authentication($cookies, $http, $global) {
        var Authentication = {
            register: register
        };

        return Authentication;

        function register(username, password, userFullName) {
            return $http.post($global.restUrl('users'), {
                username: username,
                password: password,
                user_full_name: userFullName
            })
        }
    }
})();