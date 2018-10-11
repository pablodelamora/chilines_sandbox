(function(){
   angular.module("chilinesApp").controller("cartController", function(rulesFactory, userFactory, productFactory, notificationService, $location, $scope){
      $scope.choosingAddress = false;
      $scope.uf = userFactory;
      $scope.addressIndex = userFactory.user.cart.toAddress;
      if (!userFactory.user.addresses[$scope.addressIndex]) {
         $scope.addressIndex = userFactory.user.favoriteAddress;
      }
      if (!userFactory.loggedIn) {
         $location.path("/signin");
         notificationService.pushNotification("Por favor entra al sitio", "alarm");
         return;
      }
      else {
         $scope.uf = userFactory;
         $scope.subtotal = function() {
            var retVal = 0;
            for (var i = 0; i < userFactory.user.cart.items.length; i++) {
               var item = userFactory.user.cart.items[i];
               var product = productFactory.retrieveProduct(item.id);
               retVal += item.quantity*product.price;
            }
            return retVal;
         }
         $scope.shippingCost = rulesFactory.shippingRules.cost;
         $scope.grandTotal = function() {
            var retVal = $scope.subtotal() + $scope.shippingCost;
            return retVal;
         };
      }
      this.keepBuying = function() {
         $location.path("/shop");
      };
      this.checkout = function() {

      };
      this.editAddress = function () {
         $scope.choosingAddress = true;
      };

      this.finishedChoosing = function(index) {
         $scope.choosingAddress = false;
         userFactory.setCartAddress(index);
         $scope.addressIndex = index;
      };
   });
})()
