/**
 * @ngdoc function
 * @name emeelsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the emeelsApp
 */
var module = angular.module('startApp.userCrl', ['restangular']);


// @@@@@@@@@@@ ------------- Controller ------------- @@@@@@@@@@@
module.controller('UserIndexCtrl', ['$scope', '$routeParams', 'appData', function ($scope, $routeParams, appData) {// LIST
  $scope.entitiesWrapp = appData.all('user/nodes').getList().$object;
}]).controller('UserViewCtrl', ['$scope', '$routeParams', 'appData', function($scope, $routeParams, appData){// VIEW
  $scope.entityWrapp = appData.one('user/nodes', $routeParams.id).get().$object;
}]).controller('UserCreateCtrl', [ '$scope', 'appData', '$routeParams', '$location', '$http', function($scope, appData, $routeParams, $location, $http){// CREATE
  $scope.setNode = function() {
    var entity = appData.all('user/nodes');
    entity.post('nodeEntity', $scope.entityWrapp).then(function(){
      $location.path('/user');
    });
  };
}]).controller('UserEditCtrl', ['$scope', 'appData', '$routeParams', '$location', function($scope, appData, $routeParams, $location){// EDIT
  $scope.entityWrapp = appData.one('user/nodes', $routeParams.id).get().$object;
  $scope.setData = function(data) {
    appData.one('user/nodes',$routeParams.id).put(data).then(function() {
      $location.path('/user');
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