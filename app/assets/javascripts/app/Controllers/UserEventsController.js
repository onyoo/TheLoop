function UserEventsController(User, Auth) {

  var ctrl = this;
    
  ctrl.user = Auth.currentUser().then(function(user) {
    ctrl.events = User.get({ 'id': user.id });

  });

  ctrl.removeEvent = function(myEvent) {
      console.log('Event remove clicked');
      debugger;
      User.removeEvent = User.remove(myEvent);
  };

};


angular
.module('app')
.controller('UserEventsController', UserEventsController);



// ctrl.addEvent = function(ourEvent){
  
//     ctrl.event = UserEvent.create(ourEvent).then(function(resp){
//       $state.go('home.events');
//     });
    
//     // ctrl.user = Auth.currentUser().then(function(user) {
//     //   ctrl.event.$save().then(function(resp) {
        
//     //     console.log('Event saved!');
//     //     $state.go('home.events');
//     //   }, function(error) {
//     //     console.log("There was an error saving: " + error);
//     //   });
//     // });
//   };