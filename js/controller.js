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
 				var self = this;
 				var timeOut;
     			mainService.get({params: 'slide'}, function (value) {
        			self.nsw = value.slides;
       			});
       			self.fil = 1;
				self.left = function () {
					$timeout.cancel(timeOut);
					self.fil = (self.fil == 1) ? self.nsw.length : --self.fil;
 				}
 				self.right =  function () {
 					$timeout.cancel(timeOut);
					self.fil = (self.fil == self.nsw.length) ? 1 : ++self.fil;
 					}
 				self.play = function () {
    				timeOut = $timeout(function () {
        			self.left();
         			self.play();
     				}, 5000);
				};
				self.play();
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
			var self = this;
			mainService.get({params: 'main'}, function (val) {
				self.block = val.slides;
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
			var self = this;
			self.newsid = $routeParams.id;
			mainServ.get({param: self.newsid}, function (valu) {
				self.news = valu;
			});
			mainService.get({params: 'news'}, function (valu) {
				self.posts = valu.news;
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
			var self = this;
			self.maino = 1;
			mainService.get({params: 'order'}, function (valu) {self.order = valu.order})
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
			var self = this;
			mainService.get({params: 'goods'}, function (val) {self.goods = val.goods});
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