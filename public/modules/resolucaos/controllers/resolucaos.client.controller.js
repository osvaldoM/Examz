'use strict';

// Resolucaos controller
angular.module('resolucaos').controller('ResolucaosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resolucaos',
	function($scope, $stateParams, $location, Authentication, Resolucaos) {
		$scope.authentication = Authentication;

		// Create new Resolucao
		$scope.create = function() {
			// Create new Resolucao object
			var resolucao = new Resolucaos ({
				name: this.name
			});

			// Redirect after save
			resolucao.$save(function(response) {
				$location.path('resolucaos/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Resolucao
		$scope.remove = function(resolucao) {
			if ( resolucao ) { 
				resolucao.$remove();

				for (var i in $scope.resolucaos) {
					if ($scope.resolucaos [i] === resolucao) {
						$scope.resolucaos.splice(i, 1);
					}
				}
			} else {
				$scope.resolucao.$remove(function() {
					$location.path('resolucaos');
				});
			}
		};

		// Update existing Resolucao
		$scope.update = function() {
			var resolucao = $scope.resolucao;

			resolucao.$update(function() {
				$location.path('resolucaos/' + resolucao._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Resolucaos
		$scope.find = function() {
			$scope.resolucaos = Resolucaos.query();
		};

		// Find existing Resolucao
		$scope.findOne = function() {
			$scope.resolucao = Resolucaos.get({ 
				resolucaoId: $stateParams.resolucaoId
			});
		};
	}
]);