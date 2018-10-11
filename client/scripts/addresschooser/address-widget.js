(function(){
   function addressWidgetController(userFactory, rulesFactory, $scope, $location){

      var autocomplete = new google.maps.places.Autocomplete($("#street-field")[0], {
         componentRestrictions: {country:"mx"},
         types: ["address"]
      });

      function fillInAddress() {
         var place = autocomplete.getPlace();
         for (var i = 0; i < place.address_components.length; i++) {
            var component = place.address_components[i];
            var name = component.long_name;
            switch (component.types[0]) {
               case "route":
                  $scope.newAddressModel.street = name;
                  break;
               case "sublocality_level_1":
                  $scope.newAddressModel.colony = name;
                  break;
               case "locality":
                  $scope.newAddressModel.county = name;
                  break;
               case "administrative_area_level_1":
                  $scope.newAddressModel.state = name;
                  break;
               case "country":
                  $scope.newAddressModel.country = name;
                  break;
               case "postal_code":
                  $scope.newAddressModel.postalCode = name;
                  break;
               default:
                  //do nothing
            }
         }
         $("#external-number-field").focus();
      };

      autocomplete.addListener('place_changed', fillInAddress);

      if ($scope.oldAddress) {
         var oa = $scope.oldAddress;
         $scope.newAddressModel = new Address(oa.recipient, oa.street, oa.externalNumber, oa.internalNumber, oa.country, oa.state, oa.county, oa.colony, oa.postalCode);
      }
      else {
         $scope.newAddressModel = new Address(userFactory.user.userName + " " +  userFactory.user.userLastName, undefined, undefined, undefined, "Mexico", undefined, undefined, undefined, undefined);
      }
   };

   angular.module("chilinesApp").directive("addressWidget", ["$timeout",
   function($timeout){
      return {
         restrict: "E",
         templateUrl: "templates/addresschooser/address-widget.html",
         scope: {
            oldAddress: "=?",
            newAddressModel: "=?"
         },
         controller: ["userFactory", "rulesFactory", "$scope", "$location", addressWidgetController],
         controllerAs: "addressWidgetCtrl",
         link: function($scope) {
            $timeout(function(){
               //Run this after DOM loads
            }, 0);
         }
      };
   }]);

})()
