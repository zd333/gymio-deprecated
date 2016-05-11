;
(function() {
  'use strict';

  angular
    .module('gymio.staffboard.employee_roles.controllers')
    .controller('EmployeeRolesController', ['$translate', 'Users', 'userRoles', '$mdToast', '$q', 'authorisation', function($translate, Users, userRoles, $mdToast, $q, authorisation) {
      var erc = this;

      erc.userList = [{}]; //for now - list of all available staff users from backend WITHOUT PAGINATION
      erc.searchText = '';
      erc.selectedUser = null;
      erc.userRolesEditModel = []; //this is a model of input in form (not to affect original model till not saved)
      erc.allPossibleRoles = authorisation.getPossibleRoles();
      erc.allowedRoles = authorisation.getRolesAllowedToBeSetByLoggedInUser();

      erc.rolesListString = '';
      for (var i = 0; i < erc.allowedRoles.length; i++) {
        erc.rolesListString += erc.allowedRoles[i].code + ',';
      }
      if (erc.rolesListString) erc.rolesListString = erc.rolesListString.slice(0, -1);

      erc.narrowUserList = narrowUserList;
      erc.setEditRolesModel = setEditRolesModel;
      erc.narrowRolesList = narrowRolesList;
      erc.save = save;

      reloadUsersFromBackend();

      function narrowUserList(text) {
        //создаем отдельный массив пользователей, у которых есть совпадение текста по одному из критериев
        //username/user_full_name/id/card_id
        //такой подход не должен принести проблем производительности, т.к. это всего лишь указатели
        //по крайней мере с вменяемым количеством пользователей в списке
        var res = [];
        var t = text.toLowerCase();

        for (var i = 0; i < erc.userList.length; i++) {
          if ((erc.userList[i].username.toLowerCase().indexOf(t) > -1) ||
            (erc.userList[i].user_full_name.toLowerCase().indexOf(t) > -1) ||
            ((erc.userList[i].card_id) && (erc.userList[i].card_id.toLowerCase()
              .indexOf(t) > -1)) ||
            (erc.userList[i].id.toString().indexOf(t) > -1)) {
            res.push(erc.userList[i]);
          }
        }

        return res;
      }

      function setEditRolesModel() {
        erc.updateUserRolesForm.$setPristine();

        //update user in list (in case if it was changed)
        if (erc.selectedUser) {
          for (var i = 0; i < erc.userList.length; i++) {
            if (erc.userList[i].id === erc.selectedUser.id) {
              erc.userList[i] = erc.selectedUser;
            }
          }
        }

        erc.userRolesEditModel = [];
        if (erc.selectedUser && erc.selectedUser.userRoles) {
          for (var i = 0; i < erc.selectedUser.userRoles.length; i++) {
            for (var j = 0; j < erc.allPossibleRoles.length; j++) {
              if (erc.selectedUser.userRoles[i] === erc.allPossibleRoles[j].code) {
                erc.userRolesEditModel.push(erc.allPossibleRoles[j]);
              }
            }
          }
        }
      }

      function narrowRolesList(text) {
        var narrowedRoleKeys = [];
        var t = text.toUpperCase();

        for (var i = 0; i < erc.allowedRoles.length; i++) {
          if ((erc.allowedRoles[i].code.indexOf(t) > -1) || (erc.allowedRoles[i].text.toUpperCase().indexOf(t) > -1)) {
            //check if user doesn't have matching role yet
            var found = false;
            for (var j = 0; j < erc.userRolesEditModel.length; j++) {
              if (erc.userRolesEditModel[j].code === erc.allowedRoles[i].code) {
                found = true;
                break;
              }
            }
            if (!found) {
              narrowedRoleKeys.push(erc.allowedRoles[i]);
            }
          }
        }
        return narrowedRoleKeys;
      }

      function save() {
        var curRoles = erc.selectedUser.userRoles;
        var newRoles = erc.userRolesEditModel;

        var resultMessage = '';
        var backendRequestPromises = [];

        //find deleted roles and perform backend delete requests
        for (var i = 0; i < curRoles.length; i++) {
          var found = false;
          for (var j = 0; j < newRoles.length; j++) {
            if (curRoles[i] === newRoles[j].code) {
              found = true;
              break;
            }
          }
          if (!found) {
            //need to delete curRoles[i]
            backendRequestPromises.push(userRoles.deleteUserRole(erc.selectedUser.id, curRoles[i])
              .catch(function(response) {
                var m = response.statusText;
                if ((response.data) && (response.data.detail)) m += '(' + response.data.detail + ')';
                m += '\n';
                resultMessage += m;
              }));
          }
        }

        //find added roless and perform backend add requests
        for (var i = 0; i < newRoles.length; i++) {
          var found = false;
          for (var j = 0; j < curRoles.length; j++) {
            if (newRoles[i].code === curRoles[j]) {
              found = true;
              break;
            }
          }
          if (!found) {
            //need to add newRoles[i].code
            backendRequestPromises.push(userRoles.addUserRole(erc.selectedUser.id, newRoles[i].code)
              .catch(function(response) {
                var m = response.statusText;
                if ((response.data) && (response.data.detail)) m += '(' + response.data.detail + ')';
                m += '\n';
                resultMessage += m;
              }));
          }
        }

        $q.all(backendRequestPromises).then(function() {
          //backendRequestPromises - are not original backend promises
          //these are the promises they return
          //that's why all backendRequestPromises always resolve,
          //so $q.all is never rejected
          Users.getUser(erc.selectedUser.id).then(function(response) {
            erc.selectedUser = response.data;
            setEditRolesModel();
          });//TODO: add code for the case when all was ok, but this last user request failed

          if (resultMessage) {
            //some of requests failed
            //TODO: add details to message
            $mdToast.showSimple($translate.instant('Not saved'));
          } else {
            $mdToast.showSimple($translate.instant('Successfully saved'));
          }
        });
      }

      function reloadUsersFromBackend() {
        //get all staff users
        Users.getUsers({
            is_staff: true
          })
          .then(function(response) {
            //success
            erc.userList = response.data;
          }, function(response) {
            //error
            $mdToast.showSimple($translate.instant('Can not get user list'));
          });
      }

    }]);
})();
