(function () {
    'use strict';

    angular
        .module('gymio.dashboard.my_profile.controllers')
        .controller('MyProfileController', MyProfileController);

    MyProfileController.$inject = ['Authentication', 'datavalidation', '$translate', '$sanitize'];

    function MyProfileController(Authentication, datavalidation, $translate, $sanitize) {
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
            var v;//validation buffer

            v = datavalidation.phoneValidation(mpc.user.user_phone);
            if (!v.passed) {
                mpc.errorText = v.errorMsg;
                return;
            }
            mpc.user.user_phone = v.processedField;

            //angularjs has native email validation support
            if (!mpc.updateProfile.userEmail.$valid) {
                mpc.errorText = $translate.instant('Wrong Email');
                return;
            }

            v = datavalidation.birthDateValidation(mpc.user.user_birthday);
            if (!v.passed) {
                mpc.errorText = v.errorMsg;
                return;
            }
            mpc.user.user_birthday = v.processedField;

            mpc.user.user_description = $sanitize(mpc.user.user_description);

            if (mpc.newPassword.length > 0) {
                v = datavalidation.passwordValidation(mpc.newPassword);
                if (!v.passed) {
                    mpc.errorText = v.errorMsg;
                    return;
                }
                mpc.newPassword = v.processedField;
                user.password = mpc.newPassword;
            }

            Authentication.updateUser(user);
        }
    }
})();