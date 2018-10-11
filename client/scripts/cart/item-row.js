(function(){
   function itemRowController(userFactory, productFactory, $scope){
      $scope.product = productFactory.retrieveProduct($scope.item.id);
      this.remove = function(){
         userFactory.removeItem($scope.item.id);
      };
   };

   angular.module("chilinesApp").directive("itemRow", ["$timeout",
   function($timeout){
      return {
         restrict: "A",
         templateUrl: "templates/cart/item-row.html",
         scope: {
            item: "="
         },
         controller: ["userFactory", "productFactory", "$scope", itemRowController],
         controllerAs: "itemRowCtrl",
         link: function($scope) {
            $timeout(function() {
               //Run this after DOM loads
            }, 0);
         }
      };
   }]);

})()
