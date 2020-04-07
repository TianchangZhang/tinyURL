angular.module("tinyurlApp")
    .controller("homeController", ["$scope", "$http", "$location", function($scope, $http, $location) {
        $scope.submit = function() {
            $http.post("/api/v1/urls", {
                longUrl: $scope.longUrl
            }).then(function(response){
                $location.path("/urls/" + response.data.shortUrl);
            }, function(response){
                console.log("what happened");
            });
        }
    }]);