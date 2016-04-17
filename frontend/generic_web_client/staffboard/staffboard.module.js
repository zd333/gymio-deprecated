;(function () {
    'use strict';

    angular
        .module('gymio.staffboard', [
            'gymio.staffboard.controllers',
            'gymio.staffboard.services',

            'gymio.staffboard.staffboard_overview',
            'gymio.staffboard.customer_tick',
            'gymio.staffboard.pre_registration',
            'gymio.staffboard.register_user',
            'gymio.staffboard.manage_users',
            'gymio.staffboard.ticket_sale',
            'gymio.staffboard.ticket_freez',
            'gymio.staffboard.tickets',
            'gymio.staffboard.group_workouts',
            'gymio.staffboard.gym',
            'gymio.staffboard.nutrition_courses',
            'gymio.staffboard.customer_notification',
            'gymio.staffboard.expenses',
            'gymio.staffboard.salary',
            'gymio.staffboard.employee_tick',
            'gymio.staffboard.employees',
            'gymio.staffboard.positions',
            'gymio.staffboard.reports'
        ]);

    angular
        .module('gymio.staffboard.controllers', []);

    angular
        .module('gymio.staffboard.services', []);
})();
