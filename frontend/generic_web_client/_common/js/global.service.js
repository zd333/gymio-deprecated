(function () {
    'use strict';

    angular
        .module('gymio.services')
        .factory('$global', [function () {
            //TODO:DEPLOY: always set particular values to this constants before prod deploy
            var globalSettins = {
                clubNumber: '/1/',
                restPrefix: '/sc1/'
            };

            //builds URL to RESTful service
            var restUrl = function (entityName, entityKey) {
                var URL = globalSettins.restPrefix + entityName + globalSettins.clubNumber;
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
                stringifyDate: stringifyDate
            };

            return globalServices;
        }]);
})();