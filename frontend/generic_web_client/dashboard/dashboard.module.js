(function () {
    'use strict';

    angular
        .module('gymio.dashboard', [
            'gymio.dashboard.controllers',
            'gymio.dashboard.services',

            'gymio.dashboard.dashboard_overview',
            'gymio.dashboard.group_workouts',
            'gymio.dashboard.gym',
            'gymio.dashboard.my_profile',
            'gymio.dashboard.my_results',
            'gymio.dashboard.nutrition',
            'gymio.dashboard.sport_journal',
            'gymio.dashboard.tickets',
            'gymio.dashboard.woomens_calendar'
        ]);

    angular
        .module('gymio.dashboard.controllers', []);

    angular
        .module('gymio.dashboard.services', []);
})();
