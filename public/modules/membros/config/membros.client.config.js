'use strict';

// Membros module config
angular.module('membros').run(['Menus',
	function(Menus) {
		// Config logic
		// ...
		Menus.addMenuItem('topbar', 'Membros', 'membros', 'dropdown', '/membros(/create)?');
		Menus.addSubMenuItem('topbar', 'membros', 'List Membros', 'membros');
		Menus.addSubMenuItem('topbar', 'membros', 'New Membro', 'membros/create');
	}
]);