'use strict';

angular.module('membros').factory('Membros', ['$resource',
	function($resource) {
		// Membros service logic
		// ...

		// Public API

	return $resource('membros/:membroId', {
			membroId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		//return $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});
	}
]);