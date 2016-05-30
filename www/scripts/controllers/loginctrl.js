'use strict';

/**
 * @ngdoc function
 * @name backofficeWebappApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the backofficeWebappApp
 */
angular.module('mantraAttendence')
  	.controller('LoginCtrl', function ($scope, UserService, $window, $location) {
  		$scope.error = false;
		if(localStorage.getItem('user')){
  			var user = JSON.parse(localStorage.getItem("user"))
            $location.path('/home')
  		}
		$scope.submitForm = function() {
			$scope.error = false;
			if ($scope.loginForm.$valid) {
				console.log('in submitform',$scope.user);
				var company = $scope.user.email.split('@')[1]
				console.log('company',company);
				if(company == "mantralabsglobal.com"){
					console.log('if');
					var user = {
						mobile: "+91"+$scope.user.mobile,
						email: $scope.user.email,
						imei : localStorage.getItem('imei'),
						mobile_device_id: localStorage.getItem('device_id')
					};
					console.log('user data',user);
					UserService.login(user)
					.then(function(response){
						console.log('response',response);
						localStorage.setItem('user',JSON.stringify(response));
						localStorage.setItem('token',response.token);
						$location.path("/home");
					}).catch(function(err){
						console.log('err',err);
						// $scope.error = true;
						// $scope.errorMsg = err.error;
						// $scope.errorMsg = "wrong credentials";
					})
				} else {
					console.log('else');
					$scope.error = true;
					$scope.errorMsg = "Please use your company mail Id";
				}
				
			}
	    }
    
});
