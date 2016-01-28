'use strict';


angular.module('core').directive('back', function() {
	return {
		restrict: 'E',
		template: '<div class="back tile" ng-transclude></div>',
		transclude: true
	};

});