'use strict';
window.app_version = 1.1;
var app =angular.module('astorbetsApp', ['astorbetsApp.models',
        'ui.router',
        'satellizer',
        'ngMaterial', 
        'ngMessages',
        'pascalprecht.translate',
        'ngStorage',
        'md.data.table',
        'angularMoment'
]);
var appModels = angular.module('astorbetsApp.models', []);

app.run(['$rootScope', '$timeout', '$location','$auth', '$localStorage','$translate','$mdDialog' ,'$filter',
    function ($rootScope,$timeout,$location,$auth,$localStorage,$translate, $mdDialog,$filter ) {
        $rootScope.actual_view="";
        $rootScope.view_bet="";
        $rootScope.view_play="";
        $rootScope.userinfo=null;
        
        $rootScope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $rootScope.getUserinfo= function() {
             $rootScope.userinfo= $localStorage.user;
        };
        
        $rootScope.cerrarSesion = function() {
            $auth.logout().then(function() {
                $rootScope.userinfo=null;
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
            $rootScope.getUserinfo();
            $rootScope.actual_view="views/priv/wallets/list.html";
        }; 
        $rootScope.showProfile = function() {
            $rootScope.getUserinfo();
            $rootScope.actual_view="views/priv/users/profile.html";
        };  

    }
]);






