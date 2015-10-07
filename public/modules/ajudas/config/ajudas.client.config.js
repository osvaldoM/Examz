'use strict';

// Configuring the Articles module
angular.module('ajudas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Ajudas', 'ajudas', 'dropdown', '/ajudas(/create)?');
		Menus.addSubMenuItem('topbar', 'ajudas', 'Lista Ajudas', 'ajudas');
		Menus.addSubMenuItem('topbar', 'ajudas', 'Nova Ajuda', 'ajudas/create');
	}
]);