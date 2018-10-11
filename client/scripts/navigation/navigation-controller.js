(function(){
  function navigationBarCtrl(ns, userFactory, $scope, $location){

    $scope.uf = userFactory;
    $scope.position = "shopController";

    this.logout = function() {
      if (userFactory.logout()) {
        ns.pushNotification("Salida exitosa.", "success");
        $location.path("/signin");
      }
    };

    this.refresh = function() {
      if (userFactory.loggedIn) {
        $scope.greet = userFactory.user.userName + " " + userFactory.user.userLastName;
      }
      else {
        $scope.greet = "Invitado";
      }
    };

    this.refresh();

    var controller = this;

    $scope.$watch(
      function(){
        return userFactory.loggedIn;
    },
      function(){
        controller.refresh();
    });

    $scope.$on("$routeChangeSuccess", function(event, current, previous) {
      var route = current.$$route;
      if (route) {
         var path = route.originalPath;
         if (path.indexOf("shop")==1) {
            $scope.position = "shop";
         }
         else if (path.indexOf("signin")==1) {
            $scope.position = "signin";
         }
         else if (path.indexOf("cart")==1) {
            $scope.position = "cart";
         }
         else {
            $scope.position = "unknown";
         }
      }
    });

    $scope.dropdownActive = function() {
      var dropDownElements = ["cart", "signin"];
      var position = $scope.position;
      return dropDownElements.indexOf(position) != -1;
   };

   $scope.itemsInCart = function() {
      var retVal = 0;
      for (var i = 0; i < userFactory.user.cart.items.length; i++) {
         var item = userFactory.user.cart.items[i];
         retVal += item.quantity;
      }
      return retVal;
   };
  }
  angular.module("chilinesApp").directive("navigationBar", function(){
     return {
      restrict: "E",
      controller: ["notificationService", "userFactory", "$scope", "$location", navigationBarCtrl],
      controllerAs: "navigationBarCtrl",
      scope: {},
      templateUrl: "templates/navigation/navigation-controller.html"
    };
  });
})()
