(function () {
    'use strict';

    angular
        .module('gymio.services')
        .factory('$global', [function () {
            //TODO:DEPLOY: always set particular values to this constants before prod deploy
            var DeploySettings = {
                clubNumber: '/1/',
                restPrefix: '/sc1/',
            };
            var globalSettings = {
                //TODO: this must come from backend
                shortName: 'Спортивный клуб Unity'
            };

            //returns app settings
            var settings = function(){
                return globalSettings;
            };

            //builds URL to RESTful service
            var restUrl = function (entityName, entityKey) {
                var URL = DeploySettings.restPrefix + entityName + DeploySettings.clubNumber;
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
                settings: settings
            };

            return globalServices;
        }]);
})();