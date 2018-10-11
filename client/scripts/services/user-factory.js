(function(){
   var testUser = new User("4fe163a93a16650dee35e10dc727734ca936c46757e1a5eac8ce87c1848e9748", "Jonathan", "Ginsburg", "jgn1055@aol.com", new Cart([{id: 1, quantity: 2}, {id: 2, quantity:3}], 0), [
      new Address("Jacqueline Nagar", "Fuente de Península", "73", "1", "México", "Estado de México", "Huixquilucan", "Tecamachalco", "52780"),
      new Address("Eduardo Ginsburg", "Bosque de Tabachines", "36", "1201", "México", "Distrito Federal", "Miguel Hidalgo", "11700")
   ], 1);
   angular.module("chilinesApp").factory("userFactory", ["rulesFactory", function(rulesFactory){
      var retVal = {
         loggedIn: true,
         user: testUser,
         logout: function(){
            retVal.loggedIn = false;
            retVal.user = {};
            return true;
         },
         login: function(email, password) {
            retVal.loggedIn = true;
            retVal.user = testUser;
            return true;
         },
         forgotPassword: function(email) {
            return "success";
         },
         removeItem: function(id) {
            for (var i = 0; i < retVal.user.cart.items.length; i++) {
               var item = retVal.user.cart.items[i];
               if (item.id == id) {
                  retVal.user.cart.items.splice(i, 1);
                  toggleDropdownMenu();
                  return "success";
               }
            }
            return "No hay productos en el carrito con ese id.";
         },
         addItem: function(id, amount) {
            if (!retVal.loggedIn) return "Favor de ingresar al sistema.";
            for (var i = 0; i < retVal.user.cart.items.length; i++) {
               var item = retVal.user.cart.items[i];
               if (item.id == id) {
                  if (item.quantity + amount > rulesFactory.maxItems) {
                     return "No se pueden agregar más de " + rulesFactory.maxItems + " artículos.";
                  }
                  else {
                     item.quantity += amount;
                     toggleDropdownMenu();
                     return "success";
                  }
               }
            }
            retVal.user.cart.items.push({id:id, quantity:amount});
            toggleDropdownMenu();
            return "success";
         },
         addAddress: function(address) {
            if (!retVal.loggedIn) return "Favor de ingresar al sistema.";
            return retVal.user.addresses.push(address);
         },
         setCartAddress: function(index) {
            if (!retVal.loggedIn) {
               return "Favor de ingresar al sistema.";
            }
            retVal.user.cart.toAddress = index;
         }
      };
      return retVal;
   }]);
})()
