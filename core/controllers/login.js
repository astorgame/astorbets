'use strict';
app.controller('LoginCtrl', function($scope,$rootScope,$location, $q , $auth, $localStorage) {

    $scope.user = null;
    $scope.pass = null;
    $scope.deserr = "";
    $scope.loginFailed=false;
    $scope.loginServerErrors = {
        loginFailed: false,
        loginNoAut: false,
        serverOffline: false
    };

    $scope.login = function() {
        if ($scope.loginForm.$valid) {
            var user = {
                email: $scope.user,
                password: $scope.pass
            };
            $auth.login(user).then(function(d) {
                if (d.status==200){
                    $auth.setToken(d.data.data.token);
                    $localStorage.user =  d.data.data.user;
                    //$location.path('/');  
                    $rootScope.showWallet(); 
                }
            }).catch(function(err) {
                $scope.loginFailed=true;
                $scope.deserr = err.data.message;
            });
        }
    };

});
