/**
 * Created by root on 2/3/15.
 */

var module = angular.module('startApp', ['ngSanitize', 'ngTouch', 'ngRoute', 'startApp.entityCrl', 'startApp.service']);
module.config(['$routeProvider',
    function($routeProvider) {
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
        });
}]);