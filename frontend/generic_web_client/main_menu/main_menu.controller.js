(function () {
    'use strict';

    angular
        .module('gymio.mainMenu.controllers')
        .controller('MainMenuController', MainMenuController);

    MainMenuController.$inject = ['$location', 'Authentication'];

    function MainMenuController($location, Authentication) {
        //if it is unauthenticated user - just don't show him dashboard buttons
        if (!Authentication.isAuthenticated()) {
            return;
        }

        var mmc = this;
        //modules must be named exactly as js files of dashboard modules
        mmc.dashboardModules = [
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
        //TODO: add here service call which will delete from modules array all modules, which are disabled for this particular club
    }
})();