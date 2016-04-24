function CategoriesService($http) {

  this.getCategories = function() {
    return $http.get('http://localhost:3000/api/v1/categories');
  };

};

angular
  .module('app')
  .service('CategoriesService', CategoriesService);
