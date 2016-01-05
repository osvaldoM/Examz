'use strict';

// Perguntas controller
angular.module('perguntas').controller('PerguntasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Perguntas','Exames',
	function($scope, $stateParams, $location, Authentication, Perguntas,Exames) {
		$scope.authentication = Authentication;

		// Create new Pergunta
		$scope.create = function() {
			// Create new Pergunta object
			var pergunta = new Perguntas ({
				texto: this.texto,
				imagem: this.imagem,
				_exame: this.exame._id
			});

			// Redirect after save
			pergunta.$save(function(response) {
				

				// Clear form fields
				$scope.texto = '';
				$location.path('perguntas/create');
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


		// function that returns list of exams
        $scope.listaExames=function(){
			$scope.exames=Exames.listar();
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
		$scope.findOneOrigi = function() {
			$scope.pergunta = Perguntas.getOrigi({ 
				pergunta: $stateParams.perguntaId
			});
		};


		// Find an existing Pergunta without population from the back end
		//still need to understand how the get method implementation works in order to pass the parameter
		$scope.findOne = function() {
			$scope.pergunta = Perguntas.get({ 
				perguntaId: $stateParams.perguntaId
			});
		};

		$scope.callFunctions= function(){
			$scope.findOne();
			$scope.listaExames();
		}
		//direct to create
		$scope.direct= function(){
			$location.path('perguntas/create');
		};
	}
]);