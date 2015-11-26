(function () {
    'use strict';

    angular
        .module('gymio.staffboard.controllers')
        .controller('StaffboardController', StaffboardController);

    StaffboardController.$inject = ['$location', '$scope', 'Authentication'];

    function StaffboardController($location, $scope, Authentication) {
        //redirect to main view if it is unauthenticated user
        //TODO: add redirect if it is not employee
        if (!Authentication.isAuthenticated() || !Authentication.getAuthenticatedUser().is_staff) {
            $location.path('/');
        }

        var sc = this;
        //modules must be named exactly as js files of dashboard modules
        sc.modules = [
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
            'system_rights',
            'reports'
        ];
        //TODO: add here service call which will delete from modules array all modules,
        //for which current user is not authorized
        // which are disubled for this particular club

        //current selected staffboard module
        //TODO: add redirection mechanism here
        sc.currentModule = sc.modules[0];
    }
})();