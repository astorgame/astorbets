'use strict';
window.app_version = 1.1;
var app =angular.module('astorbetsApp', ['astorbetsApp.models',
        'ui.router',
        'satellizer',
        'ngMaterial', 
        'ngMessages',
        'pascalprecht.translate',
        'ngStorage',
        'md.data.table'
]);
var appModels = angular.module('astorbetsApp.models', []);

app.run(['$rootScope', '$timeout', '$location','$auth', '$localStorage','$translate','$mdDialog' ,'$filter',
    function ($rootScope,$timeout,$location,$auth,$localStorage,$translate, $mdDialog,$filter ) {
        $rootScope.actual_view="";

        $rootScope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $rootScope.cerrarSesion = function() {
            $auth.logout().then(function() {
                $location.path('/');
                delete $localStorage.user;
            });
        };
        var originatorEv;
        $rootScope.openMenu = function($mdMenu, ev) {
            originatorEv = ev;
            $mdMenu.open(ev);
        };

        $rootScope.changeLanguage = (function (l) {
			$translate.use(l);			
        });
        
        $rootScope.showAlert = function(tit,text) {
            $mdDialog.show(
              $mdDialog.alert()
                .clickOutsideToClose(true)
                .title(tit)
                .textContent(text)
                .ariaLabel('Alert Dialog')
                .ok($filter('translate')('ok'))
            );
        };
       
        $rootScope.showLogin = function() {
            $rootScope.actual_view="views/login.html";
           /* $timeout(function() {
                $rootScope.$apply();
            });*/
        };   
        $rootScope.showSignup = function() {
            $rootScope.actual_view="views/register.html";
        };   
        $rootScope.showWallet = function() {
            $rootScope.actual_view="views/priv/wallets/list.html";
        };  


    }
]);






