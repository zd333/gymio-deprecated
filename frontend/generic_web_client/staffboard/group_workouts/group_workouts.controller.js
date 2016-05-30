;
(function() {
  'use strict';

  angular
    .module('gymio.staffboard.group_workouts.controllers')
    .controller('GroupWorkoutsController', ['datavalidation', '$mdToast', function(datavalidation, $mdToast) {
      var gwc = this;
      gwc.addWorkoutTypeModel = null;
      gwc.addWorkoutType = addWorkoutType;


      function addWorkoutType() {

      }

    }]);
})();
