;
(function() {
  'use strict';

  angular
    .module('gymio.staffboard.controllers')
    .controller('StaffboardMenuController', StaffboardMenuController);

  StaffboardMenuController.$inject = ['authorisation'];

  function StaffboardMenuController(authorisation) {
    var smc = this;
    //modules must be named exactly as js files of dashboard modules
    smc.modules = authorisation.getAllowedStaffboardModuleList();
  }
})();
