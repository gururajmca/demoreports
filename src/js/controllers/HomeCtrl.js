angular.module('relecurareport')
.controller('HomeCtrl', [
    '$scope', '$http',
    function($scope, $http) {
        $scope.message = "Hello Relecura Reports";
        $scope.callBackEnd = function() {
            $scope.requestTime = "[Waiting]";
            $http.get('http://localhost:8082/sayhello').then(function(response) {
                var time = response.config.responseTimestamp - response.config.requestTimestamp;
                $scope.requestTime = (time / 1000);
            });
        }
    }
]);