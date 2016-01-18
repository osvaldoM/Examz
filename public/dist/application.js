'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'examz';
	var applicationModuleVendorDependencies = ['ngResource', 'ngCookies',  'ngAnimate',  'ngTouch',  'ngSanitize',  'ui.router', 'ui.bootstrap', 'ui.utils'];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();
'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('ajudas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('alternativas');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('articles');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('clemprestimos');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('clientes');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('curso-disciplinas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('cursos');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('devolucaos');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('disciplinas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('exames');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('filmes');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('home');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('membros');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('pergunta-resolvidas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('perguntas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('resolucaos');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tag-perguntas');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tags');
'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('tarefas');

'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('teste');

'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
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
'use strict';

//Setting up route
angular.module('ajudas').config(['$stateProvider',
	function($stateProvider) {
		// Ajudas state routing
		$stateProvider.
		state('listAjudas', {
			url: '/ajudas',
			templateUrl: 'modules/ajudas/views/list-ajudas.client.view.html'
		}).
		state('createAjuda', {
			url: '/ajudas/create',
			templateUrl: 'modules/ajudas/views/create-ajuda.client.view.html'
		}).
		state('viewAjuda', {
			url: '/ajudas/:ajudaId',
			templateUrl: 'modules/ajudas/views/view-ajuda.client.view.html'
		}).
		state('editAjuda', {
			url: '/ajudas/:ajudaId/edit',
			templateUrl: 'modules/ajudas/views/edit-ajuda.client.view.html'
		});
	}
]);
'use strict';

// Ajudas controller
angular.module('ajudas').controller('AjudasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Ajudas','Perguntas',
	function($scope, $stateParams, $location, Authentication, Ajudas,Perguntas) {
		$scope.authentication = Authentication;

		// Create new Ajuda
		$scope.create = function() {
			// Create new Ajuda object
			var ajuda = new Ajudas ({
				tipo: this.tipo,
				titulo: this.titulo,
				conteudo: this.conteudo,
				_pergunta:this.pergunta._id

			
			});
			console.log(this.tipo);

			// Redirect after save
			ajuda.$save(function(response) {
				

				// Clear form fields
				$scope.tipo = '';
				$scope.titulo='';
				$scope.conteudo='';


				$location.path('ajudas/create');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	
            $scope.listPerguntas=function(){
			$scope.perguntas=Perguntas.listar();
			};

		// Remove existing Ajuda
		$scope.remove = function(ajuda) {
			if ( ajuda ) { 
				ajuda.$remove();

				for (var i in $scope.ajudas) {
					if ($scope.ajudas [i] === ajuda) {
						$scope.ajudas.splice(i, 1);
					}
				}
			} else {
				$scope.ajuda.$remove(function() {
					$location.path('ajudas');
				});
			}
		};

		// Update existing Ajuda
		$scope.update = function() {
			var ajuda = $scope.ajuda;

			ajuda.$update(function() {
				$location.path('ajudas/' + ajuda._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Ajudas
		$scope.find = function() {
			$scope.ajudas = Ajudas.query();
		};

		// Find existing Ajuda
		$scope.findOne = function() {
			$scope.ajuda = Ajudas.get({ 
				ajudaId: $stateParams.ajudaId
			});
		};
		$scope.direct= function(){
			$location.path('ajudas/create');


		};
	}
]);
'use strict';

//Ajudas service used to communicate Ajudas REST endpoints
angular.module('ajudas').factory('Ajudas', ['$resource',
	function($resource) {
		return $resource('ajudas/:ajudaId', { ajudaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
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
'use strict';

//Setting up route
angular.module('alternativas').config(['$stateProvider',
	function($stateProvider) {
		// Alternativas state routing
		$stateProvider.
		state('listAlternativas', {
			url: '/alternativas',
			templateUrl: 'modules/alternativas/views/list-alternativas.client.view.html'
		}).
		state('createAlternativa', {
			url: '/alternativas/create',
			templateUrl: 'modules/alternativas/views/create-alternativa.client.view.html'
		}).
		state('viewAlternativa', {
			url: '/alternativas/:alternativaId',
			templateUrl: 'modules/alternativas/views/view-alternativa.client.view.html'
		}).
		state('editAlternativa', {
			url: '/alternativas/:alternativaId/edit',
			templateUrl: 'modules/alternativas/views/edit-alternativa.client.view.html'
		});
	}
]);
'use strict';

// Alternativas controller
angular.module('alternativas').controller('AlternativasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Alternativas','Perguntas',
	function($scope, $stateParams, $location, Authentication, Alternativas, Perguntas) {
		$scope.authentication = Authentication;

		// Create new Alternativa
		$scope.create = function() {
			// Create new Alternativa object
			var alternativa = new Alternativas ({
				conteudo: this.conteudo,
				isCorrecte: this.isCorrecte,
				letra: this.letra,
				imagem: this.imagem,
				pergunta: this.pergunta._id
				//pergunta: 'primeiro nome?'

			});

			// Redirect after save
			alternativa.$save(function(response) {
				

				// Clear form fields
				$scope.conteudo = '';
				$scope.isCorrecte = '';
				$scope.letra = '';
				$scope.imagem = '';

				$location.path('alternativas/create');
				
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


            $scope.listPerguntas=function(){
			$scope.perguntas=Perguntas.listar();

			$scope.perguntas2 = Perguntas.byExame({ 
				perguntaId: '562679b05cea858510e475e5'
			});
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

		$scope.direct= function(){
			$location.path('alternativas/create');
		};



		$scope.callFunctions= function(){
			$scope.findOne();
			//need to call the method to list the perguntas here instead of direct call to service method
			$scope.perguntas=Perguntas.listar();
		}
	}


]);
'use strict';

//Alternativas service used to communicate Alternativas REST endpoints
angular.module('alternativas').factory('Alternativas', ['$resource',
	function($resource) {
		return $resource('alternativas/:alternativaId', { alternativaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
	/*	Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
		*/
	}
]);
'use strict';

// Setting up route
angular.module('articles').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listArticles', {
			url: '/articles',
			templateUrl: 'modules/articles/views/list-articles.client.view.html'
		}).
		state('createArticle', {
			url: '/articles/create',
			templateUrl: 'modules/articles/views/create-article.client.view.html'
		}).
		state('viewArticle', {
			url: '/articles/:articleId',
			templateUrl: 'modules/articles/views/view-article.client.view.html'
		}).
		state('editArticle', {
			url: '/articles/:articleId/edit',
			templateUrl: 'modules/articles/views/edit-article.client.view.html'
		});
	}
]);
'use strict';

angular.module('articles').controller('ArticlesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Articles',
	function($scope, $stateParams, $location, Authentication, Articles) {
		$scope.authentication = Authentication;

		$scope.create = function() {
			var article = new Articles({
				title: this.title,
				content: this.content
			});
			article.$save(function(response) {
				$location.path('articles/' + response._id);

				$scope.title = '';
				$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.remove = function(article) {
			if (article) {
				article.$remove();

				for (var i in $scope.articles) {
					if ($scope.articles[i] === article) {
						$scope.articles.splice(i, 1);
					}
				}
			} else {
				$scope.article.$remove(function() {
					$location.path('articles');
				});
			}
		};

		$scope.update = function() {
			var article = $scope.article;

			article.$update(function() {
				$location.path('articles/' + article._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.articles = Articles.query();
		};

		$scope.findOne = function() {
			$scope.article = Articles.get({
				articleId: $stateParams.articleId
			});
		};
	}
]);
'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('articles').factory('Articles', ['$resource',
	function($resource) {
		return $resource('articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: 'modules/core/views/home.client.view.html'
		});
	}
]);
'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;



		// $scope.myInterval = 5000;
		//  $scope.noWrapSlides = false;
		//  var slides = $scope.slides = [];
		//  $scope.addSlide = function() {
		//    var newWidth = 600 + slides.length + 1;
		//    slides.push({
		//      image: '//placekitten.com/' + newWidth + '/300',
		//      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
		//        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		//    });
		//  };
		//  for (var i=0; i<4; i++) {
		//    $scope.addSlide();
		//  }
		

		$scope.slideUp = function () {
		    $(function () {
		    	// wait till load event fires so all resources are available
		    	var jumboHeight = $('.jumbotron').outerHeight();
		      	var scrolled = $(window).scrollTop();
		      	$('.bg').css('height', (jumboHeight-scrolled) + 'px');	
		    });

		};
		// 	$(window).scroll(function(e){
		//     parallax();
		// });

	}
	
]);
angular.module('core').directive('perfectParallax', [
  '$window', function ($window) {

    return {
      restrict: 'A',
      scope: {
        parallaxCss: '@',
        parallaxInitVal: '@',
        parallaxRatio: '@'
      },
      link: function(iScope, iElem, iAttr) {
        var cssKey,
          cssValue,
          isSpecialVal,
          parallaxCssVal,
          parallaxOffset,
          parallaxRatio,
          parallaxInitVal,
          cssValArray;

        parallaxCssVal = iScope.parallaxCss ? iScope.parallaxCss : 'top';
        cssValArray = parallaxCssVal.split(':');
        cssKey = cssValArray[0];
        cssValue = cssValArray[1];

        isSpecialVal = cssValue ? true : false;
        if (!cssValue) cssValue = cssKey;

        parallaxRatio = iScope.parallaxRatio ? +iScope.parallaxRatio : 1.1;
        parallaxInitVal = iScope.parallaxInitVal ? +iScope.parallaxInitVal : 0;

        iElem.css(cssKey, parallaxInitVal + 'px');

        function _onScroll() {
          var resultVal;
          var calcVal = $window.pageYOffset * parallaxRatio + parallaxInitVal;

          if (isSpecialVal) {
            resultVal = '' + cssValue + '(' + calcVal + 'px)';
          } else {
            resultVal = calcVal + 'px';
          }
          iElem.css(cssKey, resultVal);
        };

        $window.addEventListener('scroll', _onScroll);

      }
    };
  }
]);

'use strict';

angular.module('core').directive("homeJumbo", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             // if (this.pageYOffset >= 100) {
             //     scope.boolChangeClass = true;
             //     console.log('Scrolled below header.');

             // }
             var jumb= document.querySelector(".bg");
             jumb.style.height=this.pageYOffset;
             console.log(jumb);
             console.log(this.pageYOffset);
            //scope.$apply();
        });
    };
});
.directive('parallaxBackground', ['$window', function($window) {
  return {
    restrict: 'A',
    transclude: true,
    template: '<div ng-transclude></div>',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@',
    },
    link: function($scope, elem, attrs) {
      var setPosition = function () {
        var calcValY = (elem.prop('offsetTop') - $window.pageYOffset) * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1) - ($scope.parallaxVerticalOffset || 0);
        // horizontal positioning
        elem.css('background-position', "50% " + calcValY + "px");
      };

      // set our initial position - fixes webkit background render bug
      angular.element($window).bind('load', function(e) {
        setPosition();
        $scope.$apply();
      });

      angular.element($window).bind("scroll", setPosition);
      angular.element($window).bind("touchmove", setPosition);
    }  // link function
  };
}]);
angular.module('core').directive('parallax', ['$window', function($window) {
  return {
    restrict: 'A',
    scope: {
      parallaxRatio: '@',
      parallaxVerticalOffset: '@',
      parallaxHorizontalOffset: '@',
    },
    link: function($scope, elem, attrs) {
      var setPosition = function () {
        if(!$scope.parallaxHorizontalOffset) $scope.parallaxHorizontalOffset = '0';
        var calcValY = $window.pageYOffset * ($scope.parallaxRatio ? $scope.parallaxRatio : 1.1 );
        if (calcValY <= $window.innerHeight) {
          var topVal = (calcValY < $scope.parallaxVerticalOffset ? $scope.parallaxVerticalOffset : calcValY);
          var hozVal = ($scope.parallaxHorizontalOffset.indexOf("%") === -1 ? $scope.parallaxHorizontalOffset + 'px' : $scope.parallaxHorizontalOffset);
          elem.css('transform', 'translate(' + hozVal + ', ' + topVal + 'px)');
        }
      };

      setPosition();

      angular.element($window).bind("scroll", setPosition);
      angular.element($window).bind("touchmove", setPosition);
    }  // link function
  };
}])
var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});
'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// Configuring the Articles module
angular.module('curso-disciplinas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Curso disciplinas', 'curso-disciplinas', 'dropdown', '/curso-disciplinas(/create)?');
		// Menus.addSubMenuItem('topbar', 'curso-disciplinas', 'Lista Curso disciplinas', 'curso-disciplinas');
		// Menus.addSubMenuItem('topbar', 'curso-disciplinas', 'Novo Curso disciplina', 'curso-disciplinas/create');
	}
]);
'use strict';

//Setting up route
angular.module('curso-disciplinas').config(['$stateProvider',
	function($stateProvider) {
		// Curso disciplinas state routing
		$stateProvider.
		state('listCursoDisciplinas', {
			url: '/curso-disciplinas',
			templateUrl: 'modules/curso-disciplinas/views/list-curso-disciplinas.client.view.html'
		}).
		state('createCursoDisciplina', {
			url: '/curso-disciplinas/create',
			templateUrl: 'modules/curso-disciplinas/views/create-curso-disciplina.client.view.html'
		}).
		state('viewCursoDisciplina', {
			url: '/curso-disciplinas/:cursoDisciplinaId',
			templateUrl: 'modules/curso-disciplinas/views/view-curso-disciplina.client.view.html'
		}).
		state('editCursoDisciplina', {
			url: '/curso-disciplinas/:cursoDisciplinaId/edit',
			templateUrl: 'modules/curso-disciplinas/views/edit-curso-disciplina.client.view.html'
		});
	}
]);
'use strict';

// Curso disciplinas controller
angular.module('curso-disciplinas').controller('CursoDisciplinasController', ['$scope', '$stateParams', '$location', 'Authentication', 'CursoDisciplinas','Cursos','Disciplinas',
	function($scope, $stateParams, $location, Authentication, CursoDisciplinas,Cursos, Disciplinas) {
		$scope.authentication = Authentication;

		// Create new Curso disciplina
		$scope.create = function() {
			// Create new Curso disciplina object
			var cursoDisciplina = new CursoDisciplinas ({
				curso: this.curso._id,
				disciplina: this.disciplina._id

				//curso: 'Inf',
				//disciplina: 'Daw'
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


		$scope.listaCursosDis=function(){
			$scope.cursos=Cursos.listar();
			$scope.disciplinas=Disciplinas.listar();
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
'use strict';

//Curso disciplinas service used to communicate Curso disciplinas REST endpoints
angular.module('curso-disciplinas').factory('CursoDisciplinas', ['$resource',
	function($resource) {
		return $resource('curso-disciplinas/:cursoDisciplinaId', { cursoDisciplinaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('cursos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Cursos', 'cursos', 'dropdown', '/cursos(/create)?');
		// Menus.addSubMenuItem('topbar', 'cursos', 'Lista de Cursos', 'cursos');
		// Menus.addSubMenuItem('topbar', 'cursos', 'Novo Curso', 'cursos/create');
	}
]);
'use strict';

//Setting up route
angular.module('cursos').config(['$stateProvider',
	function($stateProvider) {
		// Cursos state routing
		$stateProvider.
		state('listCursos', {
			url: '/cursos',
			templateUrl: 'modules/cursos/views/list-cursos.client.view.html'
		}).
		state('createCurso', {
			url: '/cursos/create',
			templateUrl: 'modules/cursos/views/create-curso.client.view.html'
		}).
		state('viewCurso', {
			url: '/cursos/:cursoId',
			templateUrl: 'modules/cursos/views/view-curso.client.view.html'
		}).
		state('editCurso', {
			url: '/cursos/:cursoId/edit',
			templateUrl: 'modules/cursos/views/edit-curso.client.view.html'
		});
	}
]);
'use strict';

// Cursos controller
angular.module('cursos').controller('CursosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cursos',
	function($scope, $stateParams, $location, Authentication, Cursos) {
		$scope.authentication = Authentication;

		// Create new Curso
		$scope.create = function() {
			// Create new Curso object
			var curso = new Cursos ({
				designacao: this.designacao
			});

			// Redirect after save
			curso.$save(function(response) {
				

				// Clear form fields
				$scope.designacao = '';

				$location.path('cursos/create');
			
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Curso
		$scope.remove = function(curso) {
			if ( curso ) { 
				curso.$remove();

				for (var i in $scope.cursos) {
					if ($scope.cursos [i] === curso) {
						$scope.cursos.splice(i, 1);
					}
				}
			} else {
				$scope.curso.$remove(function() {
					$location.path('cursos');
				});
			}
		};

		// Update existing Curso
		$scope.update = function() {
			var curso = $scope.curso;

			curso.$update(function() {
				$location.path('cursos/' + curso._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cursos
		$scope.find = function() {
			$scope.cursos = Cursos.query();
		};

		// Find existing Curso
		$scope.findOne = function() {
			$scope.curso = Cursos.get({ 
				cursoId: $stateParams.cursoId
			});
		};
	}
]);
'use strict';

//Cursos service used to communicate Cursos REST endpoints
angular.module('cursos').factory('Cursos', ['$resource',
	function($resource) {
		return $resource('cursos/:cursoId', { cursoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},


			listar:{
				      	method:'GET',
				      	url:'/cursos/listar',
				      	isArray:true

				      }
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('disciplinas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Disciplinas', 'disciplinas', 'dropdown', '/disciplinas(/create)?');
		Menus.addSubMenuItem('topbar', 'disciplinas', 'List Disciplinas', 'disciplinas');
		Menus.addSubMenuItem('topbar', 'disciplinas', 'New Disciplina', 'disciplinas/create');
	}
]);
'use strict';

//Setting up route
angular.module('disciplinas').config(['$stateProvider',
	function($stateProvider) {
		// Disciplinas state routing
		$stateProvider.
		state('listDisciplinas', {
			url: '/disciplinas',
			templateUrl: 'modules/disciplinas/views/list-disciplinas.client.view.html'
		}).
		state('createDisciplina', {
			url: '/disciplinas/create',
			templateUrl: 'modules/disciplinas/views/create-disciplina.client.view.html'
		}).
		state('viewDisciplina', {
			url: '/disciplinas/:disciplinaId',
			templateUrl: 'modules/disciplinas/views/view-disciplina.client.view.html'
		}).
		state('editDisciplina', {
			url: '/disciplinas/:disciplinaId/edit',
			templateUrl: 'modules/disciplinas/views/edit-disciplina.client.view.html'
		});
	}
]);
'use strict';

// Disciplinas controller
angular.module('disciplinas').controller('DisciplinasController', ['$scope', '$stateParams', '$location', 'Authentication', 'Disciplinas',
	function($scope, $stateParams, $location, Authentication, Disciplinas) {
		$scope.authentication = Authentication;

		// Create new Disciplina
		$scope.create = function() {
			// Create new Disciplina object
			var disciplina = new Disciplinas ({
				name: this.name,
				plano: this.plano
			});

			// Redirect after save
			disciplina.$save(function(response) {
				

				// Clear form fields
				$scope.name = '';
				$scope.plano='';

				$location.path('disciplinas/' + response._id);
				
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Disciplina
		$scope.remove = function(disciplina) {
			if ( disciplina ) { 
				disciplina.$remove();

				for (var i in $scope.disciplinas) {
					if ($scope.disciplinas [i] === disciplina) {
						$scope.disciplinas.splice(i, 1);
					}
				}
			} else {
				$scope.disciplina.$remove(function() {
					$location.path('disciplinas');
				});
			}
		};

		// Update existing Disciplina
		$scope.update = function() {
			var disciplina = $scope.disciplina;

			disciplina.$update(function() {
				$location.path('disciplinas/' + disciplina._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Disciplinas
		$scope.find = function() {
			$scope.disciplinas = Disciplinas.query();
		};

		// Find existing Disciplina
		$scope.findOne = function() {
			$scope.disciplina = Disciplinas.get({ 
				disciplinaId: $stateParams.disciplinaId
			});
		};

		//direct to create
		$scope.direct= function(){
			$location.path('disciplinas/create');
		};
	}
]);
'use strict';

//Disciplinas service used to communicate Disciplinas REST endpoints
angular.module('disciplinas').factory('Disciplinas', ['$resource',
	function($resource) {
		return $resource('disciplinas/:disciplinaId', { disciplinaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},


			listar:{
				      	method:'GET',
				      	url:'/disciplinas/listar',
				      	isArray:true

				      }
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('exames').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Exames', 'exames', 'dropdown', '/exames(/create)?');
		Menus.addSubMenuItem('topbar', 'exames', 'List Exames', 'exames');
		Menus.addSubMenuItem('topbar', 'exames', 'New Exame', 'exames/create');
		
	}
]);
'use strict';

//Setting up route
angular.module('exames').config(['$stateProvider',
	function($stateProvider) {
		// Exames state routing
		$stateProvider.
		state('listExames', {
			url: '/exames',
			templateUrl: 'modules/exames/views/list-exames.client.view.html',
			//css: 'css/badge.css'
		}).
		state('createExame', {
			url: '/exames/create',
			templateUrl: 'modules/exames/views/create-exame.client.view.html'
		}).
		state('viewExame', {
			url: '/exames/:exameId',
			templateUrl: 'modules/exames/views/view-exame.client.view.html'
		}).
		state('editExame', {
			url: '/exames/edit/:exameId',
			templateUrl: 'modules/exames/views/edit-exame.client.view.html'
		}).
		state('editExameData', {
			url: '/exames/editData/:exameId',
			templateUrl: 'modules/exames/views/edit-exame-data.client.view.html'
		});
	}
]);
'use strict';

// Exames controller
angular.module('exames').controller('ExamesController', ['$scope', '$stateParams', '$log', '$location', 'Authentication', 'Exames','Disciplinas','Perguntas',
	function($scope, $stateParams, $location, $log, Authentication, Exames, Disciplinas,Perguntas) {
		$scope.authentication = Authentication;

		//colocar tempo padrao
		$scope.tempo=120;

		// Create new Exame
		$scope.create = function() {
			// Create new Exame object

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
		// console.log('id da pergunta '+$scope.exame._id);
		// $scope.exame.perguntas=Perguntas.byExame({
		// 	//console.log('id pergunta '+$scope.exame._id);
		// 	perguntaId:'562679b05cea858510e475e5'
		// });
		    // $scope.exame.perguntas=Perguntas.query();
		};

		$scope.callFunctions= function(){
			$scope.listaDisciplinas();
			$scope.findOne();
		};



		//modal

		$scope.animationsEnabled = true;

		$scope.open = function (size) {

		  var modalInstance = $uibModal.open({
		    animation: $scope.animationsEnabled,
		    templateUrl: 'myModalContent.html',
		    //controller: 'ModalInstanceCtrl',
		    size: size,
		    resolve: {
		      items: function () {
		       // return $scope.items;
		      }
		    }
		  });

		  modalInstance.result.then(function () {
		   // $scope.selected = selectedItem;
		  }, function () {
		    $log.info('Modal dismissed at: ' + new Date());
		  });
		};
		//end of modal
			//inicio da resolucao do exame

		$scope.perguntasResolvidas=[{}];
		$scope.addResolvida= function(Pergunta,alternativa){
			resolvida={};
		};


		//clear fields
		$scope.limpaCampos=function(){
			$scope.instruccoes='';
			$scope.disciplina='';
		}

		//Year Picker action
		$scope.today = function() {
		  $scope.dt = new Date();
		};
		$scope.today();

		$scope.clear = function () {
		  $scope.dt = null;
		};

		// Disable weekend selection
		$scope.disabled = function(date, mode) {
		  return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		};

		$scope.toggleMin = function() {
		  $scope.minDate = $scope.minDate ? null : new Date();
		};
		//$scope.toggleMin();

		$scope.open = function($event) {
		  $event.preventDefault();
		  $event.stopPropagation();

		  $scope.opened = true;
		};


       $scope.direct= function(){
			$location.path('exames/create');


		};

		
		$scope.initDate = new Date();
		$scope.formats = ['yyyy','dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
		$scope.format = $scope.formats[0];

		$scope.datepickerOptions = {
		  datepickerMode:"'year'",
		  minMode:"'year'",
		  minDate:"minDate",
		  showWeeks:"false",
		  clearText:"limpar",
		  currentText:"hoje",
		  closeText:"fechar"
		};

		$scope.resolver= function(){
			console.log('radio'+this.a56442ea899f1c3e81f385ec8);
			var perguntas=$scope.exame._perguntas;
			console.log(perguntas);
			var obj={};
			 for(var i=0;i<perguntas.length;i++){
			 	//if(i.hasOwnProperty(perguntas))
			 		console.log('id '+perguntas[i]._id);
			//added 'a' to the  begining of the name for each property to avoid name begining with numerical literal
			eval("obj.a"+perguntas[i]._id+" ="+"this.a"+perguntas[i]._id+";");  //
			console.log(obj);
			//pergunta=2;
			//console.log(pergunta+perguntas[i]._id);
			//console.log(perguntag);
		}
			// var exame = new Exames ({
			// 	ano: this.ano,
			// 	instruccoes:this.instruccoes,
			// 	tempo:this.tempo,
			// 	disciplina:this.disciplina._id
			// });
		}
	}
]);
'use strict';

//Exames service used to communicate Exames REST endpoints
angular.module('exames').factory('Exames', ['$resource',
	function($resource) {
		return $resource('exames/:exameId', { exameId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},


			 listar:{
				      	method:'GET',
				      	url:'/exames/listar',
				      	isArray:true

				      }
		});
	}
]);
'use strict';

// Membros module config
angular.module('membros').run(['Menus',
	function(Menus) {
		// Config logic
		// ...

		//this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		// Menus.addMenuItem('topbar', 'Membros', 'membro', 'dropdown', '/membros(/create)?');
		// Menus.addSubMenuItem('topbar', 'membros', 'List Membros', 'membros');
		// Menus.addSubMenuItem('topbar', 'membros', 'New Membro', 'membros/create');
	}
]);
'use strict';

//Setting up route
angular.module('membros').config(['$stateProvider',
	function($stateProvider) {
		// Membros state routing
		$stateProvider.
		state('create-membros', {
			url: '/membros/create',
			templateUrl: 'modules/membros/views/create-membros.client.view.html'
		}).
		state('membros', {
			url: '/membros',
			templateUrl: 'modules/membros/views/membros.client.view.html'
		}).
		state('edit',{
			url:'/membros/:membroId/edit',
			templateUrl:'modules/membros/views/edit-membro.client.view.html'
		}).
		state('delete',{
			url:'/membros/delete',
			templateUrl:'modules/membros/views/delete-membro.client.view.html'
		}).
		state('view',{
			url:'/membros/:membroId',
			templateUrl:'modules/membros/views/view-membro.client.view.html'
		});
	}
]);
'use strict';

angular.module('membros').controller('CreateMembrosController', ['$scope',
	function($scope) {
		// Controller Logic
		// ...
	}
]);
'use strict';

angular.module('membros').controller('MembrosController', ['$scope','$stateParams','$location','Membros',
	function($scope,$stateParams,$location,Membros) {
		// Controller Logic


		 $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.offset = 0;

       // Page changed handler
       $scope.pageChanged = function() {
            $scope.offset = ($scope.currentPage - 1) * $scope.pageSize;
       }; 

//logica para criar
		$scope.create=function(){
			//criamos um novo membro
			var memb= new Membros({
				nome:this.nome,
				cargo:this.cargo,
				username:this.username,
				password:this.password
			});
			memb.$save(function(response){
				$scope.membroActual=response._id;
				$location.path('tarefas/create');
				//$location.path('membros/'+response._id);
				$scope.nome='';
				$scope.cargo='';
			}, function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};

//Logica para remover		
		$scope.remove=function(membro){
			if(membro){
				membro.$remove();
				for (var i  in $scope.membros) {
				 if($scope.membros[i]===membro){
				 	$scope.membros.splice(i,1);
				 }
				}

				
			}else{
				$scope.membro.$remove(function(){
					$location.path('membros/'+membro._id);
				});
			}
			$location.path('membros');
		};

//logica para update
		$scope.update= function(){
			var $membro=$scope.membro;
			$membro.update(function(){
				$location.path('membros/'+$membro._id);
			},function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};



		//Devolver a lista de membros
		$scope.find=function(){
			//$scope.membros=[{'nome':'camilo','cargo':'fiteiro','username':'chemanaG','password':'allooo'},
			//{'nome':'Chris Anne','cargo':'fala fala','username':'chemanaG','password':'chris'}]

			$scope.membros=Membros.query();
		};

		//encontrar um membro
		$scope.findOne= function(){
			$scope.membro=Membros.get({
				membroId:$stateParams.membroId
			});
		};

      // Search for a category
        $scope.membroSearch = function(membro) {
            $location.path('membros/'+membro._id);
        }; 
	}
]);
'use strict';

angular.module('membros').factory('Membros', ['$resource',
	function($resource) {
		// Membros service logic
		// ...
	  return $resource(
		    'membros/:membroId', 
		     {
			membroId: '@_id'
		     }, 
		     {
			    update: {
				   method: 'PUT'
			          },
			          listar:{
				      	method:'GET',
				      	url:'/membros/listar',
				      	isArray:true

				      }

		      }

		       
		); 

	//getLista:function(){ return $resource('membros/lista');}
		//return $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});


   // var membros=this;
   // membros.lista= $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});	
  // membros.lista= $resource('membros/');

/*    membros.getLista = function () {
    	membros.lista=$resource('membros');
    //     membros.lista= [
				// {_id:'id1',username:'osvaldoM'},
				// {_id:'id1',username:'osvaldoM'},
				// {_id:'id1',username:'osvaldoM'},
			 // ];

    }; */

 //  return membros;
	}
]);
'use strict';

// Configuring the Articles module
angular.module('pergunta-resolvidas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
	// 	Menus.addMenuItem('topbar', 'Pergunta resolvidas', 'pergunta-resolvidas', 'dropdown', '/pergunta-resolvidas(/create)?');
	// 	Menus.addSubMenuItem('topbar', 'pergunta-resolvidas', 'List Pergunta resolvidas', 'pergunta-resolvidas');
	// 	Menus.addSubMenuItem('topbar', 'pergunta-resolvidas', 'New Pergunta resolvida', 'pergunta-resolvidas/create');
	 }
]);
'use strict';

//Setting up route
angular.module('pergunta-resolvidas').config(['$stateProvider',
	function($stateProvider) {
		// Pergunta resolvidas state routing
		$stateProvider.
		state('listPerguntaResolvidas', {
			url: '/pergunta-resolvidas',
			templateUrl: 'modules/pergunta-resolvidas/views/list-pergunta-resolvidas.client.view.html'
		}).
		state('createPerguntaResolvida', {
			url: '/pergunta-resolvidas/create',
			templateUrl: 'modules/pergunta-resolvidas/views/create-pergunta-resolvida.client.view.html'
		}).
		state('viewPerguntaResolvida', {
			url: '/pergunta-resolvidas/:perguntaResolvidaId',
			templateUrl: 'modules/pergunta-resolvidas/views/view-pergunta-resolvida.client.view.html'
		}).
		state('editPerguntaResolvida', {
			url: '/pergunta-resolvidas/:perguntaResolvidaId/edit',
			templateUrl: 'modules/pergunta-resolvidas/views/edit-pergunta-resolvida.client.view.html'
		});
	}
]);
'use strict';

// Pergunta resolvidas controller
angular.module('pergunta-resolvidas').controller('PerguntaResolvidasController', ['$scope', '$stateParams', '$location', 'Authentication', 'PerguntaResolvidas','Resolucaos',
	function($scope, $stateParams, $location, Authentication, PerguntaResolvidas,Resolucaos) {
		$scope.authentication = Authentication;

		// Create new Pergunta resolvida
		$scope.create = function() {
			// Create new Pergunta resolvida object
			var perguntaResolvida = new PerguntaResolvidas ({
				estado: this.estado,
				resolucao: this.resolucao._id
			});

			// Redirect after save
			perguntaResolvida.$save(function(response) {
				$location.path('pergunta-resolvidas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

          $scope.listResolucao=function(){
			$scope.resolucaos=Resolucaos.listar();
			};
		// Remove existing Pergunta resolvida
		$scope.remove = function(perguntaResolvida) {
			if ( perguntaResolvida ) { 
				perguntaResolvida.$remove();

				for (var i in $scope.perguntaResolvidas) {
					if ($scope.perguntaResolvidas [i] === perguntaResolvida) {
						$scope.perguntaResolvidas.splice(i, 1);
					}
				}
			} else {
				$scope.perguntaResolvida.$remove(function() {
					$location.path('pergunta-resolvidas');
				});
			}
		};

		// Update existing Pergunta resolvida
		$scope.update = function() {
			var perguntaResolvida = $scope.perguntaResolvida;

			perguntaResolvida.$update(function() {
				$location.path('pergunta-resolvidas/' + perguntaResolvida._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pergunta resolvidas
		$scope.find = function() {
			$scope.perguntaResolvidas = PerguntaResolvidas.query();
		};

		// Find existing Pergunta resolvida
		$scope.findOne = function() {
			$scope.perguntaResolvida = PerguntaResolvidas.get({ 
				perguntaResolvidaId: $stateParams.perguntaResolvidaId
			});
		};
	}
]);
'use strict';

//Pergunta resolvidas service used to communicate Pergunta resolvidas REST endpoints
angular.module('pergunta-resolvidas').factory('PerguntaResolvidas', ['$resource',
	function($resource) {
		return $resource('pergunta-resolvidas/:perguntaResolvidaId', { perguntaResolvidaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('perguntas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Perguntas', 'perguntas', 'dropdown', '/perguntas(/create)?');
		Menus.addSubMenuItem('topbar', 'perguntas', 'List Perguntas', 'perguntas');
		Menus.addSubMenuItem('topbar', 'perguntas', 'New Pergunta', 'perguntas/create');
	}
]);
'use strict';

//Setting up route
angular.module('perguntas').config(['$stateProvider',
	function($stateProvider) {
		// Perguntas state routing
		$stateProvider.
		state('listPerguntas', {
			url: '/perguntas',
			templateUrl: 'modules/perguntas/views/list-perguntas.client.view.html'
		}).
		state('createPergunta', {
			url: '/perguntas/create',
			templateUrl: 'modules/perguntas/views/create-pergunta.client.view.html'
		}).
		state('viewPergunta', {
			url: '/perguntas/:perguntaId',
			templateUrl: 'modules/perguntas/views/view-pergunta.client.view.html'
		}).
		state('editPergunta', {
			url: '/perguntas/:perguntaId/edit',
			templateUrl: 'modules/perguntas/views/edit-pergunta.client.view.html'
		});
	}
]);
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
'use strict';

//Perguntas service used to communicate Perguntas REST endpoints
angular.module('perguntas').factory('Perguntas', ['$resource',
	function($resource) {
		return $resource('perguntas/:perguntaId', 
			{ perguntaId: '@_id' }, 
		           
		   {
			update: {
				method: 'PUT'
			},


			 listar:{
				      	method:'GET',
				      	url:'/perguntas/listar',
				      	isArray:true

				      },


			 getOrigi:{
				      	method:'GET',
				      	url:'/perguntas/getOrigi',
				      	isArray:false

				      }
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('resolucaos').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Resolucaos', 'resolucaos', 'dropdown', '/resolucaos(/create)?');
		// Menus.addSubMenuItem('topbar', 'resolucaos', 'List Resolucaos', 'resolucaos');
		// Menus.addSubMenuItem('topbar', 'resolucaos', 'New Resolucao', 'resolucaos/create');
	}
]);
'use strict';

//Setting up route
angular.module('resolucaos').config(['$stateProvider',
	function($stateProvider) {
		// Resolucaos state routing
		$stateProvider.
		state('listResolucaos', {
			url: '/resolucaos',
			templateUrl: 'modules/resolucaos/views/list-resolucaos.client.view.html'
		}).
		state('createResolucao', {
			url: '/resolucaos/create',
			templateUrl: 'modules/resolucaos/views/create-resolucao.client.view.html'
		}).
		state('viewResolucao', {
			url: '/resolucaos/:resolucaoId',
			templateUrl: 'modules/resolucaos/views/view-resolucao.client.view.html'
		}).
		state('editResolucao', {
			url: '/resolucaos/:resolucaoId/edit',
			templateUrl: 'modules/resolucaos/views/edit-resolucao.client.view.html'
		});
	}
]);
'use strict';

// Resolucaos controller
angular.module('resolucaos').controller('ResolucaosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Resolucaos','Exames',
	function($scope, $stateParams, $location, Authentication, Resolucaos,Exames) {
		$scope.authentication = Authentication;

		// Create new Resolucao
		$scope.create = function() {
			// Create new Resolucao object
			var resolucao = new Resolucaos ({
				pontos: this.pontos,
				tempo: this.tempo,
				certas: this.certas,
				erradas: this.erradas,
				resolvidas: this.resolvidas,
				nResolvidas: this.nResolvidas,
				exame: this.exame._id
			});

			// Redirect after save
			resolucao.$save(function(response) {
				$location.path('resolucaos/' + response._id);

				// Clear form fields
				$scope.pontos = '';
				$scope.tempo = '';
				$scope.certas = '';
				$scope.erradas = '';
				$scope.resolvidas = '';
				$scope.nResolvidas = '';

				}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				});

			};


		$scope.listaExames=function(){
			$scope.exames=Exames.listar();
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
'use strict';

//Resolucaos service used to communicate Resolucaos REST endpoints
angular.module('resolucaos').factory('Resolucaos', ['$resource',
	function($resource) {
		return $resource('resolucaos/:resolucaoId', { resolucaoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			},

			listar:{
				      	method:'GET',
				      	url:'/resolucaos/listar',
				      	isArray:true

				      }

		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('tag-perguntas').run(['Menus',
	function(Menus) {
		// Set top bar menu items
	// 	Menus.addMenuItem('topbar', 'Tag perguntas', 'tag-perguntas', 'dropdown', '/tag-perguntas(/create)?');
	// 	Menus.addSubMenuItem('topbar', 'tag-perguntas', 'List Tag perguntas', 'tag-perguntas');
	// 	Menus.addSubMenuItem('topbar', 'tag-perguntas', 'New Tag pergunta', 'tag-perguntas/create');
	 }
]);
'use strict';

//Setting up route
angular.module('tag-perguntas').config(['$stateProvider',
	function($stateProvider) {
		// Tag perguntas state routing
		$stateProvider.
		state('listTagPerguntas', {
			url: '/tag-perguntas',
			templateUrl: 'modules/tag-perguntas/views/list-tag-perguntas.client.view.html'
		}).
		state('createTagPergunta', {
			url: '/tag-perguntas/create',
			templateUrl: 'modules/tag-perguntas/views/create-tag-pergunta.client.view.html'
		}).
		state('viewTagPergunta', {
			url: '/tag-perguntas/:tagPerguntaId',
			templateUrl: 'modules/tag-perguntas/views/view-tag-pergunta.client.view.html'
		}).
		state('editTagPergunta', {
			url: '/tag-perguntas/:tagPerguntaId/edit',
			templateUrl: 'modules/tag-perguntas/views/edit-tag-pergunta.client.view.html'
		});
	}
]);
'use strict';

// Tag perguntas controller
angular.module('tag-perguntas').controller('TagPerguntasController', ['$scope', '$stateParams', '$location', 'Authentication', 'TagPerguntas',
	function($scope, $stateParams, $location, Authentication, TagPerguntas) {
		$scope.authentication = Authentication;

		// Create new Tag pergunta
		$scope.create = function() {
			// Create new Tag pergunta object
			var tagPergunta = new TagPerguntas ({
				name: this.name
			});

			// Redirect after save
			tagPergunta.$save(function(response) {
				$location.path('tag-perguntas/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tag pergunta
		$scope.remove = function(tagPergunta) {
			if ( tagPergunta ) { 
				tagPergunta.$remove();

				for (var i in $scope.tagPerguntas) {
					if ($scope.tagPerguntas [i] === tagPergunta) {
						$scope.tagPerguntas.splice(i, 1);
					}
				}
			} else {
				$scope.tagPergunta.$remove(function() {
					$location.path('tag-perguntas');
				});
			}
		};

		// Update existing Tag pergunta
		$scope.update = function() {
			var tagPergunta = $scope.tagPergunta;

			tagPergunta.$update(function() {
				$location.path('tag-perguntas/' + tagPergunta._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tag perguntas
		$scope.find = function() {
			$scope.tagPerguntas = TagPerguntas.query();
		};

		// Find existing Tag pergunta
		$scope.findOne = function() {
			$scope.tagPergunta = TagPerguntas.get({ 
				tagPerguntaId: $stateParams.tagPerguntaId
			});
		};
	}
]);
'use strict';

//Tag perguntas service used to communicate Tag perguntas REST endpoints
angular.module('tag-perguntas').factory('TagPerguntas', ['$resource',
	function($resource) {
		return $resource('tag-perguntas/:tagPerguntaId', { tagPerguntaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Configuring the Articles module
angular.module('tags').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		// Menus.addMenuItem('topbar', 'Tags', 'tags', 'dropdown', '/tags(/create)?');
		// Menus.addSubMenuItem('topbar', 'tags', 'List Tags', 'tags');
		// Menus.addSubMenuItem('topbar', 'tags', 'New Tag', 'tags/create');
	}
]);
'use strict';

//Setting up route
angular.module('tags').config(['$stateProvider',
	function($stateProvider) {
		// Tags state routing
		$stateProvider.
		state('listTags', {
			url: '/tags',
			templateUrl: 'modules/tags/views/list-tags.client.view.html'
		}).
		state('createTag', {
			url: '/tags/create',
			templateUrl: 'modules/tags/views/create-tag.client.view.html'
		}).
		state('viewTag', {
			url: '/tags/:tagId',
			templateUrl: 'modules/tags/views/view-tag.client.view.html'
		}).
		state('editTag', {
			url: '/tags/:tagId/edit',
			templateUrl: 'modules/tags/views/edit-tag.client.view.html'
		});
	}
]);
'use strict';

// Tags controller
angular.module('tags').controller('TagsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tags',
	function($scope, $stateParams, $location, Authentication, Tags) {
		$scope.authentication = Authentication;

		// Create new Tag
		$scope.create = function() {
			// Create new Tag object
			var tag = new Tags ({
				name: this.name
			});

			// Redirect after save
			tag.$save(function(response) {
				$location.path('tags/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Tag
		$scope.remove = function(tag) {
			if ( tag ) { 
				tag.$remove();

				for (var i in $scope.tags) {
					if ($scope.tags [i] === tag) {
						$scope.tags.splice(i, 1);
					}
				}
			} else {
				$scope.tag.$remove(function() {
					$location.path('tags');
				});
			}
		};

		// Update existing Tag
		$scope.update = function() {
			var tag = $scope.tag;

			tag.$update(function() {
				$location.path('tags/' + tag._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tags
		$scope.find = function() {
			$scope.tags = Tags.query();
		};

		// Find existing Tag
		$scope.findOne = function() {
			$scope.tag = Tags.get({ 
				tagId: $stateParams.tagId
			});
		};
	}
]);
'use strict';

//Tags service used to communicate Tags REST endpoints
angular.module('tags').factory('Tags', ['$resource',
	function($resource) {
		return $resource('tags/:tagId', { tagId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Tarefas module config
angular.module('tarefas').run(['Menus',
	function(Menus) {
		//this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position)
		
		// Menus.addMenuItem('topbar','Tarefas','tarefa','dropdown','/tarefas(/create)?');
		// Menus.addSubMenuItem('topbar','tarefas','Listar tarefas','/tarefas');
		// Menus.addSubMenuItem('topbar','tarefas','nova tarefa','/tarefas/create'); 
		// Config logic
		// ...

	}
]);
'use strict';

//Setting up route
angular.module('tarefas').config(['$stateProvider',
	function($stateProvider) {
		// Tarefas state routing
		$stateProvider.
		state('create-tarefa', {
			url: '/tarefas/create',
			templateUrl: 'modules/tarefas/views/create-tarefa.client.view.html'
		}).
		state('tarefas', {
			url: '/tarefas',
			templateUrl: 'modules/tarefas/views/tarefas.client.view.html'
		}).
		state('viewTarefa',{
			url:'/tarefas/:tarefaId',
			templateUrl:'modules/tarefas/views/view-tarefa.client.view.html'
		});
	}
]);

'use strict';

angular.module('tarefas').controller('TarefasController', ['$scope','$stateParams','$location','Tarefas','Membros',
	function($scope,$stateParams,$location,Tarefas,Membros) {
		// Controller Logic
		// ...

		//Criar categoria
		$scope.create= function(){
			
			//Criamos a tarefa
			var tarefa = new  Tarefas({
				titulo:this.titulo,
				descriccao:this.descriccao,
				prazo:this.prazo,
				membro:this.membro._id
			});

			tarefa.$save(function(response){
				//redireccionamos para a pag. tarefas
				$location.path('tarefas');
			},function(errorResponse){
				$location.path('tarefas');
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
				$location.path('tarefas');
			},function(errorResponse){
				$scope.error=errorResponse.data.message;
			});
		};

		$scope.find= function(){
			//$scope.tarefas=[{titulo:'meu titulo',descriccao:'uma tarefa'},{titulo:'meu titulo',descriccao:'uma tarefa'},{titulo:'meu titulo',descriccao:'uma tarefa'}];
			$scope.tarefas=Tarefas.query();

		};

		$scope.findOne= function(){
			var tarefa=Tarefas.get({
				tarefaId:$stateParams.tarefaId
			});
			//var d = new Date();
			//tarefa.falta=$scope.diferenca(tarefa.prazo);
			$scope.tarefa= tarefa;
		};

		$scope.tarefaSearch=function(item){
			$location.path('tarefas/'+item._id);
		};

		$scope.listaMembros=function(){
			$scope.membros=Membros.listar();
			//console.log(Membros.listar());
	/*	$scope.membros=	[
				{id:'id1',nome:'osvaldoM'},
				{id:'id1',nome:'osvaldo M'},
				{id:'id1',nome:'osvaldoM'},
			 ]; */
			 //$scope.membros=$listas;
		};

		$scope.open = function($event) {
		  $scope.status.opened = true;
		};


    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };


     $scope.diferenca = function(prazo) {
     		
         var data= prazo.split('/'),
         	 dt1 = data.split('/'),
             dt2 = prazo.split('/'),
             one = new Date(dt1[2], dt1[1]-1, dt1[0]),
             two = new Date(dt2[2], dt2[1]-1, dt2[0]);

         var millisecondsPerDay = 1000 * 60 * 60 * 24;
         var millisBetween = two.getTime() - one.getTime();
         var days = millisBetween / millisecondsPerDay;

         return Math.floor(days);      
     };

	}
]);
'use strict';

angular.module('tarefas').factory('Tarefas', ['$resource',
	function($resource) {
		// Membros service logic
		// ...

		// Public API

	return $resource('tarefas/:tarefaId', {
			tarefaId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		//return $resource('membros/:membroId',{membroId:'@_id'},{update:{method:'PUT'}});
	}
]);
'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);