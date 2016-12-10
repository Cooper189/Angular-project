var app = angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate']);
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/main', {
			templateUrl: 'template/mainTpl.html',
		});
		$routeProvider.when('/about', {
			templateUrl: 'template/aboutTpl.html',
		});
		$routeProvider.when('/buy', {
			templateUrl: 'template/buyTpl.html',
		});
		$routeProvider.when('/main/:id', {
			templateUrl: 'template/newsTpl.html',
		});
		$routeProvider.when('/product', {
			templateUrl: 'template/productTpl.html'
		})
		$routeProvider.otherwise({ redirectTo: '/main' });
	}])
app.directive('slider', ['mainService', '$timeout', function (mainService, $timeout) {
		return {
			scope: {},
			templateUrl: null,
			restrict: 'E',
			controllerAs: "main",
 			bindToController: true,
 			controller: function () {
 				var timeOut;
     			mainService.save({params: 'slide'}, (value) => {
        			this.nsw = value.slides;
       			});
       			this.fil = 1;
				this.left = () => {
					$timeout.cancel(timeOut);
					this.fil = (this.fil == 1) ? this.nsw.length : --this.fil;
 				}
 				this.right =  () => {
 					$timeout.cancel(timeOut);
					this.fil = (this.fil == this.nsw.length) ? 1 : ++this.fil;
 					}
 				this.play = () => {
    				timeOut = $timeout(() => {
        			this.left();
         			this.play();
     				}, 5000);
				};
				this.play();
			}
		};
	}])
app.directive('mainBlock', ['mainService', function (mainService) {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "content",
		bindToController: true,
		controller: function () {
			mainService.save({params: 'main'},(val) => {
				this.block = val.slides;
			})
		},
	};
}])
app.directive('news', ['mainService', 'mainServ', '$routeParams', function (mainService, mainServ, $routeParams) {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "post",
		bindToController: true,
		controller: function () {
			this.newsid = $routeParams.id;
			mainServ.save({param: this.newsid}, (valu) => {
				this.news = valu;
			});
			mainService.save({params: 'news'}, (valu) => {
				this.posts = valu.news;
			})
		}
	};
}])
app.directive('order', ['mainService', function (mainService) {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "sub",
		bindToController: true,
		controller: function () {
			this.maino = 1;
			mainService.save({params: 'order'}, (valu) => {this.order = valu.order})
		}
	};
}])
app.directive('product', ['mainService', function (mainService) {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "product",
		bindToController: true,
		controller: function () {
			mainService.save({params: 'goods'}, (val) => {this.goods = val.goods});
		}
	};
}])
app.factory('mainService', ['$resource', function ($resource) {
			return $resource(':params.json', {
				params: '@params'
			});	
}])
app.factory('mainServ', ['$resource', function ($resource) {
			return $resource('news/:param.json', {
				param: '@param'
			});	
}])