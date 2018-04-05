'use strict';
app.controller('UsersCtrl', function($scope, $rootScope ,$location, $timeout, $q , $auth,$filter, $mdDialog, UsersService) {
      $scope.name = null;
      $scope.user = null;
      $scope.pass = null;

    $scope.deserr = "";
    $scope.showerror=false;

      $scope.getUser = function(id_) {
        UsersService.getUser(id_).then(function(response){
            $scope.user = response.data.data;
        }).catch(function(err){
            console.log(err);
        });
      };

    $scope.register = function() {
      if ($scope.loginForm.$valid) {
          var user = {
              description: $scope.name,
              email: $scope.user,
              password: $scope.pass
          };
          UsersService.store(user).then(function(data){
              var d = data.data;
              $rootScope.showAlert (d.type, d.message);
              //$location.path('/');
              $rootScope.showLogin();
          }).catch(function(err){
              console.log("errorr...");
              $scope.showerror=true;
              $scope.deserr = err.data.message;
              console.log(err.data.message);
          });
       }else {
          $scope.showerror=true;
          $scope.deserr = $filter('translate')('requiredallFields');
       }  
        
    }

    $scope.update = function() {
        $scope.user.image = $scope.file ? 'data:' + $scope.file.filetype + ';base64,' + $scope.file.base64 : '';
        UsersService.update($scope.user).then(function(data){
            var d = data.data;
            $rootScope.showAlert (d.type, d.message);
            $rootScope.showProfile();
        }).catch(function(err){
            $scope.showerror=true;
            $scope.deserr = err.message;
        });
    };

})
