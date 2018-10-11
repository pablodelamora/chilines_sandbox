(function(){
  angular.module("chilinesApp").factory("rulesFactory", [function(){
      var factory = {
         maxItems: 9,
         shippingRules: {
            cost: 50
         }
      };
      return factory;
  }]);
})()
