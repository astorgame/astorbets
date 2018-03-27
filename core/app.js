'use strict';
window.app_version = 1.1;
var app =angular.module('astorbetsApp', ['astorbetsApp.models',
        'ui.router',
        'satellizer',
        'ngMaterial', 
        'ngMessages',
        'pascalprecht.translate',
        'ngStorage'
]);
var appModels = angular.module('astorbetsApp.models', []);

app.run(['$rootScope', '$timeout', '$location','$auth', '$localStorage' ,function ($rootScope,$timeout,$location,$auth,$localStorage ) {
        $rootScope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $rootScope.cerrarSesion = function() {
            $auth.logout().then(function() {
                $location.path('/');
                delete $localStorage.user;
            });
        };


    }
]);






