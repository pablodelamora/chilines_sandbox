(function(){
   function addressChooserController($scope, userFactory, notificationService) {
      this.choose = function(index) {
         $scope.finishedChoosing({index:index});
      };

      this.addNewAddressAndChoose = function(){
         //New address field validation
         var na = $scope.newAddress;
         var notification = "";
         if (!na) {
            notification = "Agregue los datos nuevos.";
         }
         else if (!na.recipient) {
            notification = "Agregue el nombre de quién recibe.";
         }
         else if (!na.street) {
            notification = "Agregue la calle de destino.";
         }
         else if (!na.state) {
            notification = "Agregue el estado de destino.";
         }
         else if (!na.county) {
            notification = "Agregue la delegación de destino.";
         }
         else if (!na.colony) {
            notification = "Agregue la colonia de destino.";
         }
         else if (!na.postalCode) {
            notification = "Agregue el código postal de destino.";
         }

         if (notification != "") {
            notificationService.pushNotification(notification, "alarm");
         }
         else if (!na.externalNumber) {
            na.externalNumber = "Sin Número";
         }

         var index = userFactory.addAddress(na) - 1;
         $scope.finishedChoosing({index:index});
      };

      $scope.uf = userFactory;
      $scope.newAddress = undefined;
   }

   angular.module("chilinesApp").directive("addressChooser", function(){
      return {
         restrict: "E",
         templateUrl: "templates/addresschooser/address-chooser.html",
         controller: ["$scope", "userFactory", "notificationService", addressChooserController],
         controllerAs: "addressChooserCtrl",
         scope: {
            finishedChoosing: "&"
         }
      }
   });

})()
