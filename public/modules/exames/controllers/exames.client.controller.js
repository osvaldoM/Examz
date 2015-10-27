'use strict';

// Exames controller
angular.module('exames').controller('ExamesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Exames','Disciplinas','Perguntas',
	function($scope, $stateParams, $location, Authentication, Exames, Disciplinas,Perguntas) {
		$scope.authentication = Authentication;

		// Create new Exame
		$scope.create = function() {
			// Create new Exame object
			var exame = new Exames ({
				ano: this.ano,
				instruccoes:this.instruccoes,
				tempo:this.tempo,
				disciplina:this.disciplina._id
			});

			// Redirect after save
			exame.$save(function(response) {
				$location.path('exames/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Exame
		$scope.remove = function(exame) {
			if ( exame ) { 
				exame.$remove();

				for (var i in $scope.exames) {
					if ($scope.exames [i] === exame) {
						$scope.exames.splice(i, 1);
					}
				}
			} else {
				$scope.exame.$remove(function() {
					$location.path('exames');
				});
			}
		};


		$scope.listaDisciplinas=function(){
			$scope.disciplinas=Disciplinas.listar();
			};

		// Update existing Exame
		$scope.update = function() {
			var exame = $scope.exame;

			exame.$update(function() {
				$location.path('exames/' + exame._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Exames
		$scope.find = function() {
			$scope.exames = Exames.query();
		};

		// Find existing Exame
		$scope.findOne = function() {
			$scope.exame = Exames.get({ 
				exameId: $stateParams.exameId
			});
	//	$scope.exame.perguntas=Perguntas.byExame({
	//		perguntaId:$scope.exame._id
	//	});
		    // $scope.exame.perguntas=Perguntas.query();
		};
	}
]);