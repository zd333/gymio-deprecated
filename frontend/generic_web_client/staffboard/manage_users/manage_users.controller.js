{
  (function() {
    'use strict';

    angular
      .module('gymio.staffboard.manage_users.controllers')
      .controller('ManageUsersController', ManageUsersController);

    ManageUsersController.$inject = [
      '$translate',
      'Authentication',
      '$mdToast',
      '$scope',
      'global',
      'datavalidation'
    ];

    function ManageUsersController($translate, Authentication, $mdToast, $scope, global, datavalidation) {
      var muc = this;

      muc.userList = [{}]; //for now - list of all available users from backend WITHOUT PAGINATION
      muc.searchText = '';
      muc.selectedUser = null;
      muc.editUserModel = null;
      muc.narrowUserList = narrowUserList;
      muc.setEditUserModel = setEditUserModel;
      muc.save = save;
      muc.approveUserPhoto = approveUserPhoto;
      muc.rejectUserPhoto = rejectUserPhoto;

      //get all users
      Authentication.getUsers()
        .then(function(response) {
          //success
          muc.userList = response.data;
        }, function(response) {
          //error
          $mdToast.showSimple($translate.instant('Can not get user list'));
        });

      function narrowUserList(text) {
        //создаем отдельный массив пользователей, у которых есть совпадение текста по одному из критериев
        //username/user_full_name/id/card_id
        //такой подход не должен принести проблем производительности, т.к. это всего лишь указатели
        //по крайней мере с вменяемым количеством пользователей в списке
        var res = [];
        var t = text.toLowerCase();

        for (var i = 0; i < muc.userList.length; i++) {
          if ((muc.userList[i].username.toLowerCase().indexOf(t) > -1) ||
            (muc.userList[i].user_full_name.toLowerCase().indexOf(t) > -1) ||
            ((muc.userList[i].card_id) && (muc.userList[i].card_id.toLowerCase()
              .indexOf(t) > -1)) ||
            (muc.userList[i].id.toString().indexOf(t) > -1)) {
            res.push(muc.userList[i]);
          }
        }

        return res;
      }

      function setEditUserModel() {
        $scope.muc.selectedFile = null;//с помощью этого сбрасывается file input в директиве

        //копируем выбранного пользователя в отдельный экземпляр, чтобы привязанные к контролам свойства не затерлись в оригинальном массиве
        if (muc.selectedUser) {
          //обновляем пользователя в массиве пользователей (на случай если он был изменен)
          for (var i = 0; i < muc.userList.length; i++) {
            if (muc.userList[i].id === muc.selectedUser.id) {
              muc.userList[i] = muc.selectedUser;
            }
          }

          var bufObj = angular.copy(muc.selectedUser);
          //изменяем со строки на объект для контрола datepicker
          bufObj.user_birthday = new Date(bufObj.user_birthday);
          bufObj.newPassword = '';
          muc.editUserModel = bufObj;
        } else {
          muc.editUserModel = null;
        }
        $scope.muc.updateUserForm.$setPristine();
      }

      function save() {
        //use form data to update user (it is easiest way to upload files)
        //copy required by backend fields
        var uploadUserFormData = new FormData();;
        uploadUserFormData.append('id', muc.editUserModel.id);
        uploadUserFormData.append('username', muc.editUserModel.username);
        uploadUserFormData.append('is_active', muc.editUserModel.is_active);
        uploadUserFormData.append('user_gender', muc.editUserModel.user_gender);

        var v; //validation buffer
        //add fields to upload object only if they were changed (except required)

        v = datavalidation.fullNameValidation(muc.editUserModel.user_full_name);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        muc.editUserModel.user_full_name = v.processedField;
        uploadUserFormData.append('user_full_name', muc.editUserModel.user_full_name);

        if (muc.updateUserForm.usercardId.$dirty) {
          uploadUserFormData.append('card_id', muc.editUserModel.card_id);
        }

        v = datavalidation.phoneValidation(muc.editUserModel.user_phone);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        muc.editUserModel.user_phone = v.processedField;
        uploadUserFormData.append('user_phone', v.processedField);

        if (muc.updateUserForm.userEmail.$dirty) {
          //angularjs has native email validation support, so do not use datavalidation module
          if (!muc.updateUserForm.userEmail.$valid) {
            $mdToast.showSimple($translate.instant('Wrong Email'));
            return;
          }
          uploadUserFormData.append('email', muc.editUserModel.email);
        }

        v = datavalidation.birthDateValidation(muc.editUserModel.user_birthday);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        muc.editUserModel.user_birthday = v.processedField;
        uploadUserFormData.append('user_birthday', global.stringifyDate(muc.editUserModel.user_birthday));

        if (muc.updateUserForm.userDescription.$dirty) {
          uploadUserFormData.append('user_description', muc.editUserModel.user_description);
        }

        if (muc.updateUserForm.userInternalNotes.$dirty) {
          uploadUserFormData.append('user_notes', muc.editUserModel.user_notes);
        }

        if (muc.editUserModel.newPassword.length > 0) {
          v = datavalidation.passwordValidation(muc.editUserModel.newPassword);
          if (!v.passed) {
            $mdToast.showSimple(v.errorMsg);
            return;
          }
          uploadUserFormData.append('password', v.processedField);
        }

        //TODO: check file size (такое же ограничение должно быть задано на вебсервере, пусть ограничение будет статическое 20мб для всего приложения, в последствии можно перейти к разным настройкам для разных тарифных планов и т.п.)
        if (muc.selectedFile) {
          //будем загружать основную фотку пользователя не напрямую, а через подтверждение, несколькими обращениями к бэкэнду
          uploadUserFormData.append('user_photo_not_approved', muc.selectedFile);
          var photoWasSent = true;
        }

        Authentication.updateUser(uploadUserFormData, muc.editUserModel.id)
          .then(function(response) {
            //если была загружена фотка - то нужно второе обращение к бэкэнду
            if (photoWasSent) {
              Authentication.approveUserPhoto(muc.editUserModel.id)
                .then(function(response) {
                  //обновляем измененного пользователя в свойстве контроллера
                  muc.selectedUser = response.data;
                  setEditUserModel();
                  $mdToast.showSimple($translate.instant('Successfully saved'));
                }, function(response) {
                  $mdToast.showSimple($translate.instant('Not saved'));
                });
            } else {
              //обновляем измененного пользователя в свойстве контроллера
              muc.selectedUser = response.data;
              setEditUserModel();
              $mdToast.showSimple($translate.instant('Successfully saved'));
            }
          }, function(response) {
            $mdToast.showSimple($translate.instant('Not saved'));
          });
      }

      function approveUserPhoto() {
        Authentication.approveUserPhoto(muc.editUserModel.id)
          .then(function(response) {
            muc.selectedUser = response.data;
            setEditUserModel();
            $mdToast.showSimple($translate.instant('Photo was approved'));
          }, function(response) {
            $mdToast.showSimple($translate.instant('Not saved'));
          });
      }

      function rejectUserPhoto() {
        Authentication.rejectUserPhoto(muc.editUserModel.id)
          .then(function(response) {
            muc.selectedUser = response.data;
            setEditUserModel();
            $mdToast.showSimple($translate.instant('Photo was rejected'));
          }, function(response) {
            $mdToast.showSimple($translate.instant('Not saved'));
          });
      }

    }
  })();
}
