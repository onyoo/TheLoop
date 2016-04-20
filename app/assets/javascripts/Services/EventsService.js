function EventsService($http){

  this.getEvents = function(){
    return $http.get('http://api.eventful.com/json/events/search?app_key=ckR7kwV6Ppwmq2sK&location=84074');
  };
}

angular
  .module('app')
  .service('EventsService', EventsService);
