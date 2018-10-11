(function(){
  angular.module("chilinesApp")
  .config(["$routeProvider",
    function($routeProvider) {
      $routeProvider
        .when("/shop", {
          templateUrl: "templates/shop/shop-index.html",
          controller: "shopController",
          controllerAs: "shopCtrl"
        })
        .when("/signin", {
          templateUrl: "templates/signin/sign-in.html",
          controller: "signInController",
          controllerAs: "signInCtrl"
        })
        .when("/shop/product/:productId", {
          templateUrl: "templates/product/product-page.html",
          controller: "productController",
          controllerAs: "productCtrl"
        })
        .when("/cart", {
           templateUrl: "templates/cart/cart.html",
           controller: "cartController",
           controllerAs: "cartCtrl"
        })
        .otherwise({
          redirectTo: "/shop"
        });
    }]
  );
})()
