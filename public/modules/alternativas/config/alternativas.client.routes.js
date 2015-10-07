'use strict';

//Setting up route
angular.module('alternativas').config(['$stateProvider',
	function($stateProvider) {
		// Alternativas state routing
		$stateProvider.
		state('listAlternativas', {
			url: '/alternativas',
			templateUrl: 'modules/alternativas/views/list-alternativas.client.view.html'
		}).
		state('createAlternativa', {
			url: '/alternativas/create',
			templateUrl: 'modules/alternativas/views/create-alternativa.client.view.html'
		}).
		state('viewAlternativa', {
			url: '/alternativas/:alternativaId',
			templateUrl: 'modules/alternativas/views/view-alternativa.client.view.html'
		}).
		state('editAlternativa', {
			url: '/alternativas/:alternativaId/edit',
			templateUrl: 'modules/alternativas/views/edit-alternativa.client.view.html'
		});
	}
]);