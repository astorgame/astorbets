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

app.run(['$rootScope', '$timeout','$state' ,'$location','$auth', '$localStorage','$translate','$mdDialog' ,'$filter',
    function ($rootScope,$timeout,$state,$location,$auth,$localStorage,$translate, $mdDialog,$filter ) {

        $rootScope.actual_view="";
        $rootScope.view_bet="";
        $rootScope.view_play="";
        $rootScope.view_playnow="views/live.html";
        $rootScope.userinfo=null;
        $rootScope.activeaddrx = "";
        $rootScope.activetypec = "";
        $rootScope.activewll = 0;
        $rootScope.active_wallet = {};
        $rootScope.list_tmp_bets = $localStorage.tmp_bets || [];
        $rootScope.list_tmp_lives = $localStorage.tmp_lives || [];
        $rootScope.active_typebet = 1;
        
        $rootScope.isListEmpty = function(obj) {
            var tam = obj.length;
            if( tam===0 )
               return true;
            else 
              return false; 
        }
        $rootScope.isAuthenticated = function() {
            return $auth.isAuthenticated();
        };
        $rootScope.setUserinfo= function(usr) {
            $localStorage.user= usr;
            $rootScope.userinfo= $localStorage.user;
       };
        $rootScope.getUserinfo= function() {
             $rootScope.userinfo= $localStorage.user;
        };
        $rootScope.cerrarSesion = function() {
            $auth.logout().then(function() {
                $rootScope.userinfo=null;
                delete $localStorage.user;
                delete $rootScope.list_tmp_bets;
                $state.go('/');
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
        $rootScope.changeActiveWallet = (function (item) {
			$rootScope.active_wallet =item;	
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
        };   
        $rootScope.showSignup = function() {
            $rootScope.actual_view="views/register.html";
        };   
        $rootScope.showForgot = function() {
            $rootScope.actual_view="views/forgot.html";
        };  
        $rootScope.showWallet = function() {
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
        $rootScope.showGamblingLimits = function() {
            $rootScope.actual_view="views/priv/limits.html";
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
        
        $rootScope.authenticate = function(provider) {
            $auth.authenticate(provider).then(function(d) {
                //console.log(d);
                if (d.status==200){
                   // $rootScope.showAlert ("Success", d.data.message);
                    $auth.setToken(d.data.token);
                    $rootScope.setUserinfo(d.data.user);
                    $rootScope.actual_view="views/events.html";
                    $rootScope.getListGames(1);
                    $rootScope.getInitvals();
                }else{
                    $rootScope.showAlert ("Error", d.data.message);
                }
            }).catch(function(error) {
                
            });
          };

    }
]);






