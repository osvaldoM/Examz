'use strict';

angular.module('tarefas').factory('Tarefas', ['$resource',
	function($resource) {
		// Tarefas service logic
		// ...

		// Public API	
		return {
			$resource('tarefas/:tarefaId',{tarefaId:'@_id'},
				{update:{
					method:'PUT'
				}});			}
		
	}
]);