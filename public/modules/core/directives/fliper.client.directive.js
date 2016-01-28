'use strict';

angular.module('core').directive('flipper', function() {
	return {
		restrict: 'E',
		template: '<div class="flipper" ng-transclude ng-class="{ flipped: flipped }"></div>',
		transclude: true,
		scope: {
			flipped: '='
		}
	};
});