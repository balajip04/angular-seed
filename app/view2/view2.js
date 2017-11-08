'use strict';

angular.module('myCtrl', [])
.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
})
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
      directive: 'fileModel',
    controller: 'myCtrl'
  });
}])

    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function(){
                    scope.$apply(function(){
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])


    .controller('myCtrl', function($scope,$http){
      console.log('My controller');
        $scope.image = {
            'type': {'name': '','value':''},
        };

        $scope.imageList = [
            {'name': 'InventoryImage','value':'InventoryImage'}
        ];


        $scope.uploadFile = function(){
            console.log('My controller fnct');

            var imageType =  $scope.image.type.name;
            console.log('imageType --- '+imageType);
            var file = $scope.myFile;

            console.log('file is ' );
            // use $.param jQuery function to serialize data from JSON
            var data = $scope.myFile;

            var config = {
                headers : {

                }
            }





          $http.post('http://localhost:9002/image-processing-service/1.0/image/'+imageType, file, config)
                    .success(function (result) {
                        $scope.phoneNumber = result.phoneNumber;
                        $scope.parsedText = result.parsedText;
                        $scope.licensePlate = result.licensePlate;
                        $scope.src = result.image;

                    })
                    .error(function (file, status, header, config) {
                        $scope.ResponseDetails = "Data: " + file +
                            "<hr />status: " + status +
                            "<hr />headers: " + header +
                            "<hr />config: " + config;
                    });

            };
    });