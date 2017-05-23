import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './mazeList.html';
 
class MazeCtrl {
  constructor() {
    this.tasks = [{
      text: 'This is task 1'
    }, {
      text: 'This is task 2'
    }, {
      text: 'This is task 3'
    }];
  }
}
 
export default angular.module('maze', [
  angularMeteor
])
  .component('mazeList', {
    templateUrl: 'imports/components/mazeList/mazeList.html',
    controller: MazeCtrl
  });
