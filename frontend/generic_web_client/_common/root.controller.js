;(function () {
    'use strict';

    angular
        .module('gymio.root', [])
        .controller('RootController', RootController);

    RootController.$inject = ['$location', '$rootScope', 'Authentication', 'global', '$translate', '$mdSidenav'];

    function RootController($location, $rootScope, Authentication, global, $translate, $mdSidenav) {
        var rc = this;

        rc.toggleSidenav = toggleSidenav;
        rc.setLanguage = setLanguage;
        rc.logout = logout;

        //staffboard menu is collapsed by default
        rc.showStaffboardMenu = false;

        rc.loggedIn = Authentication.isAuthenticated();
        if (rc.loggedIn)
            rc.isStaff = !!Authentication.getAuthenticatedUser().is_staff;
        else
            rc.isStaff = false;

        rc.clubName = global.clubSettings.club_name;
        rc.languages = global.clubSettings.club_list_languages.split(',');

        //set translation
        if ($translate.use() === undefined) {
            //no language stored in cookie, so set default first language in the list
            rc.selectedLanguage = rc.languages[0];
            $translate.use(rc.languages[0]);
        } else {
            rc.selectedLanguage = $translate.use();
        }

        //authentication event
        $rootScope.$on('userWasAuthenticated', function () {
            rc.loggedIn = true;
            rc.isStaff = !!Authentication.getAuthenticatedUser().is_staff;
        });

        //unauthentication event
        $rootScope.$on('userWasUnauthenticated', function () {
            rc.loggedIn = false;
            rc.isStaff = false;
        });

        function setLanguage(lngName) {
            rc.selectedLanguage = lngName;
            $translate.use(lngName);
        }

        function logout() {
            Authentication.logout()
                .success(function () {
                    //clear user info and move to main view
                    Authentication.unAuthenticate();
                    $location.path('/');
                })
                .error(function () {
                    //not sure what is happening
                    //anyway, clear cookies and move to main view
                    Authentication.unAuthenticate();
                    $location.path('/');
                });
        }

        function toggleSidenav(componentID) {
            $mdSidenav(componentID).toggle();
        }
    }
})();
