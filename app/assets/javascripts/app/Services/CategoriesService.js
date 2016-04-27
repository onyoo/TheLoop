  function CategoriesService($http) {

  this.getCategories = function() {
    return $http.get('https://localhost:3000/api/v1/categories');
  };

};

angular
  .module('app')
  .service('CategoriesService', ['$http', CategoriesService]);
