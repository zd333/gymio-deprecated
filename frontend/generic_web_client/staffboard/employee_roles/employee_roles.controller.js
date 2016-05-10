;
(function() {
  'use strict';

  angular
    .module('gymio.staffboard.employee_roles.controllers')
    .controller('EmployeeRolesController', ['$translate', 'Users', 'UserRights', '$mdToast', '$q', 'authorisation', function($translate, Users, UserRights, $mdToast, $q, authorisation) {
      var erc = this;

      erc.userList = [{}]; //for now - list of all available staff users from backend WITHOUT PAGINATION
      erc.searchText = '';
      erc.selectedUser = null;
      erc.userRightsEditModel = []; //this is a model of input in form (not to affect original model till not saved)
      erc.allPossibleRights = authorisation.getPossibleRights();
      erc.allowedRights = authorisation.getRightsAllowedToBeSetByLoggedInUser();

      erc.rightsListString = '';
      for (var i = 0; i < erc.allowedRights.length; i++) {
        erc.rightsListString += erc.allowedRights[i].code + ',';
      }
      if (erc.rightsListString) erc.rightsListString = erc.rightsListString.slice(0, -1);

      erc.narrowUserList = narrowUserList;
      erc.setEditRightsModel = setEditRightsModel;
      erc.narrowRightsList = narrowRightsList;
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

      function setEditRightsModel() {
        erc.updateUserRightsForm.$setPristine();

        //update user in list (in case if it was changed)
        if (erc.selectedUser) {
          for (var i = 0; i < erc.userList.length; i++) {
            if (erc.userList[i].id === erc.selectedUser.id) {
              erc.userList[i] = erc.selectedUser;
            }
          }
        }

        erc.userRightsEditModel = [];
        if (erc.selectedUser && erc.selectedUser.userRights) {
          for (var i = 0; i < erc.selectedUser.userRights.length; i++) {
            for (var j = 0; j < erc.allPossibleRights.length; j++) {
              if (erc.selectedUser.userRights[i] === erc.allPossibleRights[j].code) {
                erc.userRightsEditModel.push(erc.allPossibleRights[j]);
              }
            }
          }
        }
      }

      function narrowRightsList(text) {
        var narrowedRightKeys = [];
        var t = text.toUpperCase();

        for (var i = 0; i < erc.allowedRights.length; i++) {
          if ((erc.allowedRights[i].code.indexOf(t) > -1) || (erc.allowedRights[i].text.toUpperCase().indexOf(t) > -1)) {
            //check if user doesn't have matching right yet
            var found = false;
            for (var j = 0; j < erc.userRightsEditModel.length; j++) {
              if (erc.userRightsEditModel[j].code === erc.allowedRights[i].code) {
                found = true;
                break;
              }
            }
            if (!found) {
              narrowedRightKeys.push(erc.allowedRights[i]);
            }
          }
        }
        return narrowedRightKeys;
      }

      function save() {
        var curRights = erc.selectedUser.userRights;
        var newRights = erc.userRightsEditModel;

        var resultMessage = '';
        var backendRequestPromises = [];

        //find deleted rights and perform backend delete requests
        for (var i = 0; i < curRights.length; i++) {
          var found = false;
          for (var j = 0; j < newRights.length; j++) {
            if (curRights[i] === newRights[j].code) {
              found = true;
              break;
            }
          }
          if (!found) {
            //need to delete curRights[i]
            backendRequestPromises.push(UserRights.deleteUserRight(erc.selectedUser.id, curRights[i])
              .catch(function(response) {
                var m = response.statusText;
                if ((response.data) && (response.data.detail)) m += '(' + response.data.detail + ')';
                m += '\n';
                resultMessage += m;
              }));
          }
        }

        //find added rights and perform backend add requests
        for (var i = 0; i < newRights.length; i++) {
          var found = false;
          for (var j = 0; j < curRights.length; j++) {
            if (newRights[i].code === curRights[j]) {
              found = true;
              break;
            }
          }
          if (!found) {
            //need to add newRights[i].code
            backendRequestPromises.push(UserRights.addUserRight(erc.selectedUser.id, newRights[i].code)
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
            setEditRightsModel();
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
