angular
  .app('app')
  .controller('EventsController', EventsController);

function EventsController(story){
  this.data = story.data
};