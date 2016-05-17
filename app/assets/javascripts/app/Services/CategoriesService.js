  function CategoriesService($http) {

  this.getCategory = function(category_id) {
    return $http.get('http://localhost:3000/api/v1/categories/' + category_id);
  };

  this.getCategories = function() {
    return $http.get('/api/v1/categories');
  };
};

angular
  .module('app')
  .service('CategoriesService', ['$http', CategoriesService]);
