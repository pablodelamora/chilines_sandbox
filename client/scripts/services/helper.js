(function(){
  angular.module("chilinesApp").factory("helper", [function(){
      var retVal = {
        starsHtml: function(n) {
          var fullStar = '<i class="fa fa-star gold" aria-hidden="true"></i>';
          var halfStar = '<i class="fa fa-star-half-o gold" aria-hidden="true"></i>';
          var noStar = '<i class="fa fa-star-o gold" aria-hidden="true"></i>';

          var html = "";
          for (var i = 0; i < 5; i++) {
            if (n <= 0) {
              html += noStar;
            }
            else if (n < 1) {
              html += halfStar;
            }
            else {
              html += fullStar;
            }
            n--;
          }
          return html;
        }
      };
      return retVal;
  }]);
})()
