//states: regular, alarm, success.
(function(){

  //default icons and text definitions
  var defaultFooterText = 'México <i class="fa fa-copyright" aria-hidden="true"></i> 2016, Chilines.';
  var alarmIcon = '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>';
  var successIcon = '<i class="fa fa-check" aria-hidden="true"></i>';
  var warningIcon = '<i class="fa fa-exclamation-circle" aria-hidden="true"></i>';

  function notificationText(notification) {
    var retVal = notification.value;
    switch (notification.state) {
      case "alarm":
        retVal = alarmIcon + " " + retVal;
        break;
      case "success":
        retVal = successIcon + " " + retVal;
        break;
      case "warning":
        retVal = warningIcon + " " + retVal;
      default: //do nothing
    }
    return retVal;
  }

  function updateClasses(notification) {
    $("#footer").removeClass();
    $("#footer").toggleClass(notification.state);
  }

  function displayNotification(notification) {
    var html = notificationText(notification);
    $("#footerSpan").html(html);
    updateClasses(notification);
  }

  function setDefault() {
    $("#footerSpan").html(defaultFooterText);
    $("#footer").removeClass();
  }

  angular.module("chilinesApp").service("notificationService", [ "$interval", function(interval){

      setDefault();

      var notificationQueue = [];
      var waken = false;

      function awake() {
        var notification = notificationQueue.shift();
        displayNotification(notification);
        waken = true;
        var timer = new interval(function digest(){
          if (notificationQueue.length==0) {
            waken = false;
            interval.cancel(timer);
            setDefault();
          }
          else {
            var notification = notificationQueue.shift();
            displayNotification(notification);
          }
        }, retVal.delay);
      }

      var retVal = {
        delay: 2000,
        pushNotification: function(notification, state) {
          if (!state) state = "regular";
          notificationQueue.push({value:notification, state:state});
          if (!waken) awake();
        }
      };

      return retVal;
  }]);
})()
