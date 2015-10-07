'use strict';

// Configuring the Articles module
angular.module('alternativas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Alternativas', 'alternativas', 'dropdown', '/alternativas(/create)?');
		Menus.addSubMenuItem('topbar', 'alternativas', 'Lista Alternativas', 'alternativas');
		Menus.addSubMenuItem('topbar', 'alternativas', 'Nova Alternativa', 'alternativas/create');
	}
]);