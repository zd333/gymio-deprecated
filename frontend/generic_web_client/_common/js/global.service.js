(function () {
    'use strict';

    angular
        .module('gymio.services')
        .factory('$global', ['$http', function ($http) {
            //DEPLOY: set particular values to this constants before prod deploy
            var deploySettings = {
                clubNumber: 1,
                restPrefix: 'sc1'
            };


            //next fields will be shared among all app controllers
            //they will be added dynamically, defined them here only to comment
            var clubSettings = {};
            var gymioPlatformSettings = {};
            var authenticatedUser = {};

            //returns promise of JSON with current club settings, will be used only in initialization controller
            var deferredRequestClubSettings = function () {
                return $http.get('/' + deploySettings.restPrefix + '/clubs/' + deploySettings.clubNumber + '/', {cache: true});
            };

            //returns promise of JSON with whole Gymio platform static settings, will be used only in initialization controller
            var deferredRequestGymioPlatformSettings = function () {
                return $http.get('/static_settings/' + deploySettings.restPrefix + '.json', {cache: true});
            };

            //builds URL to RESTful service
            var restUrl = function (entityName, entityKey) {
                var URL = '/' + deploySettings.restPrefix + '/' + entityName + '/' + deploySettings.clubNumber + '/';
                if (entityKey !== undefined) URL += entityKey + '/';
                return URL;
            };

            var stringifyDate = function (date) {
                //Date format is hardcoded on backend
                //'Y-m-d'  #2015-01-30
                return date.getFullYear() + '-'
                    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
                    + ('0' + date.getDate()).slice(-2);
            };

            var globalServices = {
                restUrl: restUrl,
                stringifyDate: stringifyDate,
                deferredRequestClubSettings: deferredRequestClubSettings,
                deferredRequestGymioPlatformSettings: deferredRequestGymioPlatformSettings
            };

            return globalServices;
        }]);
})();