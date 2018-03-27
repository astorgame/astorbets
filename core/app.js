'use strict';
window.app_version = 1.1;
var app =angular.module('astorbetsApp', ['astorbetsApp.models',
        'ngRoute',
        'satellizer',
        'ngMaterial', 
        'ngMessages'
]);
var appModels = angular.module('astorbetsApp.models', []);

app.run(['$rootScope', '$timeout', '$location', '$auth',function ($rootScope,$timeout,$location,$auth ) {
        $rootScope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $rootScope.cerrarSesion = function() {
            $auth.logout().then(function() {
                $location.path('/');
              //  delete $localStorage.user;
            });
        };


    }
]);






