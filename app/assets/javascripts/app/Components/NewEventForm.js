var NewEventForm = {
  templateUrl: 'events/forms/new_event.html',
  controller: function($scope, $state, Auth, UserEvent, CategoriesService, $rootScope) {
    var ctrl = this;
    ctrl.$inject = ['$scope', '$state', 'Auth', 'UserEvent', 'CategoriesService'];

    Auth.currentUser().then(function(resp) {
      ctrl.creator = resp.id;
    });

    CategoriesService.getCategories().then(function(res){
      ctrl.categories = res.data;
    });

    function setData(newEvent){
      debugger;
      newEvent.creator = ctrl.creator;
      newEvent.category = newEvent.category.name;
      return newEvent;
    };

    ctrl.createEvent = function() {
      UserEvent.create({event: setData(this.data)}, function(res){
        $rootScope.$broadcast("newEvent", res);
        $scope.closeForm();
        $state.go('home.myEvents');
        ctrl.data = {};
      }, function(error) {
        console.log(error);
      });
    };

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };
  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
