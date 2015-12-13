(function () {
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
            //create one more user object to use in upload
            //copy required by backend fields
            var uploadUser = {};
            uploadUser.id = Authentication.getAuthenticatedUser().id;
            uploadUser.username = Authentication.getAuthenticatedUser().username;
            uploadUser.user_full_name = Authentication.getAuthenticatedUser().user_full_name;
            uploadUser.user_phone = Authentication.getAuthenticatedUser().user_phone;
            uploadUser.user_birthday = global.stringifyDate(Authentication.getAuthenticatedUser().user_birthday);

            var v; //validation buffer

            //add property to upload object only if they were changed

            if (mpc.updateProfile.userPhone.$dirty) {
                v = datavalidation.phoneValidation(mpc.user.user_phone);
                if (!v.passed) {
                    $mdToast.showSimple(v.errorMsg);
                    return;
                }
                uploadUser.user_phone = v.processedField;
            }

            if (mpc.updateProfile.userEmail.$dirty) {
                //angularjs has native email validation support, so do not use datavalidation module
                if (!mpc.updateProfile.userEmail.$valid) {
                    $mdToast.showSimple($translate.instant('Wrong Email'));
                    return;
                }
                uploadUser.email = mpc.user.email;
            }

            if (mpc.updateProfile.userDescription.$dirty) {
                //TODO: разобраться с sanitize - если его применить здесь - то он кириллицу превратит в escape коды
                //uploadUser.user_description = $sanitize(mpc.user.user_description);
                uploadUser.user_description = mpc.user.user_description;
            }

            if (mpc.newPassword.length > 0) {
                v = datavalidation.passwordValidation(mpc.newPassword);
                if (!v.passed) {
                    $mdToast.showSimple(v.errorMsg);
                    return;
                }
                uploadUser.password = v.processedField;
            }
            //TODO: add photo support
            console.log(mpc.selectedFile);
            if (mpc.selectedFile) {
                uploadUser.user_photo_not_approved = mpc.selectedFile;
            }

            Authentication.updateUser(uploadUser)
                .then(function (response) {
                    Authentication.setAuthenticatedUser(response.data);
                    $location.path('/dashboard/dashboard_overview');
                    $mdToast.showSimple($translate.instant('Successfully saved'));
                }, function (response) {
                    $mdToast.showSimple($translate.instant('Not saved'));
                });
        }
    }
})();