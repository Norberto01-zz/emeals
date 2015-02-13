/**
 * Created by root on 2/3/15.
 */

var module = angular.module('startApp', ['ngSanitize', 'ngTouch', 'ngRoute', 'startApp.entityCrl', 'startApp.userCrl', 'startApp.service']);
module.config(['$routeProvider', function($routeProvider) {// ---------------Entity -----------------------------------
        $routeProvider.when('/entity', {
            templateUrl: 'partials/entities/list.jade',
            controller: 'EntityIndexCtrl'
        }).when('/entity/:id/view', {
            templateUrl: 'partials/entities/view.jade',
            controller: 'EntityViewCtrl'
        }).when('/entity/:id/edit', {
            templateUrl: 'partials/entities/edit.jade',
            controller: 'EntityEditCtrl'
        }).when('/entity/new', {
            templateUrl: 'partials/entities/add.jade',
            controller: 'EntityCreateCtrl'
        }).when('/users', {// ---------------------------------------------- USERS -------------------------------------
            templateUrl: 'partials/users/list.jade',
            controller: 'UserIndexCtrl'
        }).when('/user/:id/view', {
            templateUrl: 'partials/users/view.jade',
            controller: 'UserIndexCtrl'
        }).when('/user/:id/edit', {
            templateUrl: 'partials/users/edit.jade',
            controller: 'UserEditCtrl'
        }).when('/user/new', {
            templateUrl: 'partials/users/add.jade',
            controller: 'UserCreateCtrl'
        });
}]);