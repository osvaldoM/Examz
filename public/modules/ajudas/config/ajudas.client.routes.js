'use strict';

//Setting up route
angular.module('ajudas').config(['$stateProvider',
	function($stateProvider) {
		// Ajudas state routing
		$stateProvider.
		state('listAjudas', {
			url: '/ajudas',
			templateUrl: 'modules/ajudas/views/list-ajudas.client.view.html'
		}).
		state('createAjuda', {
			url: '/ajudas/create',
			templateUrl: 'modules/ajudas/views/create-ajuda.client.view.html'
		}).
		state('viewAjuda', {
			url: '/ajudas/:ajudaId',
			templateUrl: 'modules/ajudas/views/view-ajuda.client.view.html'
		}).
		state('editAjuda', {
			url: '/ajudas/:ajudaId/edit',
			templateUrl: 'modules/ajudas/views/edit-ajuda.client.view.html'
		});
	}
]);