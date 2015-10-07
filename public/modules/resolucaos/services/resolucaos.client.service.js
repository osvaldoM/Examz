'use strict';

//Resolucaos service used to communicate Resolucaos REST endpoints
angular.module('resolucaos').factory('Resolucaos', ['$resource',
	function($resource) {
		return $resource('resolucaos/:resolucaoId', { resolucaoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);