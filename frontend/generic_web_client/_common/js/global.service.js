(function () {
    'use strict';

    angular
        .module('gymio.services')
        .factory('$global', [function () {
            //TODO: always set particular values to this constants before prod deploy
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

            var globalServices = {
                restUrl : restUrl
            };

            return globalServices;
        }]);
})();