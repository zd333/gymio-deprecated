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
        //TODO: add search logic
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
        $scope.muc.updateUserForm.$setPristine();

        //копируем выбранного пользователя в отдельный экземпляр, чтобы привязанные к контролам свойства не затерлись в оригинальном массиве
        if (muc.selectedUser) {
          muc.editUserModel = {};
          for (var k in muc.selectedUser) muc.editUserModel[k] = muc.selectedUser[k];

          //add Date property for datepicker control
          muc.editUserModel.userBirthdayDate = new Date(muc.editUserModel.user_birthday);
        } else {
          muc.editUserModel = null;
        }
      }

      function save() {
        //alert(JSON.stringify(muc.editUserModel));
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

        v = datavalidation.birthDateValidation(muc.editUserModel.userBirthdayDate);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        muc.editUserModel.userBirthdayDate = v.processedField;
        uploadUserFormData.append('user_birthday', global.stringifyDate(muc.editUserModel.userBirthdayDate));

        if (muc.updateUserForm.userDescription.$dirty) {
          //TODO: разобраться с sanitize - если его применить здесь - то он кириллицу превратит в escape коды
          //uploadUser.user_description = $sanitize(mpc.user.user_description);
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

        //TODO: добавить логику фото

        Authentication.updateUser(uploadUserFormData, muc.editUserModel.id)
          .then(function(response) {
            //обновляем измененного пользователя в свойсьве контроллера
            //FIXME: https://bitbucket.org/zd333/gymio/issues/1/autocomplete
            for (var i = 0; i < muc.userList.length; i++) {
              if (muc.userList[i].id == muc.editUserModel.id) {
                muc.userList[i] = muc.editUserModel;
                break;
              }
            }
            $mdToast.showSimple($translate.instant('Successfully saved'));
          }, function(response) {
            $mdToast.showSimple($translate.instant('Not saved'));
          });
      }
    }
  })();

}
