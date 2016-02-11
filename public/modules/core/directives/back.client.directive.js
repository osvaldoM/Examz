'use strict';


angular.module('core').directive('back', function() {
	return {
		restrict: 'E',
		template: '<div class="back tile" ng-transclude> hello</div>',
		transclude: true
	};

});