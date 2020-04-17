angular.module("tinyurlApp")
    .controller("urlController", ["$scope", "$http", "$routeParams", function ($scope, $http, $routeParams) {
        $http.get("/api/v1/urls/" + $routeParams.shortUrl)
            .then(function(response){
                $scope.longUrl = response.data.longUrl;
                $scope.shortUrl = "http://localhost:3000/"+response.data.shortUrl;
            }, function(response){
                console.log("can't get long url");
            });

        $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/totalClicks").
        then(function(response){
            $scope.totalClicks = response.data;
        }, function(response){
            console.log("can't get total clicks");
        });

        var renderChart = function (chart, infos) {
            $scope[chart + 'Labels'] = [];
            $scope[chart + 'Data'] = [];
            $http.get("/api/v1/urls/" + $routeParams.shortUrl + "/" + infos)
                .then(function(response) {
                    response.data.forEach(function (res) {
                        $scope[chart + 'Labels'].push(res._id);
                        $scope[chart + 'Data'].push(res.count);
                    });
                });
        };
        renderChart("doughnut", "referer");
        renderChart("bar", "platform");
        renderChart("base", "browser");
    }]);