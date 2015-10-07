'use strict';

//Disciplinas service used to communicate Disciplinas REST endpoints
angular.module('disciplinas').factory('Disciplinas', ['$resource',
	function($resource) {
		return $resource('disciplinas/:disciplinaId', { disciplinaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);