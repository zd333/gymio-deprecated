(function() {
  'use strict';

  angular
    .module('gymio.dashboard.my_profile.controllers')
    .controller('MyProfileController', MyProfileController);

  MyProfileController.$inject = ['Authentication', 'datavalidation', '$translate', '$sanitize', 'global', '$mdToast', '$location'];

  function MyProfileController(Authentication, datavalidation, $translate, $sanitize, global, $mdToast, $location) {
    var mpc = this;

    mpc.save = save;

    mpc.newPassword = '';

    //do not assign user object directly to avoid changing by ref
    mpc.user = {};
    var usr = Authentication.getAuthenticatedUser();
    for (var k in usr) mpc.user[k] = usr[k];

    if (!mpc.user.is_active) {
      $mdToast.showSimple($translate.instant('User inactive message'));
    }

    //if no approved photo - replace it with placeholder on view
    if (!mpc.user.user_photo) mpc.user.user_photo = '_common/img/profile_placeholder.png';

    function save() {
      //use form data to update user (it is easiest way to upload files)
      //copy required by backend fields
      var uploadUserFormData = new FormData();;
      uploadUserFormData.append('id', Authentication.getAuthenticatedUser().id);
      uploadUserFormData.append('username', Authentication.getAuthenticatedUser().username);
      uploadUserFormData.append('user_full_name', Authentication.getAuthenticatedUser().user_full_name);
      uploadUserFormData.append('user_birthday', global.stringifyDate(Authentication.getAuthenticatedUser().user_birthday));

      var v; //validation buffer

      //add fields to upload object only if they were changed

      if (mpc.updateProfile.userPhone.$dirty) {
        v = datavalidation.phoneValidation(mpc.user.user_phone);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        uploadUserFormData.append('user_phone', v.processedField);
      } else {
        //set old value to field, because it is required by backend
        uploadUserFormData.append('user_phone', Authentication.getAuthenticatedUser().user_phone);
      }


      if (mpc.updateProfile.userEmail.$dirty) {
        //angularjs has native email validation support, so do not use datavalidation module
        if (!mpc.updateProfile.userEmail.$valid) {
          $mdToast.showSimple($translate.instant('Wrong Email'));
          return;
        }
        uploadUserFormData.append('email', mpc.user.email);
      }

      if (mpc.updateProfile.userDescription.$dirty) {
        //FIXME: https://bitbucket.org/zd333/gymio/issues/2/sanitize
        //uploadUser.user_description = $sanitize(mpc.user.user_description);
        uploadUserFormData.append('user_description', mpc.user.user_description);
      }

      if (mpc.newPassword.length > 0) {
        v = datavalidation.passwordValidation(mpc.newPassword);
        if (!v.passed) {
          $mdToast.showSimple(v.errorMsg);
          return;
        }
        uploadUserFormData.append('password', v.processedField);
      }

      //TODO: check file size (not more than 4-5 mb?)
      if (mpc.selectedFile) {
        uploadUserFormData.append('user_photo_not_approved', mpc.selectedFile);
      }

      Authentication.updateUser(uploadUserFormData, Authentication.getAuthenticatedUser().id)
        .then(function(response) {
          Authentication.setAuthenticatedUser(response.data);
          $location.path('/dashboard/dashboard_overview');
          $mdToast.showSimple($translate.instant('Successfully saved'));
        }, function(response) {
          $mdToast.showSimple($translate.instant('Not saved'));
        });
    }
  }
})();
