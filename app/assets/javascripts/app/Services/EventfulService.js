function EventfulService($http){
  var baseUrl = 'https://api.eventful.com/json/events/';

  this.eventfulEvents = function(zipcode){
    return $http({
      method: 'jsonp',
      url: baseUrl + '/search?app_key=ckR7kwV6Ppwmq2sK&location=' + zipcode,
      params: { format: 'jsonp', callback: 'JSON_CALLBACK' }
    });
  };

  this.getEvent = function(id){
    return $http({
      method: 'jsonp',
      url: baseUrl + '/get?app_key=ckR7kwV6Ppwmq2sK&id=' + id,
      params: { format: 'jsonp', callback: 'JSON_CALLBACK' }
    });
  };
}

angular
  .module('app')
  .service('EventfulService', EventfulService);
