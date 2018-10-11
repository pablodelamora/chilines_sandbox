(function(){
   function addressBodyController(){
   };

   angular.module("chilinesApp").directive("addressBody", ["$timeout",
   function($timeout){
      return {
         restrict: "E",
         templateUrl: "templates/addresschooser/address-body.html",
         scope: {
            address: "="
         },
         controller: addressBodyController,
         controllerAs: "addressBodyCtrl",
         link: function($scope) {
            $timeout(function() {
               //Run this after DOM loads
            }, 0);
         }
      };
   }]);

})()
