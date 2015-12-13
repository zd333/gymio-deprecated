(function () {
    'use strict';

    angular
        .module('gymio.directives')
        //used to assign bind controller property with file input field
        //usage: <input type="file" gymio-input-file="controller_property_name">
        //had to use custom directive because native angularjs ones do not support file input
        //TODO: this is primitive implementation, improve it
        .directive('gymioInputFile', function () {
            return {
                restrict : 'A',
                scope: {
                    gymioInputFile: '='
                },
                link: function (scope, el) {
                    el.bind('change', function (event) {
                        var file = event.target.files[0];
                        scope.gymioInputFile = file ? file : undefined;
                        scope.$apply();
                    });
                }
            };
        });
})();