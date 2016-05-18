function EventsController($scope, $location, EventsService, MapService, GeoLocationService, $anchorScroll){
  var ctrl = this;

  function assignMarkers(events){
    return MapService.constructMarkers(ctrl.allEvents).then(function(res){
      $scope.markers = res;
    });
  };

  ctrl.zipcodeSearch = function(){
    EventsService.getEvents(this.zipcode).then(function(res){
      ctrl.allEvents = res;
      $scope.map = MapService.constructMap(ctrl.allEvents[0]);
      assignMarkers(ctrl.allEvents);
    });
  };

  if(!!navigator.geolocation) {
    $scope.loading = true;

    GeoLocationService.getEventsByGeoLocation().then(function(res){
      ctrl.allEvents = res.allEvents;
      $scope.map = res.map;
      $scope.options = { scrollwheel: true, scrollwheel: true, mapMakers: true };
      assignMarkers(ctrl.allEvents);

      $scope.loading = false;
    });
  } else {
    console.log('Sorry, your browser does not support geolocation.');
    document.getElementById('your_location_map').innerHTML = 'Sorry, Your Browser Does Not Support Geolocation.';
  };

  $scope.markerClick = function(map, event, marker) {
    var newHash = 'anchor' + marker.id;
    if ($location.hash() !== newHash) {
      $location.hash(newHash);
      $('li.active-marker').removeClass('active-marker')
      $('#' + newHash).addClass('active-marker');
    } else {
      $anchorScroll();
    };
  };
};

angular
  .module('app')
  .controller('EventsController', ['$scope', '$location', 'EventsService', 'MapService', 'GeoLocationService', '$anchorScroll', EventsController]);

  // ctrl.markerClick = function(map, event, marker) {
  //   var newHash = 'anchor' + marker.id;
  //
  //   // console.log(ctrl);
  //   // ctrl.allEvents[marker.id].highlight = true
  //   if ($location.hash() !== newHash) {
  //     $location.hash(newHash);
  //     debugger;
  //     $('li.active-marker').removeClass('active-marker')
  //     $('#' + newHash).addClass('active-marker');
  //   } else {
  //     $anchorScroll();
  //   };
  // };
