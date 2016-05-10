;
(function() {
  'use strict';

  angular
    .module('gymio.services')
    .factory('Users', ['$http', 'global', function($http, global) {
      var Users = {
        updateUser: updateUser,
        approveUserPhoto: approveUserPhoto,
        rejectUserPhoto: rejectUserPhoto,
        getUsers: getUsers,
        getUser: getUser
      };

      return Users;

      function updateUser(userFormData, userId) {
        return $http.post(global.restUrl('users', userId), userFormData, {
          headers: {
            'Content-Type': undefined
          }, //set undefined, browser will replace it with multipart\form and set boundaries
          transformRequest: angular.identity //to avoid JSON serialization
        });
      }

      function approveUserPhoto(userId) {
        return $http.post(global.restUrl('approveuserphoto', userId));
      }

      function rejectUserPhoto(userId) {
        return $http.post(global.restUrl('rejectuserphoto', userId));
      }

      function getUsers(params) {
        if (params) {
          return $http.get(global.restUrl('users'), {
            params: params
          });
        } else {
          return $http.get(global.restUrl('users'));
        }
      }

      function getUser(userId) {
        return $http.get(global.restUrl('users', userId));
      }
    }])
})();
