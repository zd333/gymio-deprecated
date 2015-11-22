(function () {
    'use strict';

    angular
        .module('gymio.dashboard.controllers')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$location', '$scope', 'Authentication'];

    function DashboardController($location, $scope, Authentication) {
        //redirect to main view if it is unauthenticated user
        if (!Authentication.isAuthenticated()) {
            $location.path('/');
        }

        var dc = this;
        //modules must be named exactly as js files of dashboard modules
        dc.modules = [
            'dashboard_overview',
            'tickets',
            'group_workouts',
            'gym',
            'sport_journal',
            'nutrition',
            'woomens_calendar',
            'my_results',
            'my_profile'
        ];
        //TODO: add here service call which will delete from modules array all modules, which are disubled for this particular club

        //current selected dashboard module
        dc.currentModule = dc.modules[0];
    }
})();