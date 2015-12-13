(function () {
    'use strict';

    var rts = angular.module('gymio.routes', ['ngRoute']);

    rts.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'mainview/mainview.html',
                reloadOnSearch: false
            })
            .when('/register', {
                controller: 'RegisterController',
                controllerAs: 'rc',
                templateUrl: 'authentication/register.html',
                reloadOnSearch: false
            })
            .when('/login', {
                controller: 'LoginController',
                controllerAs: 'lc',
                templateUrl: 'authentication/login.html',
                reloadOnSearch: false
            })
            //TODO: in every route, which can be hided by root controller, need to check if it is not hided (backend parameters are already here)
            //probably can use resolve http://code.ciphertrick.com/2014/12/14/check-condition-before-loading-route-in-angular-js/
            //or add all this parameters dynamically after backend data are loaded and route section can be shown
            .when('/dashboard/dashboard_overview', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/dashboard_overview/dashboard_overview.html',
                reloadOnSearch: false
            })
            .when('/dashboard/tickets', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/tickets/tickets.html',
                reloadOnSearch: false
            })
            .when('/dashboard/group_workouts', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/group_workouts/group_workouts.html',
                reloadOnSearch: false
            })
            .when('/dashboard/gym', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/gym/gym.html',
                reloadOnSearch: false
            })
            .when('/dashboard/sport_journal', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/sport_journal/sport_journal.html',
                reloadOnSearch: false
            })
            .when('/dashboard/nutrition', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/nutrition/nutrition.html',
                reloadOnSearch: false
            })
            .when('/dashboard/woomens_calendar', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/woomens_calendar/woomens_calendar.html',
                reloadOnSearch: false
            })
            .when('/dashboard/my_results', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'dashboard/my_results/my_results.html',
                reloadOnSearch: false
            })
            .when('/dashboard/my_profile', {
                controller: 'MyProfileController',
                controllerAs: 'mpc',
                templateUrl: 'dashboard/my_profile/my_profile.html',
                reloadOnSearch: false
            })
            .when('/staffboard/staffboard_overview', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/staffboard_overview/staffboard_overview.html',
                reloadOnSearch: false
            })
            .when('/staffboard/customer_tick', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/customer_tick/customer_tick.html',
                reloadOnSearch: false
            })
            .when('/staffboard/pre_registration', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/pre_registration/pre_registration.html',
                reloadOnSearch: false
            })
            .when('/staffboard/register_user', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/register_user/register_user.html',
                reloadOnSearch: false
            })
            .when('/staffboard/manage_users', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/manage_users/manage_users.html',
                reloadOnSearch: false
            })
            .when('/staffboard/ticket_sale', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/ticket_sale/ticket_sale.html',
                reloadOnSearch: false
            })
            .when('/staffboard/ticket_freez', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/ticket_freez/ticket_freez.html',
                reloadOnSearch: false
            })
            .when('/staffboard/tickets', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/tickets/tickets.html',
                reloadOnSearch: false
            })
            .when('/staffboard/group_workouts', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/group_workouts/group_workouts.html',
                reloadOnSearch: false
            })
            .when('/staffboard/gym', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/gym/gym.html',
                reloadOnSearch: false
            })
            .when('/staffboard/nutrition_courses', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/nutrition_courses/nutrition_courses.html',
                reloadOnSearch: false
            })
            .when('/staffboard/customer_notification', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/customer_notification/customer_notification.html',
                reloadOnSearch: false
            })
            .when('/staffboard/expenses', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/expenses/expenses.html',
                reloadOnSearch: false
            })
            .when('/staffboard/salary', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/salary/salary.html',
                reloadOnSearch: false
            })
            .when('/staffboard/employee_tick', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/employee_tick/employee_tick.html',
                reloadOnSearch: false
            })
            .when('/staffboard/employees', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/employees/employees.html',
                reloadOnSearch: false
            })
            .when('/staffboard/positions', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/positions/positions.html',
                reloadOnSearch: false
            })
            .when('/staffboard/system_rights', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/system_rights/system_rights.html',
                reloadOnSearch: false
            })
            .when('/staffboard/reports', {
                //controller: '',
                //controllerAs: '',
                templateUrl: 'staffboard/reports/reports.html',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/'
            });
    }]);
})();