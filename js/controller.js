var app = angular.module('app', ['ngRoute']);
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
 				var self = this
     			var promiseObj=dataService.getData();
       			 promiseObj.then(function(value) {
        			self.nsw = value;
       			});
       			self.fil = 1;
				self.left = function() {
					self.fil = (self.fil == 1) ? 3 : --self.fil;
 				}
 				self.right = function () {
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
		controller: function (mainService) {
			var self = this;
			var promiseObj = mainService.getMain();
			promiseObj.then(function (val) {self.block = val})		
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
app.factory('mainService', ['$http','$q', function ($http, $q) {
	return {
		getMain: function () {
			var defe = $q.defer();
			$http({method: 'POST', url: 'main.json'}).success(
				function (data, status, headers, config) {
					defe.resolve(data.slides);
				}).error(function() {
					defe.reject(status);
				});
			return defe.promise;	
		}
	};
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