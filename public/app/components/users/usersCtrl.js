'use strict';

/**
 * @ngdoc function
 * @name emeelsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the emeelsApp
 */
var module = angular.module('startApp.users',['ngResource']);
// @@@@@@@@@@@ ------------- Services ------------- @@@@@@@@@@@
module.service('UserData',function($http, $resource, $q){
  //return $resource('http://localhost:9000/app/models/users.json');
  return $resource('http://localhost:3000/entity/nodes/:id',{id:'@_id'},{
    update: {
      method: 'PUT'
    }
  });
}).service('popupService',function($window){
  this.showPopup=function(message){
    return $window.confirm(message);
  }
});


// @@@@@@@@@@@ ------------- Controller ------------- @@@@@@@@@@@
module.controller('UsersListCtrl', ['$scope', '$window', 'popupService', '$routeParams', '$http', 'UserData', function ($scope, $window, popupService, $routeParams, $http, UserData) {
  //$scope.users = UserData.all(promises);
  //$scope.users = UserData;
  //alert('Hola mundo!!');
  //$http.get('http://localhost:9000/app/models/users.json').success(function(data){ // There are a better way!
  //  $scope.users = data;
  //});
  UserData.query();
  $scope.deleteUser = function(users){
    if(popupService.showPopup('Really delete this?')){
      users.$delete(function(){
         $window.location.href = 'users';//Redirect to home...
      });
    }
  };
}]).controller('UserViewCtrl', ['$scope', '$http', '$routeParams', 'UserData', function($scope, $http, $routeParams, UserData){
  $http.get('http://localhost:9000/app/models/users.json').success(function(data){ // There are a better way!
    $scope.user = data[$routeParams.id - 1];
  });
}]).controller('UserCreateCtrl',['$scope', '$http', 'UserData', '$routeParams', function($scope, $http, UserData, $routeParams){
  $scope.users = UserData.query();
  $scope.setData = function(data){
    //$scope.users.push(data);
    //$scope.users.$save();
    new UserData(data).$save().then(function(newUser) {
      $scope.users.push(newUser);
    });
  };


}]).controller('UserEditCtrl', ['$scope', 'UserData', '$routeParams', '$http', function($scope, UserData, $routeParams, $http){
  $scope.loadUser = function(){
    $scope.user = UserData.get({id: $routeParams.id});
  };
  $scope.loadUser();
}]);

