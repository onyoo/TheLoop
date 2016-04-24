'use strict';
/**
 * @name pvpCountryPicker
 * @desc Generate a list of states as options of the select element.
 * @author Pablo Villoslada Puigcerber <pablo85@gmail.com>
 *
 * @param {string} [pvpCountryPicker=abbr] The value to which ngModel is bound being the options 'abbr', 'alpha3',
 * 'numeric' and 'name'. If not specified, 'abbr' is used as default.
 * @example
 * <select ng-model="selectedCountry" pvp-country-picker="name"></select>
 */
angular.module('statePicker',[])
  .provider('stateProvider', function stateProvider() {
    var states = [
      {"name":"","abbr":''},
      {"name":"Alabama","abbr":'AK'},
      {"name":"Alaska","abbr":'AZ'},
      {"name":"Arizona","abbr":'AR'},
      {"name":"Arkansas","abbr":'AR'},
      {"name":"California","abbr":"CA"},
      {"name":"Colorado","abbr":"CO"},
      {"name":"Connecticut","abbr":"CT"},
      {"name":"Delaware","abbr":"DE"},
      {"name":"District Of Columbia","abbr":"DC"},
      {"name":"Florida","abbr":"AG"},
      {"name":"Georgia","abbr":"AG"},
      {"name":"Hawaii","abbr":"AR"},
      {"name":"Idaho","abbr":"AM"},
      {"name":"Illinois","abbr":"AW"},
      {"name":"Indiana","abbr":"AU"},
      {"name":"Iowa","abbr":"AT"},
      {"name":"Kansas","abbr":"KS"},
      {"name":"Kentucky","abbr":"KY"},
      {"name":"Louisiana","abbr":"LA"},
      {"name":"Maine","abbr":"ME"},
      {"name":"Maryland","abbr":"MD"},
      {"name":"Massachusetts","abbr":"MA"},
      {"name":"Michigan","abbr":"MI"},
      {"name":"Minnesota","abbr":"MN"},
      {"name":"Mississippi","abbr":"MS"},
      {"name":"Missouri","abbr":"MO"},
      {"name":"Montana","abbr":"MT"},
      {"name":"Nebraska","abbr":"NE"},
      {"name":"Nevada","abbr":"NV"},
      {"name":"New Hampshire","abbr":"NH"},
      {"name":"New Jersey","abbr":"NJ"},
      {"name":"New Mexico","abbr":"NM"},
      {"name":"New York","abbr":"NY"},
      {"name":"North Carolina","abbr":"NC"},
      {"name":"North Dakota","abbr":"ND"},
      {"name":"Ohio","abbr":"OH"},
      {"name":"Oklahoma","abbr":"OK"},
      {"name":"Oregon","abbr":"OR"},
      {"name":"Pennsylvania","abbr":"PA"},
      {"name":"Rhode Island","abbr":"RI"},
      {"name":"South Carolina","abbr":"SC"},
      {"name":"South Dakota","abbr":"SD"},
      {"name":"Tennessee","abbr":"TN"},
      {"name":"Texas","abbr":"TX"},
      {"name":"Utah","abbr":"UT"},
      {"name":"Vermont","abbr":"VT"},
      {"name":"Virginia","abbr":"VA"},
      {"name":"Washington","abbr":"WA"},
      {"name":"West Virginia","abbr":"WV"},
      {"name":"Wisconsin","abbr":"WI"},
      {"name":"Wyoming","abbr":"WY"},
    ];
    return {
      setStates: function(listOfStates) {
        states = listOfStates;
      },
      $get: function() {
        return {
          getStates: function() {
            return states;
          }
        };
      }
    };
  })
  .directive('statePickerDirective', ['$compile', function($compile) {
    var PRIORITY = 1;
    return {
      priority: PRIORITY,
      terminal: true,
      controller: ['$scope', 'stateProvider', function($scope, stateProvider) {
        $scope.states = stateProvider.getStates();
      }],
      compile: function (tElement, tAttrs) {
        if(! tAttrs.stateProvider) {
          tAttrs.stateProvider = 'abbr';
        }
        var ngOptions = 'state.' + tAttrs.stateProvider + ' as state.name for state in states';
        tAttrs.$set('ngOptions',  ngOptions);

        return function postLink(scope, iElement) {
          $compile(iElement, null, PRIORITY)(scope);
        };
      },
      restrict: 'A'
    };
  }]);
