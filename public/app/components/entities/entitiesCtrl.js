/**
 * @ngdoc function
 * @name emeelsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the emeelsApp
 */
var module = angular.module('startApp.entityCrl', ['restangular']);


// @@@@@@@@@@@ ------------- Controller ------------- @@@@@@@@@@@
module.controller('EntityIndexCtrl', ['$scope', '$routeParams', 'appData', '$location', function ($scope, $routeParams, appData, $location) {// LIST

    $scope.entitiesWrapp = appData.all('entity/nodes').getList().$object;

}]).controller('EntityViewCtrl', ['$scope', '$routeParams', 'appData', function($scope, $routeParams, appData){// VIEW

    $scope.entityWrapp = appData.one('entity/nodes', $routeParams.id).get().$object;

}]).controller('EntityCreateCtrl', [ '$scope', 'appData', '$routeParams', '$location', function($scope, appData, $routeParams, $location){// CREATE

    $scope.setNode = function() {
        var entity = appData.all('entity/nodes');
        entity.getList().then(function(entities){
            $scope.entitiesWrapp = entities;
        });
        ////console.log($scope.entityWrapp);
        entity.post('entitiesWrapp', $scope.entityWrapp).then(function(res) {
            $location.path('/entity');
        }, function(err) {
            $location.path('/entity');
        });
    };

}]).controller('EntityEditCtrl', ['$scope', 'appData', '$routeParams', '$location', function($scope, appData, $routeParams, $location){// EDIT

    $scope.entityWrapp = appData.one('entity/nodes', $routeParams.id).get().$object;
    $scope.setData = function(data) {
        appData.one('entity/nodes',$routeParams.id).put(data).then(function() {
            $location.path('/entity');
        });
    };

}]);


//function EditCtrl($scope, $location, Restangular, project) {
//    var original = project;
//    $scope.project = Restangular.copy(original);
//
//
//    $scope.isClean = function() {
//        return angular.equals(original, $scope.project);
//    }
//
//    $scope.destroy = function() {
//        original.remove().then(function() {
//            $location.path('/list');
//        });
//    };
//
//    $scope.save = function() {
//        $scope.project.put().then(function() {
//            $location.path('/');
//        });
//    };
//}