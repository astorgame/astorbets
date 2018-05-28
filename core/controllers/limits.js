'use strict';
app.controller('LimitsCtrl', function($scope, $rootScope ,$location, $timeout, $q , $auth,$filter, $mdDialog, WalletsService,LimitService) {
    $scope.pb_process = false;
    $scope.showerror=false;
    $scope.limit  = {
        opc : 0,
        period : 1,
        wallet: 1,
        amount :0
    };
    $scope.deserr = "";
    $scope.showerror=false;
  

    $scope.ls_periods=[
        {description:'1 Day', id:1},
        {description:'1 Week', id:2},
        {description:'1 Month', id:3}
    ];
    $scope.ls_wallets = {};

    $scope.getWallets = function(){
        if(  $rootScope.isAuthenticated()  ){
            var query1 = {
                listfbets: 1
            };
            WalletsService.list(query1).then(function(response){
                $scope.ls_wallets =response.data.data;
            },function(response){
                
            });   
       }
    };
    $scope.getlimit = function(opc) {
        $scope.pb_process = true; 
        LimitService.list({opc: opc}).then(function(response){
            $scope.pb_process = false; 
            $scope.limit = response.data;
        }).catch(function(err){
            $scope.pb_process = false; 
        });
    };

    $scope.save = function() {
        console.log($scope.limit);
       $scope.showerror=false; 
      /*if( $scope.limit.opc=="1" ){
         if (!$scope.limits1Form.$valid) {
            $scope.showerror=true;
         }
      }else if( $scope.limit.opc=="2" ){
        if (!$scope.limits2Form.$valid) {
           $scope.showerror=true;
        }
     }else if( $scope.limit.opc =="3" ){
        if (!$scope.limits3Form.$valid) {
           $scope.showerror=true;
        }
     }
      if( $scope.showerror){
          $scope.deserr = $filter('translate')('requiredallFields');
          return;
       }*/
          $scope.pb_process = true; 
          LimitService.store($scope.limit).then(function(data){
            //console.log(data);
                $scope.pb_process = false; 
                var d = data.data;
                if (data.status==200){
                    $rootScope.showAlert (d.type, d.message);
                }else{
                    $scope.showerror=true;
                    $scope.deserr = d.message; 
                }    
           }).catch(function(err){
                $scope.pb_process = false;  
                $scope.showerror=true;
                $scope.deserr = err.data.message;
          });
    };

    $scope.getInitvalsLimits = function(opc){
        $scope.getWallets ();
        $scope.limit.opc=1;
        $scope.getlimit($scope.limit.opc);
    };
    $scope.setTab = function(opc){
        $scope.limit.opc=opc;
        $scope.getlimit($scope.limit.opc);
        
    };


})
