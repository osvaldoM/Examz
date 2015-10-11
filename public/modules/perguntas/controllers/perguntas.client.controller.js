'use strict';

// Perguntas controller
angular.module('perguntas').controller('PerguntasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Perguntas','Exame',
	function($scope, $stateParams, $location, Authentication, Perguntas,Exame) {
		$scope.authentication = Authentication;

		// Create new Pergunta
		$scope.create = function() {
			// Create new Pergunta object
			var pergunta = new Perguntas ({
				texto: this.texto,
				imagem: this.imagem,
				exame:'5613fa75d6d115f81262e96a'
			});

			// Redirect after save
			pergunta.$save(function(response) {
				$location.path('perguntas/' + response._id);

				// Clear form fields
				$scope.texto = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Pergunta
		$scope.remove = function(pergunta) {
			if ( pergunta ) { 
				pergunta.$remove();

				for (var i in $scope.perguntas) {
					if ($scope.perguntas [i] === pergunta) {
						$scope.perguntas.splice(i, 1);
					}
				}
			} else {
				$scope.pergunta.$remove(function() {
					$location.path('perguntas');
				});
			}
		};

		// Update existing Pergunta
		$scope.update = function() {
			var pergunta = $scope.pergunta;

			pergunta.$update(function() {
				$location.path('perguntas/' + pergunta._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Perguntas
		$scope.find = function() {
			$scope.perguntas = Perguntas.query();
		};

		// Find existing Pergunta
		$scope.findOne = function() {
			$scope.pergunta = Perguntas.get({ 
				perguntaId: $stateParams.perguntaId
			});
		};
	}
]);