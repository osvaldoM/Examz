'use strict';

// Curso disciplinas controller
angular.module('curso-disciplinas').controller('CursoDisciplinasController', ['$scope', '$stateParams', '$location', 'Authentication', 'CursoDisciplinas',
	function($scope, $stateParams, $location, Authentication, CursoDisciplinas) {
		$scope.authentication = Authentication;

		// Create new Curso disciplina
		$scope.create = function() {
			// Create new Curso disciplina object
			var cursoDisciplina = new CursoDisciplinas ({
				name: this.name
			});

			// Redirect after save
			cursoDisciplina.$save(function(response) {
				$location.path('curso-disciplinas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Curso disciplina
		$scope.remove = function(cursoDisciplina) {
			if ( cursoDisciplina ) { 
				cursoDisciplina.$remove();

				for (var i in $scope.cursoDisciplinas) {
					if ($scope.cursoDisciplinas [i] === cursoDisciplina) {
						$scope.cursoDisciplinas.splice(i, 1);
					}
				}
			} else {
				$scope.cursoDisciplina.$remove(function() {
					$location.path('curso-disciplinas');
				});
			}
		};

		// Update existing Curso disciplina
		$scope.update = function() {
			var cursoDisciplina = $scope.cursoDisciplina;

			cursoDisciplina.$update(function() {
				$location.path('curso-disciplinas/' + cursoDisciplina._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Curso disciplinas
		$scope.find = function() {
			$scope.cursoDisciplinas = CursoDisciplinas.query();
		};

		// Find existing Curso disciplina
		$scope.findOne = function() {
			$scope.cursoDisciplina = CursoDisciplinas.get({ 
				cursoDisciplinaId: $stateParams.cursoDisciplinaId
			});
		};
	}
]);