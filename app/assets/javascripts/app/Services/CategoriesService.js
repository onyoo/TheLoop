function CategoriesService($http) {

  this.getCategories = function() {
    return $http({
      method: 'get',
      url: 'http://localhost:3000/api/v1/categories'
    });
  };

};

angular
  .module('app')
  .service('CategoriesService', CategoriesService);
