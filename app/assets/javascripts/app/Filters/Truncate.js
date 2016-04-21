function Truncate () {
  return function (text, length, end) {
    var maxLength = 250;
    var ellipsis = "...";

    if (text.length <= maxLength || text.length - ellipsis.length <= maxLength) {
      return text;
    }
    else {
      return String(text).substring(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
}

angular
  .module('app')
  .filter('truncate', Truncate);
