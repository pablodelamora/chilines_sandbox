(function(){
  angular.module("chilinesApp").controller("signInController", function(notificationService, userFactory, $location, $scope){

    $('[data-toggle="tooltip"]').tooltip();

    if (userFactory.loggedIn) {
      $location.path("/");
      return;
    }

    this.login = function () {
      if (userFactory.login($scope.email, $scope.password)) {
        $location.path("/");
        notificationService.pushNotification("Entrada exitosa", "success");
      }
    }

    this.forgotPassword = function () {
      console.log($scope.signInForm.email);
      var email = $scope.signInForm.email.$$rawModelValue;
      var valid = $scope.signInForm.email.$valid;
      if (!email) {
        notificationService.pushNotification("Por favor ingresa tu correo.", "alarm");
      }
      else if (!valid) {
        notificationService.pushNotification("Correo inválido.", "alarm");
      }
      else {
        var message = userFactory.forgotPassword(email);
        if (message=="success") {
          notificationService.pushNotification("Revisa tu correo y sigue las instrucciones.", "success");
        }
        else {
          notificationService.pushNotification(message, "warning");
        }
      }
    }
  });
})()
