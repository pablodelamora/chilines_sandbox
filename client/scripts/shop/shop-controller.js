(function(){
   angular.module("chilinesApp").controller("shopController", ["productFactory", "$scope", function(productFactory, $scope){

      var products = productFactory.retrieveProducts();
      $scope.products = Object.keys(products).map(function(key) {
         return products[key];
      });

      $scope.sortOptions = [
         {name: "Mejor calificados", executable: "-product['averageStars']()['averageStars']"},
         {name: "Peor calificados", executable: "product['averageStars']()['averageStars']"},
         {name: "Más calificados", executable: "product.averageStars().numberOfReviews"},
         {name: "Menos calificados", executable: "-product.averageStars().numberOfReviews"},
         {name: "Nombres", executable: "product.name"},
         {name: "Más caros", executable: "-product.price"},
         {name: "Más baratos", executable: "product.price"}
      ];

      $scope.sortOption = $scope.sortOptions[0];

      $scope.accessPropertyForSorting = function(product) {
         return eval($scope.sortOption.executable);
      };
   }]);
})()
