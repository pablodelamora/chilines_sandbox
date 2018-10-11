(function(){

   function purgeReview(review) {
      if (typeof review == "string") {
         if (review == "") review = "null";
         return JSON.parse(review);
      }
      return review;
   }

   function reviewPanelController(productFactory, notificationService, userFactory, helper, $scope, $sce){
      $scope.$watch(function(){return $scope.review;}, function(){
         $scope.review = purgeReview($scope.review);
         if (!$scope.review) {
            $scope.review = new Review(userFactory.user, 5, new Date(), "");
            $scope.existed = false;
         }
      });
      $scope.existed = true;
      $scope.sce = $sce;
      $scope.helper = helper;

      $scope.review = purgeReview($scope.review);

      if (!$scope.review) {
         $scope.review = new Review(userFactory.user, 5, new Date(), "");
         $scope.existed = false;
      }

      var originalReview = Object.assign({}, $scope.review);

      $scope.usersReview = userFactory.user.email == $scope.review.user.email;

      if ($scope.existed) {
         $scope.editing = false;
         $scope.editButtonText = "Editar";
      }
      else {
         $scope.editing = true;
         $scope.editButtonText = "Agregar Reseña";
      }

      $scope.toggleEditing = function(){
         if ($scope.editing) {
            if ($scope.review.content=="") {
               notificationService.pushNotification("Escribe contenido por favor.", "alarm");
               return;
            }
            else {
               var message = productFactory.editReview($scope.productId, $scope.review, originalReview);
               if (message == "added" || message == "modified") {
                  $scope.editing = false;
                  $scope.editButtonText = "Editar";
                  if (message == "added") {
                     notificationService.pushNotification("Se ha agregado su reseña.", "success");
                     $scope.existed = true;
                  }
                  else if (message == "modified") {
                     notificationService.pushNotification("Se ha modificado su reseña.", "success");
                  }
               }
               else {
                  notificationService.pushNotification(message, "alarm");
               }
            }
         }
         else {
            originalReview = Object.assign({}, $scope.review);
            $scope.editing = true;
            $scope.editButtonText = "Terminar";
         }
      };

      $scope.removeReview = function() {
         var message = productFactory.removeReview($scope.productId, $scope.review);
         if (message = "success") {
            $scope.existed = false;
            $scope.editing = true;
            $scope.editButtonText = "Agregar Reseña";
            notificationService.pushNotification("Se ha removido su reseña.", "success");
         }
         else {
            notificationService.pushNotification(message, "alarm");
         }
      }
   };

   angular.module("chilinesApp").directive("reviewPanel", ["$timeout", function($timeout){
      return {
         restrict: "E",
         templateUrl: "templates/product/review-panel.html",
         scope: {
            review: "@",
            index: "@",
            productId: "@"
         },
         controller: ["productFactory", "notificationService", "userFactory", "helper", "$scope", "$sce", reviewPanelController],
         controllerAs: "reviewPanelCtrl",
         link: function($scope) {
            $timeout(function() {
               //Run this after DOM loads
               $scope.review = purgeReview($scope.review);
            }, 0);
         }
      };
   }]);

})()
