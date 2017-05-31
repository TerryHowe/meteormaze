import angular from 'angular';
import angularMeteor from 'angular-meteor';
import textView from '../imports/components/textView/textView';
 
var app = angular.module('text-maze', [
  angularMeteor,
  textView.name
]);

app.directive('keypressEvents', [
  '$document',
  '$rootScope',
  function($document, $rootScope) {
    return {
      restrict: 'A',
      link: function() {
        $document.bind('keypress', function(e) {
          alert('Got keypress:');
          textView.controller.handleKeyDown(e);
          $rootScope.$broadcast('keypress', e);
          $rootScope.$broadcast('keypress:' + e.which, e);
        });
      }
    };
  }
]);
