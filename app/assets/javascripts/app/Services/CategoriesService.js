function CategoriesService($http) {
  this.getCategory = function(category_id) {
    return $http.get('http://localhost:3000/api/v1/categories/' + category_id);
  };

  this.getCategories = function() {
    return $http.get('/api/v1/categories');
  };

  this.assignCategory = function(api_event){
    if (api_event.category === undefined){
      return  api_event.categories.category[0].name.replace('&amp; ', '');
     } else {
      return api_event.category.name;
    };
  };
};

angular
  .module('app')
  .service('CategoriesService', ['$http', CategoriesService]);
