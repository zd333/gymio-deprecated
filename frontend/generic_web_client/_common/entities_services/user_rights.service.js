;
(function() {
  'use strict';

  angular
    .module('gymio.services')
    .factory('UserRights', ['$http', '$translate', 'global', 'Authentication', function($http, $translate, global, Authentication) {

      var UserRights = {
        addUserRight: addUserRight,
        deleteUserRight: deleteUserRight
      };

      return UserRights;

      function addUserRight(userId, right) {
        return $http.post(global.restUrl('userrights', userId, right));
      }

      function deleteUserRight(userId, right) {
        return $http.delete(global.restUrl('userrights', userId, right));
      }

    }])
})();
