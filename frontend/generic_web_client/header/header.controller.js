(function () {
    'use strict';

    angular
        .module('gymio.header.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$location', '$scope', 'Authentication', '$global', '$translate'];

    function HeaderController($location, $scope, Authentication, $global, $translate) {
        var hc = this;

        $global.deferredGetClubSettings().then(function (response) {
            hc.shortName = response.data.club_short_name;
            hc.languages = response.data.club_list_languages.split(',');
        });

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

        function setLanguage(lngName) {
            hc.selectedLanguage = lngName;
            $translate.use(lngName);
        }

        function logout() {
            Authentication.logout()
                .success(function () {
                    //clear cookies and move to main view
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