'use strict';

/**
 * @ngdoc function
 * @name backofficeWebappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the backofficeWebappApp
 */
angular.module('mantraAttendence')
  	.controller('HomeCtrl', function ($scope, UserService, $window, $location) {
  		var getPosition = function(){
  			console.log('fn called');
  			navigator.geolocation.getCurrentPosition(onSuccess, onError,{timeout: 10000});
  		}
  		function onSuccess(position){
  			var Obj = {
  				data:[]
  			};

  			var pos = {
  				"point" : {
  					"x" : position.coords.latitude,
  					"y" : position.coords.longitude 
  				},
  				"capturedAt" : moment().format("YYYY-MM-DD")
  				
  			};
  			Obj.data.push(pos);
  			console.log('Obj',Obj);
  			UserService.sendLocation(Obj)
  			.then(function(response){
  				console.log('sendLocation response',response);
  			}).catch(function(error){
  				console.log('sendLocation error',error);
  			})
  		}
  		function onError(error){
  			console.log('geo loc',error);
  		}
  		
  	
  		// $scope.getPos = function(){
  		// 	getPosition();
  		// }
      
      UserService.getAttendence()
      .then(function(response){
        console.log('getAttendence resp',response);
        $scope.records = response;
        _.each($scope.records,function(record){
            record.loginTime =  moment(record.loginTime).format('MMM DD YYYY h:mm A');
            record.logoutTime =  moment(record.logoutTime).format('MMM DD YYYY h:mm A');
            record.date = moment(record.date).format('MMM DD YYYY');
        })
        console.log('$scope.records',$scope.records);
      }).catch(function(error){
        console.log('getAttendence error');
      })

  		// 		(function(){
		//     setTimeout(function() {
		//     	getPosition();
		//     }, 600000);
		// })();

  		getPosition();
  		setInterval(function() {
		    	getPosition();
	    }, 600000);
  		
  		$scope.logout = function(){
  			localStorage.clear();
  			$location.path('/login');
  		}


      

  		// var callbackFn = function(location) {
	   //      console.log('[js] BackgroundGeoLocation callback:  ' + location.latitude + ',' + location.longitude);
	 
	   //      // Do your HTTP request here to POST location to your server. 
	   //      // jQuery.post(url, JSON.stringify(location)); 
	 
	   //      /*
	   //      IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
	   //      and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
	   //      IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
	   //      */
	   //      backgroundGeoLocation.finish();
	   //  };
	 
	   //  var failureFn = function(error) {
	   //      console.log('BackgroundGeoLocation error');
	   //  };
	 
	   //  // BackgroundGeoLocation is highly configurable. See platform specific configuration options 
	   //  backgroundGeoLocation.configure(callbackFn, failureFn, {
	   //      desiredAccuracy: 10,
	   //      stationaryRadius: 20,
	   //      distanceFilter: 30,
	   //      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle. 
	   //      stopOnTerminate: false, // <-- enable this to clear background location settings when the app terminates 
	   //  });
	 
	   //  // Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app. 
	   //  backgroundGeoLocation.start();

});
