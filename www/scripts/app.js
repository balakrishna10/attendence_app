'use strict';

/**
 * @ngdoc overview
 * @name backofficeWebappApp
 * @description
 * # backofficeWebappApp
 *
 * Main module of the application.
 */
angular
  .module('mantraAttendence', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .factory('httpinterceptor', ['$q', function($q) {  
        return {
            responseError: function(response) {
                // if (response.status == 401 || response.status == 500 || response.data.status == 401){
                //     localStorage.clear();
                //     window.location = '/login';
                // }
                return $q.reject(response);
            },
            request: function (config) {
               config.headers = config.headers || {};
               if (window.localStorage && localStorage.getItem('token')) {
                   var token = localStorage.getItem("token");
                   config.headers.Authorization = 'Bearer ' + token;
               }
               return config;
           },
        }
    }])

    .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.interceptors.push('httpinterceptor');
    var resolve = {
        auth: (['$q', '$location', function ($q, $location) {
        var defer = $q.defer();
        if (localStorage.getItem('user')) {
          defer.resolve({
            user: function( ) {
                return JSON.parse(localStorage.getItem("user"));
            }
          });
        } else {
          defer.reject();
          $location.path("/login");
        }   
        return defer.promise;
        }])
    };

$routeProvider
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        title:'Login'
    })
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        // resolve : resolve
    })
    .otherwise({
        redirectTo: '/login'
    });
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
})

