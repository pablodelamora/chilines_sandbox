function toggleDropdownMenu(){
   $("a#dropdown").click();
}

function Cart(items, toAddress) {
   this.items = items;
   this.toAddress = toAddress;
}

function Address(recipient, street, externalNumber, internalNumber, country, state, county, colony, postalCode) {
   this.recipient = recipient;
   this.street = street;
   this.externalNumber = externalNumber;
   this.internalNumber = internalNumber;
   this.country = country;
   this.state = state;
   this.county = county;
   this.colony = colony;
   this.postalCode = postalCode;
}

function User(userToken, userName, userLastName, email, cart, addresses, favoriteAddress) {
  this.userToken = userToken;
  this.userName = userName;
  this.userLastName = userLastName;
  this.email = email;
  this.cart = cart;
  this.addresses = addresses;
  this.favoriteAddress = favoriteAddress;
}

function Review(user, stars, date, content) {
  this.user = user;
  this.stars = stars;
  this.date = date;
  this.content = content;
}

function Product(id, name, price, shortDescription, longDescription, images, principalImage, reviews) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.shortDescription = shortDescription;
  this.longDescription = longDescription;
  this.images = images;
  this.principalImage = principalImage;
  this.reviews = reviews;
  this.averageStars = function() {
     var reviews = this.reviews;
     var retVal = 0;
     var numberOfUsers = 0;
     for (var i = 0; i < reviews.length; i++) {
       var review = reviews[i];
       retVal += review.stars;
       numberOfUsers++;
     }
     retVal = retVal/numberOfUsers;
     return {averageStars: retVal, numberOfUsers: numberOfUsers};
   };
}

function Notification(value, state) {
  if (!state) state = "regular";
  this.value = value;
  this.state = state;
}
