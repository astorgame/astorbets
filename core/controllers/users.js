'use strict';
app.controller('UsersCtrl', function($scope, $rootScope, $localStorage,$location, $timeout, $q , $auth,$filter, $mdDialog, UsersService) {
    $scope.pb_usr = false;
    $scope.name  = null;
    $scope.user  = null;
    $scope.pass  = null;

    $scope.deserr = "";
    $scope.showerror=false;

    $scope.getUser = function(id_) {
        $scope.pb_usr = true; 
        UsersService.getUser(id_).then(function(response){
            $scope.pb_usr = false; 
            $scope.user = response.data.data;
        }).catch(function(err){
            $scope.pb_usr = false; 
        });
    };

    $scope.register = function() {
      if ($scope.loginForm.$valid) {
            $scope.pb_usr = true;
            var user = {
                description: $scope.name,
                email: $scope.user,
                password: $scope.pass
            };
            UsersService.store(user).then(function(data){
                $scope.pb_usr = false; 
                var d = data;
                if (data.status==200){
                    $rootScope.showAlert (d.type, d.message);
                    $auth.setToken(d.token);
                    $rootScope.setUserinfo(d.user);
                    $rootScope.actual_view="views/events.html";
                    $rootScope.getListGames(1);
                    $rootScope.getInitvals();
                }else{
                    $scope.showerror=true;
                    $scope.deserr = d.message; 
                   // $rootScope.showAlert (d.type, d.message);
                }   
            }).catch(function(err){
                $scope.pb_usr = false; 
                $scope.showerror=true;
                $scope.deserr = err.data.message;
            });
       }else{
          $scope.pb_usr = false; 
          $scope.showerror=true;
          $scope.deserr = $filter('translate')('requiredallFields');
       }  
    };

    $scope.forgot = function() {
        if ($scope.loginForm.$valid) {
              $scope.pb_usr = true;
              var user = {
                  email: $scope.user
              };
              UsersService.lost(user).then(function(data){
                  $scope.pb_usr = false; 
                  var d = data.data;
                  if (data.status==200){
                       $rootScope.showAlert (d.type, d.message);
                       $rootScope.showLogin();
                   }else{
                       $scope.showerror=true;
                       $scope.deserr = d.message; 
                      // $rootScope.showAlert (d.type, d.message);
                   }   
              }).catch(function(err){
                  $scope.pb_usr = false; 
                  $scope.showerror=true;
                  $scope.deserr = err.data.message;
              });
         }else{
            $scope.pb_usr = false; 
            $scope.showerror=true;
            $scope.deserr = $filter('translate')('requiredallFields');
         }  
     };

    $scope.update = function() {
        $scope.pb_usr = true; 
        //$scope.user.image = $scope.file ? 'data:' + $scope.file.filetype + ';base64,' + $scope.file.base64 : '';
        UsersService.update($scope.user).then(function(data){
            var d = data.data;
            if (data.status==200){
                $rootScope.setUserinfo(d.item);
                $rootScope.showAlert (d.type, d.message);
            }else{
                $scope.showerror=true;
                $scope.deserr = d.message; 
            }    
           // $rootScope.showProfile();
            $scope.pb_usr = false; 
        }).catch(function(err){
            $scope.pb_usr = false; 
            $scope.showerror=true;
            $scope.deserr = err.message;
        });
    };



})
