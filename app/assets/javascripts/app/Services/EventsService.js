function EventsService($http){

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
