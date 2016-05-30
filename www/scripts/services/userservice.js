'use strict';

angular.module('mantraAttendence')
    .service('UserService', function ($q, $http, $resource, $rootScope, $window) {
    // var baseUrl = "http://192.168.0.164:1337";
    var baseUrl = "http://apiattendance.rakeshmakam.com:1337";
    this.login = function (user) { 

        var deferred = $q.defer();  

        // $http.post(baseUrl+'login/', user)
        $http.post(baseUrl+'/signup', user)
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    this.sendLocation = function(data) {
    
        var deferred = $q.defer();  

        $http.post(baseUrl+'/location',data)
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    this.getAttendence = function() {
        console.log('getAttendence called');
    
        var deferred = $q.defer();  

        $http.get(baseUrl+'/attendance')
        .success(function(response){
            deferred.resolve(response);
        })
        .error(function(err) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

});