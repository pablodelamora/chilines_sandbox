(function(){
   function productThumbnailController(notificationService, userFactory, helper, sce, $scope){
      $scope.sce = sce;
      $scope.helper = helper;
      this.addItem = function() {
         var message = userFactory.addItem($scope.product.id, $scope.quantity)
         if (message == "success") {
            var notification = $scope.quantity == 1 ? " producto agregado." : " productos agregados.";
            notificationService.pushNotification($scope.quantity + notification, message);
         }
         else {
            notificationService.pushNotification(message, "alarm");
         }
      };
   };

   angular.module("chilinesApp").directive("productThumbnail", ["$timeout",
   function($timeout){
      return {
         restrict: "E",
         templateUrl: "templates/shop/product-thumbnail.html",
         scope: {
            product: "="
         },
         controller: ["notificationService", "userFactory", "helper", "$sce", "$scope", productThumbnailController],
         controllerAs: "productThumbnailCtrl",
         link: function($scope) {
            $timeout(function() {
               //Run this after DOM loads
            }, 0);
         }
      };
   }]);
})()
