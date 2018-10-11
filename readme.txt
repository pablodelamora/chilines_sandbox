Chilines App Management System
Started Formal Development on: May 13, 2016.

Pending Tasks:

Secondary Pending Tasks:
   *June 15, 2016:
      Filtering by picometro.
      Add sign in with Facebook.
   *June 2, 2016:
      Toggle Nav Drop Down on Logout and Login in Mobile devices.

Done Tasks:
   *Night of June 15, 2016:
      When choosing to add new address in cart add it to the user and choose it as sending address for shipment.
      Modified prototype of cart to have items and toAddress.
      Added cart item count in the navigation bar.
      Added new address form validation.
      Added focus on externalNumber field upon address selection with google api.
      Changed address form to have country field disabled and set new address model's country to Mexico.
      Added cart controller to choose the address according to that of the cart's address with fallback to favorite address.
      Corrected behavior upon adding an item to the cart when user is not logged in.
      Added addAddress and setCartAddress capabilities to userFactory.
   *Night of June 14, 2016:
      Replaced rulesFactory potential shipping addresses by google places api restricted to Mexico.
   *June 8, 2016:
      Added address-chooser (incorporates address-body and address-widget) directive and template.
      Added address-body (for formatting html of addresses) directive, style and template.
      Added address-widget (for edition of address attributes) directive and template.
      Modified cart controller to edit address for shipping.
      Modified cart template to display conditionally the address chooser.
      Added address prototype definition.
      Added shippingRules to rulesFactory to include countries, states, etc.
      Added mock addresses to testuser.
   *June 7, 2016:
      Changed user prototype to include cart.
      Added shopping cart template, controller and style.
      Added item row directive, controller and template.
      Added shopping cart routing.
      Added navigation style for items in cart label when selected.
      Added navigation awareness for cart.
      Added ability for product controller to add to cart.
      Added ability to add item and remove item from cart to userFactory.
      Added ability for product thumbnail of shop to add to cart.
      Corrected directive snippet.
      Increased general bottom body margin in styling.css.
   *June 7, 2016:
      Renamed shop's index from index.html to shop-index.html.
      Moved averageStars function to product object prototype.
      Added mock product.
      Added product thumbnail directive, template, styles and controller.
      Added shop sorting and searching for products.
      Added snippets folder and directive snippet.
      Modified price style for product page.
      Moved gold style for stars to main web styling.
   *June 4, 2016:
      Added support for swiping images in product page.
      Added product factory.
      Added helper.
      Added review panel controller style and template.
   *June 2, 2016: Give feedback to user after login/logout.
     idea: add footer of status and notifications.
   *June 2, 2016:
     Added product page controller and template, with routing.
     Added navbar route awareness (nav-pills mark active and inactive).
     Added product constructor.
     Added notification constructor.

Ignored Tasks:
   *June 2, 2016:
     Use notification constructor in users of notificationService and in notification Service.
