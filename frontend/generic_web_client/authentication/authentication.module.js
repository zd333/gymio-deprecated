;(function () {
    'use strict';

    angular
        .module('gymio.authentication', [
            'gymio.authentication.controllers',
            'gymio.authentication.services'
        ]);

    angular
        .module('gymio.authentication.controllers', []);

    angular
        .module('gymio.authentication.services', ['ngCookies']);
})();
