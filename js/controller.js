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
app.directive('slider', function () {
		return {
			scope: {},
			templateUrl: null,
			restrict: 'E',
			controllerAs: "main",
 			bindToController: true,
 			controller: function (mainService, $timeout) {
 				var self = this;
 				var timeOut;
     			mainService.save({params: 'slide'},function(value) {
        			self.nsw = value.slides;
       			});
       			self.fil = 1;
				self.left = function() {
					$timeout.cancel(timeOut);
					self.fil = (self.fil == 1) ? self.nsw.length : --self.fil;
 				}
 				self.right = function () {
 					$timeout.cancel(timeOut);
					self.fil = (self.fil == self.nsw.length) ? 1 : ++self.fil;
 					}
 				self.play = function() {
    				timeOut = $timeout(function() {
        			self.left();
         			self.play();
     				}, 5000);
				};
				self.play();
			}
		};
	})
app.directive('mainBlock', [function () {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "content",
		bindToController: true,
		controller: function (mainService) {
			var self = this;
			mainService.save({params: 'main'},function(val) {
				self.block = val.slides;
			})
		},
	};
}])
app.directive('news', [function () {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "post",
		bindToController: true,
		controller: function (mainService, $routeParams) {
			var self = this
			mainService.save({params: 'news'}, function (valu) {self.news = valu.news})
			self.newsid = $routeParams.id;
		}
	};
}])
app.directive('order', [function () {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "sub",
		bindToController: true,
		controller: function (mainService) {
			var self = this;
			this.maino = 1;
			mainService.save({params: 'order'}, function (valu) {self.order = valu.order})
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
			mainService.save({params: 'goods'}, function (val) {self.goods = val.goods});
		}
	};
}])
app.factory('mainService', ['$resource', function ($resource) {
			return $resource(':params.json', {
				params: '@params'
			});	
}])