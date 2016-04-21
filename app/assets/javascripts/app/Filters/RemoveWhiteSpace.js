function removeWhiteSpace(){
  return function(string) {
    if (!angular.isString(string)) {
        return string;
    }
    return string.replace(/[\s]/g, ' ');
  };
}

angular
  .module('app')
  .filter('removeWhiteSpace', removeWhiteSpace);
