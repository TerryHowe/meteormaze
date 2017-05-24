import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './mazeList.html';
import { Rooms } from '../../api/rooms.js';
 
class MazeCtrl {
  constructor($scope) {
    $scope.viewModel(this);
    this.helpers({
      rooms() {
        return Rooms.find({});
      }
    })
  }

  addRoom(newRoomId, newRoomX, newRoomY) {
    Rooms.insert({
      id: newRoomId,
      x: newRoomX,
      y: newRoomY
    });
 
    // Clear form
    this.newTaskId = '';
    this.newTaskX = '';
    this.newTaskY = '';
  }
}
 
export default angular.module('maze', [
  angularMeteor
])
  .component('mazeList', {
    templateUrl: 'imports/components/mazeList/mazeList.html',
    controller: ['$scope', MazeCtrl]
  });
