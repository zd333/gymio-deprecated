angular
    .module('gymio.initialization', [])
    .controller('InitializationController', InitializationController);
InitializationController.$inject = ['$global'];
function InitializationController($global) {
    var ic = this;
    //hide everything before initialization is finished
    ic.initialized = false;

    //asynchronous settings request chain
    //main app parts will start only after all settings are received
    //TODO: add cycle with timeout
    $global.deferredRequestGymioPlatformSettings().then(function (response) {
        $global.gymioPlatformSettings = response.data;

        $global.deferredRequestClubSettings().then(function (response) {
            $global.clubSettings = response.data;

            //now start main app parts
            ic.initialized = true;
        });
    });
}
