(function(){
  angular.module("chilinesApp").controller("productController", ["notificationService", "productFactory", "userFactory", "helper", "$scope", "$route", "$routeParams", "$sce", "$location", function(notificationService, productFactory, userFactory, helper, $scope, $route, $routeParams, $sce, $location){
    $scope.userFactory = userFactory;

    var productId = $routeParams.productId;
    $scope.product = productFactory.retrieveProduct(productId);

    if (!$scope.product) {
      $location.path("/");
      return;
    }

    $scope.myReviewInd = function() {
      if (userFactory.loggedIn) {
        for (var i = 0; i < $scope.product.reviews.length; i++) {
          var review = $scope.product.reviews[i];
          if (review.user.email == userFactory.user.email) {
            return i;
          }
        }
      }
      return undefined;
    };

    $scope.myReview = function() {
      if ($scope.myReviewInd() != undefined) {
        return Object.assign({}, $scope.product.reviews[$scope.myReviewInd()]);
      }
      return null;
    }

    $scope.helper = helper;
    $scope.sce = $sce;

    $scope.selectedImage = $scope.product.principalImage;

    this.selectImage = function(newIndex) {
      $scope.selectedImage = newIndex;
    };

    $scope.swipeRight = function($event) {
      if ($scope.selectedImage > 0) {
        $scope.selectedImage--;
      }
    };

    $scope.swipeLeft = function($event) {
      if ($scope.selectedImage < $scope.product.images.length-1) {
        $scope.selectedImage++;
      }
    };

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

  }]);
})()
