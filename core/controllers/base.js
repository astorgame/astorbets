'use strict';

app.controller('DashboardCtrl', function($scope, $state, $translate, $rootScope, $auth) {

    $scope.$state = $state;

    $scope.date = new Date();
    $scope.layoutToggler = function(y){

		if(y==$scope.multiCollapseVar)
			$scope.multiCollapseVar = 0;
		else
			$scope.multiCollapseVar = y;
	};

	$scope.load = (function(){
		$('#world-map').vectorMap({
			backgroundColor: '#FFFFFF',	
			zoomOnScroll: false,
			regionStyle: {
				initial: {
					fill: '#CCC'
				},
				hover: {
					fill: "#3CA2E0"
				}
			}
		});
	});
	$scope.changeLanguage = (function (l) {
		
		$translate.use(l);			
		
	});

	$scope.authenticate = function(provider) {
      $auth.authenticate(provider)
      	.then(function(data){
      		console.log(data)
      	})
    };

});	
