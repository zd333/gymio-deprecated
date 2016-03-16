(function() {
  'use strict';

  angular
    .module('gymio.directives')
    //used to assign bind controller property with file input field
    //usage: <input type="file" gymio-input-file="controller_property_name">
    //had to use custom directive because native angularjs ones do not support file input
    //TODO: this is primitive implementation, improve it
    .directive('gymioInputFile', function() {
      return {
        restrict: 'A',
        scope: {
          gymioInputFile: '='
        },
        link: function(scope, el) {
          el.bind('change', function(event) {
            var file = event.target.files[0];
            scope.gymioInputFile = file ? file : undefined;
            scope.$apply();
          });
        }
      };
    });


  angular
    .module('gymio.directives')
    //centered static image in circle
    //usege: <my-centered-circle-image my-src="{{controller.urlString}}" my-size="100"></my-centered-circle-image>
    .directive('myCenteredCircleImage', function() {
      return {
        restrict: 'E',
        replace: 'false',
        //template: '<div style="background: url(http://images-cdn.moviepilot.com/image/upload/c_fill,h_1875,w_3000/t_mp_quality/uploads_4293d887-e99f-4de7-b1c2-72866034b293-avatar-yo-jpg-19697.jpg);width:50px;height:50px;background-size:cover;background-position: 50%;background-repeat: no-repeat;border-radius: 50%;"></div>'
        link: function($scope, element, attrs) {
          var size = 50;
          if (attrs.mySize) size = attrs.mySize;
          element.html('<div style="background: url(' + attrs.mySrc + ');width:' + size + 'px;height:' + size + 'px;background-size:cover;background-position: 50%;background-repeat: no-repeat;border-radius: 50%;"></div>');
          attrs.$observe('mySrc', function () {
            element.html('<div style="background: url(' + attrs.mySrc + ');width:' + size + 'px;height:' + size + 'px;background-size:cover;background-position: 50%;background-repeat: no-repeat;border-radius: 50%;"></div>');                        
          });
        }
      }
    });
})();
