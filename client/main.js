import angular from 'angular';
import angularMeteor from 'angular-meteor';
import mazeList from '../imports/components/mazeList/mazeList';
 
angular.module('simple-maze', [
  angularMeteor,
  mazeList.name
]);
