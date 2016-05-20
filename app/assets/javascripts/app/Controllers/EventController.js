function EventController(event, $scope, $state, Auth, UserEvent, CategoriesService, MapService, VenuesService, Comment){
  var ctrl = this;

  // Set data
  ctrl.data = event.data;
  ctrl.date = Date.parse(ctrl.data.start_time);
  ctrl.data.street_address = ctrl.data.street_address || ctrl.data.address;

  if (ctrl.data.images != undefined){
    ctrl.data.image_url = ctrl.data.images.image.thumb.url;
  };

  if (ctrl.data.categories || ctrl.data.category) {
    ctrl.category = CategoriesService.assignCategory(ctrl.data);
  };

  if (ctrl.data.venue_name || ctrl.data.venue){
    ctrl.venue = VenuesService.assignVenue(ctrl.data);
  };

  // Map
  $scope.signedIn = Auth.isAuthenticated;
  $scope.map = MapService.constructMap(ctrl.data, 15);
  $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };

  MapService.constructMarkers([ctrl.data]).then(function(res){
    $scope.markers = res;
  });

  // Actions
  ctrl.addEvent = function(){
    this.data.category = this.category;
    UserEvent.create({event: this.data}, function(res){
      $state.go('home.myEvents');
    });
  };

  ctrl.addComment = function() {
    this.comment.$save(function(comment){
       ctrl.data.comments.push(comment);
    });
    setComment(ctrl.user);
  };

  function setAttending(user){
    ctrl.attending = ctrl.data.users.some(function(attendingUser) {
      return user.id == attendingUser.id;
    });
  };

  function setEditable(user){
    ctrl.editable = user.id == ctrl.data.creator && ctrl.data.api_id == undefined;
  };

  function setComment(user){
    ctrl.comment = new Comment({user_id: user.id, event_id: ctrl.data.id});
  };

  Auth.currentUser().then(function(user){
    ctrl.user = user;
    setComment(user);
    setEditable(user);
    if (ctrl.data.users){ setAttending(user) };
  });

  // Edit form
  $scope.$on('closeEditForm', function(emitEvent, data) {
    $scope.editEvent = false;
  });

  $scope.$on('eventUpdated', function(emitEvent, data) {
    ctrl.data = data;
    $scope.editEvent = false;
  });
};

angular
.module('app')
.controller('EventController', ['event', '$scope', '$state', 'Auth', 'UserEvent', 'CategoriesService', 'MapService', 'VenuesService', 'Comment', EventController]);
