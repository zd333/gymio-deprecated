(function () {
    'use strict';

    angular
        .module('gymio.staffboard.controllers')
        .controller('StaffboardMenuController', StaffboardMenuController);

    StaffboardMenuController.$inject = ['$location', 'Authentication'];

    function StaffboardMenuController($location, Authentication) {
        //redirect to main view if it is unauthenticated user or not employee
        if (!Authentication.isAuthenticated() || !Authentication.getAuthenticatedUser().is_staff) {
            $location.path('/');
        }

        var smc = this;
        //modules must be named exactly as js files of dashboard modules
        smc.modules = [
            'staffboard_overview',
            'customer_tick',
            'pre_registration',
            'register_user',
            'manage_users',
            'ticket_sale',
            'ticket_freez',
            'tickets',
            'group_workouts',
            'gym',
            'nutrition_courses',
            'customer_notification',
            'expenses',
            'salary',
            'employee_tick',
            'employees',
            'positions',
            'reports'
        ];
        //TODO: add here service call which will delete from modules array all modules,
        //for which current user is not authorized
        //and which are disabled for this particular club
    }
})();
