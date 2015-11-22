(function () {
    'use strict';

    angular
        .module('gymio.header.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$location', '$rootScope', 'Authentication', '$global', '$translate'];

    function HeaderController($location, $rootScope, Authentication, $global, $translate) {
        var hc = this;
        hc.loggedIn = Authentication.isAuthenticated();
        if (hc.loggedIn) hc.isStaff = !!Authentication.getAuthenticatedUser().is_staff;
        else hc.isStaff = false;

        hc.shortName = '';
        hc.languages = ['en'];

        //retrieve short name and languages from backend thought global service
        $global.deferredGetClubSettings().then(function (response) {
            hc.shortName = response.data.club_short_name;
            hc.languages = response.data.club_list_languages.split(',');
        });

        //set translation
        if ($translate.use() === undefined) {
            //no language stored in cookie, so set default first language in the list
            hc.selectedLanguage = hc.languages[0];
            $translate.use(hc.languages[0]);
        }
        else {
            hc.selectedLanguage = $translate.use();
        }

        hc.setLanguage = setLanguage;
        hc.logout = logout;

        //authentication event
        $rootScope.$on('userWasAuthenticated', function () {
            hc.loggedIn = true;
            hc.isStaff = !!Authentication.getAuthenticatedUser().is_staff;
        });

        //unauthentication event
        $rootScope.$on('userWasUnauthenticated', function () {
            hc.loggedIn = false;
            hc.isStaff = false;
        });

        function setLanguage(lngName) {
            hc.selectedLanguage = lngName;
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
    }
})();