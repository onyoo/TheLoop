function EventsService($http){

  this.getEvents = function(){
    return $http({
      method: 'jsonp',
      url: 'http://api.eventful.com/json/events/search?app_key=ckR7kwV6Ppwmq2sK&location=84074',
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
