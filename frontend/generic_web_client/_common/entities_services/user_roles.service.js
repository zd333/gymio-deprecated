;
(function() {
  'use strict';

  angular
    .module('gymio.services')
    .factory('userRoles', ['$http', '$translate', 'global', 'Authentication', function($http, $translate, global, Authentication) {

      var userRoles = {
        addUserRole: addUserRole,
        deleteUserRole: deleteUserRole
      };

      return userRoles;

      function addUserRole(userId, role) {
        return $http.post(global.restUrl('userroles', userId, role));
      }

      function deleteUserRole(userId, role) {
        return $http.delete(global.restUrl('userroles', userId, role));
      }

    }])
})();
