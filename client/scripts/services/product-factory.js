(function(){
   mockProducts = [];
   mockProducts.push(
      new Product(1, "Chibolita", 30, "Paquete con 35gr de pelotitas. ¡Ideales para compartir!", "Lorem ipsum dolor sit amet, eu eum justo suscipiantur, est an augue argumentum theophrastus. Eam in doctus atomorum aliquando. Eos hinc vidit equidem ei, pri ex altera feugiat complectitur. An cum enim augue delicata, at nam movet periculis persequeris. Omittam signiferumque ut est. In vim torquatos cotidieque, te vix timeam persius, eos no simul commune omittantur. Quem munere definitionem te sit, est atqui oporteat cu.", [
         "http://chilines.com/images/dsc_0086.jpg",
         "http://chilines.com/images/dsc_0339_b.jpg",
         "http://chilines.com/images/dsc_0150.jpg"
      ], 0, [
         new Review(new User(null, "Samuel", "Ginsburg", "sammygnw@aol.com"), 1, new Date(), "Pésasdfasdf."),
         new Review(new User(null, "Salomé", "Ginsburg", "salome@other.com"), 4, new Date(), "Deliciosas botanas."),
         new Review(new User(null, "Vicente", "Guerrero", "vicente@other.com"), 4, new Date(), "Deliciosas botanas.")
      ]),
      new Product(2, "Chacharitas", 145, "¡Ideales para regalar! 12 brochetitas para acompañar botanas y bebidas.", "Lorem ipsum dolor sit amet, eu eum justo suscipiantur, est an augue argumentum theophrastus. Eam in doctus atomorum aliquando. Eos hinc vidit equidem ei, pri ex altera feugiat complectitur. An cum enim augue delicata, at nam movet periculis persequeris. Omittam signiferumque ut est. In vim torquatos cotidieque, te vix timeam persius, eos no simul commune omittantur. Quem munere definitionem te sit, est atqui oporteat cu.", [
         "http://chilines.com/images/dsc_0150.jpg",
         "http://chilines.com/images/dsc_0339_b.jpg"
      ], 1, [
         new Review(new User(null, "Samuel", "Ginsburg", "sammygnw@aol.com"), 5, new Date(), "Pésasdfasdf."),
         new Review(new User(null, "Salomé", "Ginsburg", "salome@other.com"), 4, new Date(), "Deliciosas botanas.")
      ])
   );
   angular.module("chilinesApp").factory("productFactory", ["userFactory", function(userFactory){
      var retVal = {
         retrieveProducts: function() {
            return Object.assign({}, mockProducts);
         },
         retrieveProduct: function(id) {
            for (var i = 0; i < mockProducts.length; i++) {
               if (mockProducts[i].id == id) {
                  return Object.assign({}, mockProducts[i]);
               }
            }
            return null;
         },
         editReview: function(productId, newReview, oldReview) {
            var productInd = -1;
            for (var i = 0; i < mockProducts.length; i++) {
               if (mockProducts[i].id == productId) {
                  productInd = i;
                  break;
               }
            }
            if (productInd == -1) return "The referred product's id is not existant.";
            var product = mockProducts[productInd];
            var reviewInd = -1;
            for (var i = 0; i < product.reviews.length; i++) {
               if (product.reviews[i].user.email == oldReview.user.email) {
                  reviewInd = i;
                  break;
               }
            }
            if (reviewInd != -1) {
               var review = product.reviews[reviewInd];
               review.content = newReview.content;
               review.stars = newReview.stars;
               review.date = new Date();
               return "modified"
            }
            else {
               mockProducts[productInd].reviews.push(newReview);
               return "added";
            }
         },
         removeReview: function(productId, oldReview) {
            for (var i = 0; i < mockProducts.length; i++) {
               var product = mockProducts[i];
               if (product.id == productId) {
                  for (var j = 0; j < product.reviews.length; j++) {
                     var review = product.reviews[j];
                     if (review.user.email == oldReview.user.email) {
                        mockProducts[i].reviews.splice(j, 1);
                        return "removed";
                     }
                  }
                  return "Referred review not found.";
               }
            }
            return "The referred product could not be found.";
         }
      };
      return retVal;
   }]);
})()
