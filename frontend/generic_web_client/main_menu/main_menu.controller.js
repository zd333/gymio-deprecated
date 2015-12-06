(function () {
    'use strict';

    angular
        .module('gymio.mainMenu.controllers')
        .controller('MainMenuController', MainMenuController);

    MainMenuController.$inject = ['$location', 'Authentication'];

    function MainMenuController($location, Authentication) {
        //redirect to main view if it is unauthenticated user
        if (!Authentication.isAuthenticated()) {
            $location.path('/');
        }

        var mmc = this;
        //modules must be named exactly as js files of dashboard modules
        mmc.modules = [
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

        //current selected dashboard module
        mmc.currentModule = mmc.modules[0];

        //redirect to particular section by search parameter and clean url
        var paramModule = $location.search().dashboardsection;
        if (!!paramModule){
            if (mmc.modules.indexOf(paramModule) != -1) {
                mmc.currentModule = paramModule;
            }
            $location.search({dashboardsection: null});
        }
    }
})();