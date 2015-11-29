(function () {
    'use strict';

    angular
        .module('gymio.dashboard.my_profile.controllers')
        .controller('MyProfileController', MyProfileController);

    MyProfileController.$inject = ['Authentication', 'datavalidation', '$translate', '$sanitize', 'global', '$location'];

    function MyProfileController(Authentication, datavalidation, $translate, $sanitize, global, $location) {
        var mpc = this;

        mpc.save = save;

        mpc.newPassword = '';

        mpc.errorText = '';

        //do not assign user object directly to avoid changing by ref
        mpc.user = {};
        var usr = Authentication.getAuthenticatedUser();
        for (var k in usr) mpc.user[k] = usr[k];

        function save() {
            //TODO: add photo support
            //make one more user object to use in upload
            //copy required by backend fields
            var uploadUser = {};
            uploadUser.id = Authentication.getAuthenticatedUser().id;
            uploadUser.username = Authentication.getAuthenticatedUser().username;
            uploadUser.user_full_name = Authentication.getAuthenticatedUser().user_full_name;
            uploadUser.user_phone = Authentication.getAuthenticatedUser().user_phone;
            uploadUser.user_birthday = global.stringifyDate(Authentication.getAuthenticatedUser().user_birthday);

            var v;//validation buffer

            //add property to upload object only if they were changed

            if (mpc.updateProfile.userPhone.$dirty) {
                v = datavalidation.phoneValidation(mpc.user.user_phone);
                if (!v.passed) {
                    mpc.errorText = v.errorMsg;
                    return;
                }
                uploadUser.user_phone = v.processedField;
            }

            if (mpc.updateProfile.userEmail.$dirty) {
                //angularjs has native email validation support, so do not use datavalidation module
                if (!mpc.updateProfile.userEmail.$valid) {
                    mpc.errorText = $translate.instant('Wrong Email');
                    return;
                }
                uploadUser.email = mpc.user.email;
            }

            if (mpc.updateProfile.userDescription.$dirty) {
                uploadUser.user_description = $sanitize(mpc.user.user_description);
            }

            if (mpc.newPassword.length > 0) {
                v = datavalidation.passwordValidation(mpc.newPassword);
                if (!v.passed) {
                    mpc.errorText = v.errorMsg;
                    return;
                }
                uploadUser.password = v.processedField;
            }

            Authentication.updateUser(uploadUser)
                .then(function (response) {
                    Authentication.setAuthenticatedUser(response.data);
                    //TODO: use something more elegant
                    alert($translate.instant('Successfully saved'));
                }, function (response) {
                    //TODO: use something more elegant
                    alert($translate.instant('Not saved'));
                });
        }
    }
})();