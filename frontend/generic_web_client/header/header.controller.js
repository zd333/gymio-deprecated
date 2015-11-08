(function () {
    'use strict';

    angular
        .module('gymio.header.controllers')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$location', '$scope', 'Authentication'];

    function HeaderController($location, $scope, Authentication) {
        var hc = this;

        hc.logout = logout;

        function logout(){
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