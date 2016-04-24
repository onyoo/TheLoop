var NewEventForm = {
  templateUrl: 'events/new_event_form.html',
  controller: function(UserEvent, $scope, CategoriesService, $state, Auth) {
    var ctrl = this;

    $scope.closeForm = function() {
      $scope.$emit('closeForm', false);
    };

    ctrl.allCategories = '';

    ctrl.categories = CategoriesService.getCategories().then(function(res){
      ctrl.allCategories = res.data.map(function(category){
        return category.name.replace('&amp; ', '');
      });
    });

    // ctrl.allCategories = "";
    //
    // ctrl.categories = CategoriesService.getCategories().then(function(res){
    //   var categories = [];
    //   res.data.forEach(function(category){
    //     categories.push(category.name.replace('&amp; ', ''));
    //   })
    //   ctrl.allCategories = categories;
    // });

    $scope.selectedCountry = [];

    ctrl.currentUser = Auth.currentUser().then(function(resp) {
      ctrl.creator = resp.id;
    }, function(error) {
      console.log(error);
    })

    ctrl.createEvent = function() {
      ctrl.formData.creator = ctrl.creator
      UserEvent.create(ctrl.formData, function(res){
        $scope.$emit('closeForm', false);
        $state.go('home.myEvents');
        ctrl.formData = {};
      }, function(error) {
        console.log(error);
      });
    };

  },
  controllerAs: 'eventForm'
};

angular
  .module('app')
  .component('newEventForm', NewEventForm);
