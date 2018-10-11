(function(){
   function controllerName(){
   };

   angular.module("appName").directive("directiveName", ["$timeout",
   function($timeout){
      return {
         restrict: "E",
         templateUrl: "url/to/template.html",
         scope: {
         },
         controller: controllerName,
         controllerAs: "controllerAlias",
         link: function($scope) {
            $timeout(function() {
               //Run this after DOM loads
            }, 0);
         }
      };
   }]);

})()
