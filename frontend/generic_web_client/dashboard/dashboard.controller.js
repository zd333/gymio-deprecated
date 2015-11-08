(function () {
    'use strict';

    angular
        .module('gymio.dashboard.controllers')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$scope'];

    function DashboardController($location, $scope) {
        var dc = this;
    }
})();