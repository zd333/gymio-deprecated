(function () {
    'use strict';

    angular
        .module('gymio.dashboard.controllers')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$scope', 'Authentication'];

    function DashboardController($location, $scope, Authentication) {
        var dc = this;


        //we don't need to initialize controller if it is unauthenticated user
        //why are you going here, go to main view!
        if (!Authentication.isAuthenticated()) {
            $location.path('/');
        }

    }
})();