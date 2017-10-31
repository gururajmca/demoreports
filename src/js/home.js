angular.module('relecurareport', [
    'ngRoute'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: './views/home.html',
                controller: 'HomeCtrl'
            })
            .when('/login', {
                templateUrl: './views/login.html',
                controller: 'HomeCtrl'
            });
    }
])
.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('timestampMarker'); 
}]);