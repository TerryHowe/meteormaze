import angular from 'angular';
import angularMeteor from 'angular-meteor';
import textView from '../imports/components/textView/textView';
 
angular.module('text-maze', [
  angularMeteor,
  textView.name
]);
