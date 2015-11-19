(function () {
    'use strict';

    angular
        .module('gymio.header.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$location', '$scope', 'Authentication', '$global', '$translate'];

    function HeaderController($location, $scope, Authentication, $global, $translate) {
        var hc = this;

        hc.shortName = $global.settings().shortName;
        hc.languages = $global.settings().languages;
        //TODO:DEPLOY default language will be the first in list
        if ($translate.use() === undefined) {
            //no language stored in cookie, so set default first language in the list
            hc.selectedLanguage = hc.languages[0];
            $translate.use(hc.languages[0]);
        }
        else{
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
                .success(function (data, status, headers, config) {
                    //clear cookies and move to main view
                    Authentication.unAuthenticate();
                    $location.path('/');
                })
                .error(function (data, status, headers, config) {
                    //not sure what is happening
                    //anyway, clear cookies and move to main view
                    Authentication.unAuthenticate();
                    $location.path('/');
                })
            ;
        }
    }
})();