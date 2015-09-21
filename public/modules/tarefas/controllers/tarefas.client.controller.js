'use strict';

angular.module('tarefas').controller('TarefasController', ['$scope','$stateParams','$location','Tarefas',
	function($scope,'$location',Tarefas) {
		// Controller Logic
		// ...

		//Criar categoria
		$scope.create= function(){
			
			//Criamos a tarefa
			var tarefa = new  Tarefas({
				titulo:this.titulo;
				descriccao:this.descriccao;
				prazo:this.prazo;
			});

			tarefa.save(function(response){
				//redireccionamos para a pag. tarefas
				$location.path='tarefas';
			},function(errorResponse){
				$scope.error=errorResponse.data.message;
			});

		};

		$scope.delete= function(tarefa){
			if(tarefa){
				tarefa.$remove();
				
				for(var i in $scope.tarefas){
					if($scope.tarefas[i]===tarefa)
						$scope.tarefas.splice(i,1);
				}

			} else{
				$scope.tarefa.$remove(function(){
					$location.path('tarefas');
				});
			} 
		};

		$scope.update= function(){
			var tarefa = $scope.tarefa;
			tarefa.$update(function(response){
				$location.path='tarefas';
			},function(errorResponse){
				$scope.error=error.data.message;
			});
		}

		$scope.find= function(){
			$scope.tarefas=Tarefas.query();
		};

		$scope.findOne= function(){
			$scope.tarefa=Tarefas.get({
				tarefaId=$stateParams.tarefaId
			});
		};

		$scope.open = function($event) {
		  $scope.status.opened = true;
		};
	}
]);