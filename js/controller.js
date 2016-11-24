var app = angular.module('app', ['ngRoute', 'ngResource']);
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
 			controller: function (dataService, $timeout) {
 				var self = this;
 				var timeOut;
     			var promiseObj=dataService.getData();
       			 promiseObj.then(function(value) {
        			self.nsw = value;
       			});
       			self.fil = 1;
				self.left = function() {
					$timeout.cancel(timeOut);
					self.fil = (self.fil == 1) ? 3 : --self.fil;
 				}
 				self.right = function () {
 					$timeout.cancel(timeOut);
					self.fil = (self.fil == 3) ? 1 : ++self.fil;
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
		controller: function (mainService, $resource) {
			var self = this;
			mainService.save(function(val) {
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
		controller: function (newsService, $routeParams) {
			var self = this
			var newsPromise = newsService.getNews();
			newsPromise.then(function (valu) {self.news = valu})
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
		controller: function (orderService) {
			var self = this;
			this.maino = 1;
			var orderPromise = orderService.getOrder();
			orderPromise.then(function (valu) {self.order = valu})
		}
	};
}])
app.directive('product', ['goodsService', function (goodsService) {
	return {
		scope: {},
		templateUrl: null,
		restrict: 'E',
		controllerAs: "product",
		bindToController: true,
		controller: function () {
			var self = this;
			var goodsPromise = goodsService.getGoods();
			goodsPromise.then(function (val) {self.goods = val});
		}
	};
}])
app.factory('dataService', function($http, $q){
    return{
        getData: function(){
            var deferred = $q.defer();
            $http({method: 'POST', url: 'slide.json'}).
             success(function(data, status, headers, config) {
                deferred.resolve(data.slides);
            }).
            error(function(data, status, headers, config) {
                deferred.reject(status);
            });           
            return deferred.promise;
        }
    }
})
app.factory('mainService', ['$resource', function ($resource) {
			return $resource('main.json');	
}])
app.factory('newsService', ['$http','$q', function ($http, $q) {
	return {
		getNews: function () {
			var deferred = $q.defer();
			$http({method: 'POST', url: 'news.json'}).success(
				function (data, status, headers, config) {
					deferred.resolve(data.news);
				}).error(function() {
					deferred.reject(status);
				});
			return deferred.promise;
		}
	};
}])
app.factory('orderService', ['$http','$q', function ($http, $q) {
	return {
		getOrder: function () {
			var d = $q.defer();
			$http({method: 'POST', url: 'order.json'}).success(
				function (data, status, headers, config) {
					d.resolve(data.order);
				}).error(function() {
					d.reject(status);
				});
			return d.promise;	
		}
	};
}])
app.factory('goodsService', ['$http','$q', function ($http, $q) {
	return {
		getGoods: function () {
			var d = $q.defer();
			$http({method: 'POST', url: 'goods.json'}).success(function (data, status, headers, config) {
				d.resolve(data.goods);
			}).error(function() {
				d.reject(status)
			});
			return d.promise;		
		}
	};
}])