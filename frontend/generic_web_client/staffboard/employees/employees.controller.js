;
(function() {
  'use strict';

  angular
    .module('gymio.staffboard.employees.controllers')
    .controller('EmployeesController', ['$translate', '$scope', 'Users', 'datavalidation', '$mdToast', 'global', function($translate, $scope, Users, datavalidation, $mdToast, global) {
      var ec = this;

      ec.userList = [{}]; //for now - list of all available staff users from backend WITHOUT PAGINATION
      ec.searchText = '';
      ec.selectedUser = null;
      ec.editUserModel = null;
      ec.narrowUserList = narrowUserList;
      ec.setEditUserModel = setEditUserModel;
      ec.save = save;

      //get all staff users
      Users.getUsers({
          is_staff: true
        })
        .then(function(response) {
          //success
          ec.userList = response.data;
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

          for (var i = 0; i < ec.userList.length; i++) {
            if ((ec.userList[i].username.toLowerCase().indexOf(t) > -1) ||
              (ec.userList[i].user_full_name.toLowerCase().indexOf(t) > -1) ||
              ((ec.userList[i].card_id) && (ec.userList[i].card_id.toLowerCase()
                .indexOf(t) > -1)) ||
              (ec.userList[i].id.toString().indexOf(t) > -1)) {
              res.push(ec.userList[i]);
            }
          }

          return res;
        }

        function setEditUserModel() {
          $scope.ec.selectedFile = null; //с помощью этого сбрасывается file input в директиве

          //копируем выбранного пользователя в отдельный экземпляр, чтобы привязанные к контролам свойства не затерлись в оригинальном массиве
          if (ec.selectedUser) {
            //обновляем пользователя в массиве пользователей (на случай если он был изменен)
            for (var i = 0; i < ec.userList.length; i++) {
              if (ec.userList[i].id === ec.selectedUser.id) {
                ec.userList[i] = ec.selectedUser;
              }
            }

            var bufObj = angular.copy(ec.selectedUser);
            //изменяем со строки на объект для контрола datepicker
            bufObj.user_birthday = new Date(bufObj.user_birthday);
            bufObj.newPassword = '';
            ec.editUserModel = bufObj;
          } else {
            ec.editUserModel = null;
          }
          $scope.ec.updateUserForm.$setPristine();
        }

        function save() {
          //use form data to update user (it is easiest way to upload files)
          //copy required by backend fields
          var uploadUserFormData = new FormData();;
          uploadUserFormData.append('id', ec.editUserModel.id);
          uploadUserFormData.append('username', ec.editUserModel.username);
          uploadUserFormData.append('is_active', ec.editUserModel.is_active);
          uploadUserFormData.append('user_gender', ec.editUserModel.user_gender);

          var v; //validation buffer
          //add fields to upload object only if they were changed (except required)

          v = datavalidation.fullNameValidation(ec.editUserModel.user_full_name);
          if (!v.passed) {
            $mdToast.showSimple(v.errorMsg);
            return;
          }
          ec.editUserModel.user_full_name = v.processedField;
          uploadUserFormData.append('user_full_name', ec.editUserModel.user_full_name);

          if (ec.updateUserForm.usercardId.$dirty) {
            uploadUserFormData.append('card_id', ec.editUserModel.card_id);
          }

          v = datavalidation.phoneValidation(ec.editUserModel.user_phone);
          if (!v.passed) {
            $mdToast.showSimple(v.errorMsg);
            return;
          }
          ec.editUserModel.user_phone = v.processedField;
          uploadUserFormData.append('user_phone', v.processedField);

          if (ec.updateUserForm.userEmail.$dirty) {
            //angularjs has native email validation support, so do not use datavalidation module
            if (!ec.updateUserForm.userEmail.$valid) {
              $mdToast.showSimple($translate.instant('Wrong Email'));
              return;
            }
            uploadUserFormData.append('email', ec.editUserModel.email);
          }

          v = datavalidation.birthDateValidation(ec.editUserModel.user_birthday);
          if (!v.passed) {
            $mdToast.showSimple(v.errorMsg);
            return;
          }
          ec.editUserModel.user_birthday = v.processedField;
          uploadUserFormData.append('user_birthday', global.stringifyDate(ec.editUserModel.user_birthday));

          if (ec.updateUserForm.userDescription.$dirty) {
            uploadUserFormData.append('user_description', ec.editUserModel.user_description);
          }

          if (ec.updateUserForm.userInternalNotes.$dirty) {
            uploadUserFormData.append('user_notes', ec.editUserModel.user_notes);
          }

          if (ec.editUserModel.newPassword.length > 0) {
            v = datavalidation.passwordValidation(ec.editUserModel.newPassword);
            if (!v.passed) {
              $mdToast.showSimple(v.errorMsg);
              return;
            }
            uploadUserFormData.append('password', v.processedField);
          }

          //TODO: check file size (такое же ограничение должно быть задано на вебсервере, пусть ограничение будет статическое 20мб для всего приложения, в последствии можно перейти к разным настройкам для разных тарифных планов и т.п.)
          if (ec.selectedFile) {
            //будем загружать основную фотку пользователя не напрямую, а через подтверждение, несколькими обращениями к бэкэнду
            uploadUserFormData.append('user_photo_not_approved', ec.selectedFile);
            var photoWasSent = true;
          }

          Users.updateUser(uploadUserFormData, ec.editUserModel.id)
            .then(function(response) {
              //если была загружена фотка - то нужно второе обращение к бэкэнду
              if (photoWasSent) {
                Users.approveUserPhoto(ec.editUserModel.id)
                  .then(function(response) {
                    //обновляем измененного пользователя в свойстве контроллера
                    ec.selectedUser = response.data;
                    setEditUserModel();
                    $mdToast.showSimple($translate.instant('Successfully saved'));
                  }, function(response) {
                    $mdToast.showSimple($translate.instant('Not saved'));
                  });
              } else {
                //обновляем измененного пользователя в свойстве контроллера
                ec.selectedUser = response.data;
                setEditUserModel();
                $mdToast.showSimple($translate.instant('Successfully saved'));
              }
            }, function(response) {
              $mdToast.showSimple($translate.instant('Not saved'));
            });
        }

    }]);
})();
