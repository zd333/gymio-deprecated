;(function () {
    'use strict';

    angular
        .module('gymio.mainMenu.controllers')
        .controller('MainMenuController', MainMenuController);

    MainMenuController.$inject = ['Authentication', '$rootScope'];

    function MainMenuController(Authentication, $rootScope) {
        var mmc = this;
        generateMenuItems();

        //authentication event
        $rootScope.$on('userWasAuthenticated', function () {
            generateMenuItems();
        });

        //unauthentication event
        $rootScope.$on('userWasUnauthenticated', function () {
            mmc.dashboardModules = undefined;
        });

        function generateMenuItems() {
            //if it is unauthenticated user - just don't show him dashboard buttons
            //all buttons for unauthenticated users are drawed in html template
            if (!Authentication.isAuthenticated()) {
                return;
            }

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

    }
})();
