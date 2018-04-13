'use strict';
window.app_version = 1.1;
var app =angular.module('astorbetsApp', ['astorbetsApp.models',
        'ngSanitize',
        'ui.router',
        'satellizer',
        'ngMaterial', 
        'ngMessages',
        'pascalprecht.translate',
        'ngStorage',
        'md.data.table',
        'angularMoment',
        'monospaced.qrcode'
]);
var appModels = angular.module('astorbetsApp.models', []);

app.run(['$rootScope', '$timeout', '$location','$auth', '$localStorage','$translate','$mdDialog' ,'$filter',
    function ($rootScope,$timeout,$location,$auth,$localStorage,$translate, $mdDialog,$filter ) {

        $rootScope.actual_view="";
        $rootScope.view_bet="";
        $rootScope.view_play="";
        $rootScope.userinfo=null;
        $rootScope.activeaddrx = "";
        $rootScope.activetypec = "";
        $rootScope.activewll = 0;
        
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
           // $rootScope.getListWallets();
            $rootScope.actual_view="views/priv/wallets/list.html";
        }; 
        $rootScope.showProfile = function() {
            $rootScope.getUserinfo();
            $rootScope.actual_view="views/priv/users/profile.html";
        }; 
        $rootScope.showTransactions = function() {
            $rootScope.actual_view="views/priv/transactions/list.html";
        }; 
        $rootScope.showMyBets = function() {
            $rootScope.actual_view="views/priv/bets/list.html";
        }; 
        $rootScope.walletDeposit= function(adx,type) {
            $rootScope.activeaddrx = adx;
            $rootScope.activetypec = type;
            $rootScope.actual_view="views/priv/wallets/abonar.html";
        }; 
        $rootScope.walletCashout = function(adx,wlid) {
            $rootScope.activeaddrx = adx;
            $rootScope.activewll = wlid;
            $rootScope.actual_view="views/priv/wallets/retirar.html";
        };  
    }
]);






