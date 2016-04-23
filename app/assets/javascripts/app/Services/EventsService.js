function EventsService($http){

  this.getLoopEvent = function(id) {
    return $http({
      method: 'get',
      url: 'http://localhost:3000/api/v1/events/' + id
    });
  }

  this.checkLoopEvent = function(api_id) {
    return $http({
      method: 'get',
      url: 'http://localhost:3000/api/v1/events/' + api_id + '/check'
    });
  }

  this.loopEvents = function(coords){
    return $http({
      method: 'get',
      url: 'http://localhost:3000/api/v1/events?location=' + coords
    });
  };

  this.loopEventsZipcode = function(zip){
    return $http({
      method: 'get',
      url: 'http://localhost:3000/api/v1/events?zipcode=' + zip
    });
  };

  this.byZipcode = function(zipcode){
    return $http({
      method: 'jsonp',
      url: 'http://api.eventful.com/json/events/search?app_key=ckR7kwV6Ppwmq2sK&location=' + zipcode,
      params: {
        format: 'jsonp',
        callback: 'JSON_CALLBACK'
      }
    });
  };

  this.getEvent = function(id){
    return $http({
      method: 'jsonp',
      url: 'http://api.eventful.com/json/events/get?app_key=ckR7kwV6Ppwmq2sK&id=' + id,
      params: {
        format: 'jsonp',
        callback: 'JSON_CALLBACK'
      }
    });
  };
}

angular
  .module('app')
  .service('EventsService', EventsService);
