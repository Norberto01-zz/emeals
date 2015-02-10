/**
 * Created by root on 1/28/15.
 */
//function binarySearch(array, key) {
//  var lo = 0,
//    hi = array.length - 1,
//    mid,
//    element;
//  while (lo <= hi) {
//    mid = ((lo + hi) >> 1);
//    element = array[mid];
//    if (element < key) {
//      lo = mid + 1;
//    } else if (element > key) {
//      hi = mid - 1;
//    } else {
//      return mid;
//    }
//  }
//  return -1;
//}
//var module = angular.module( 'startApp.resource', [ 'ngResource' ] );
//
//module.factory( 'Resource', [ '$resource', function( $resource ) {
//  return function( url, params, methods ) {
//
//    var defaults = {
//      update: { method: 'put', isArray: false },
//      create: { method: 'post' }
//    };
//    methods = angular.extend( defaults, methods );
//
//    var resource = $resource( url, params, methods );
//    resource.prototype.$save = function() {
//      if ( !this.id ) {
//        return this.$create();
//      }
//      else {
//        return this.$update();
//      }
//    };
//    return resource;
//  };
//}]);

var module = angular.module('startApp.service',['restangular']);

module.factory('appData',function(Restangular){
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://localhost:3000');
  });

});