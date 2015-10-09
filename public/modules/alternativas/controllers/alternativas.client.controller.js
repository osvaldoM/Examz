'use strict';

// Alternativas controller
angular.module('alternativas').controller('AlternativasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Alternativas','Pergunta',
	function($scope, $stateParams, $location, Authentication, Alternativas, Pergunta) {
		$scope.authentication = Authentication;

		// Create new Alternativa
		$scope.create = function() {
			// Create new Alternativa object
			var alternativa = new Alternativas ({
				conteudo: this.conteudo,
				isCorrecte: this.isCorrecte,
				letra: this.letra,
				imagen: this.imagen,
				//pergunta: pergunta_id
				pergunta: 'primeiro nome?'

			});

			// Redirect after save
			alternativa.$save(function(response) {
				$location.path('alternativas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Alternativa
		$scope.remove = function(alternativa) {
			if ( alternativa ) { 
				alternativa.$remove();

				for (var i in $scope.alternativas) {
					if ($scope.alternativas [i] === alternativa) {
						$scope.alternativas.splice(i, 1);
					}
				}
			} else {
				$scope.alternativa.$remove(function() {
					$location.path('alternativas');
				});
			}
		};

		// Update existing Alternativa
		$scope.update = function() {
			var alternativa = $scope.alternativa;

			alternativa.$update(function() {
				$location.path('alternativas/' + alternativa._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Alternativas
		$scope.find = function() {
			$scope.alternativas = Alternativas.query();
		};

		// Find existing Alternativa
		$scope.findOne = function() {
			$scope.alternativa = Alternativas.get({ 
				alternativaId: $stateParams.alternativaId
			});
		};
	}
]);