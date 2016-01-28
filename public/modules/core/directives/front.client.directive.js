'use strict';


angular.module('core').directive('front', function() {
	return {
		restrict: 'E',
		template: '<div class="front tile" ng-transclude> aa</div>',
		transclude: true
	};
});