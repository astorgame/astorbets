'use strict';
app.controller('homeCtrl', function($scope, $rootScope, $location, $stateParams,$timeout, $q, $filter,$mdDialog,TypegamesService, GamesService,AreasService,WalletsService,BetsService  ) {
    $rootScope.getUserinfo();
    var opcx = $stateParams.game;

    $scope.ls_typegames={};
    $scope.ls_games={};
    $scope.ls_areas={};
    $scope.ls_events={};
    $scope.areascount = 0;

    $scope.sel_matchbet={};
    $scope.ls_wallets={};
    $scope.montoapuesta = 0;
    $scope.wallet = 0;
    $scope.showerror=false;
    $scope.deserr = "";

    $scope.getListWallets = function(){
        var query1 = {
            listfbets: 1
        };
        WalletsService.list(query1).then(function(response){
             $scope.ls_wallets =response.data.data;
        },function(response){
            
        });   
    };
    $scope.getListBets = function(){
        var query1 = {
            listfbets: 1
        };
        BetsService.list(query1).then(function(response){
            $scope.ls_bets =response.data.data;
        },function(response){
            
        });   
    };



    $scope.betmath = function(objmatch,tipo) {
        $scope.getListWallets() ;
        $scope.getListBets ();
        var stds  =0;
        var ope = "";
        var team_bet = "",team_bet_id = "0" ;
        if( tipo==1 ){
            stds =objmatch.one;
            ope = "bet_1";
            team_bet=objmatch.matchdetails[0].team.description;
            team_bet_id = objmatch.matchdetails[0].team.id;
        }else if( tipo==2 ){
            stds =objmatch.two;
            ope = "bet_2";
            team_bet=objmatch.matchdetails[1].team.description;
            team_bet_id = objmatch.matchdetails[1].team.id;
        }else{   
            stds =objmatch.draw;
            ope = "bet_x";
            team_bet = "";
            team_bet_id = "0";
        } 
        var betdata = {
            matchid: objmatch.id,
            bet_match: objmatch.matchdetails[0].team.description+' vs '+ objmatch.matchdetails[1].team.description,
            bet_st: stds,
            bet_operacion : ope,
            bet_team_des : team_bet,
            bet_team_id : team_bet_id ,
            monto: 0,
            wallet: 0
        };
        $scope.sel_matchbet =betdata;
        $rootScope.view_bet="views/priv/bets/bets.html";
    };  


        $scope.getListTypegames = function(){
            var querytypegames = {
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo,icono"
            };
            TypegamesService.list(querytypegames).then(function(response){
                $scope.ls_typegames =response.data.data;
            },function(response){
                
            });   
        };

        $rootScope.getListGames = function(typegame_id){
            $scope.getListBets();
            var querygames = {
                filterby: 'typegame_id',
                filterid: typegame_id,
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo,icono"
            };
            GamesService.list(querygames).then(function(response){
                $scope.ls_games =response.data.data;
                $scope.getGame($scope.ls_games[0]);
            },function(response){
                
            });   
        };
        
        $scope.getGame  = function(item_sel) {
            $rootScope.actual_view="views/events.html";
            $rootScope.view_play="views/live.html";
            $scope.record_selected = item_sel;
            var queryareas = {
                filterby: 'game_id',
                filterid: item_sel.id,
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo"
            };
            AreasService.list(queryareas).then(function(response){
                $scope.ls_areas =response.data.data;
            },function(response){
                
            });   
           var query = {
                filterby: 'game_id',
                filterid: item_sel.id,
                order: 'order_view',
                orderdir: 'asc',
                list: 1,
                limit: 5,
                page: 1
            };
            AreasService.list(query).then(function(response){
                 $scope.ls_events =response.data.data;
                 $scope.areascount = response.data.total;
            },function(response){
                 
            }); 
        }; 

        
        $scope.placebet = function(){
            console.log("datos:"+ $scope.sel_matchbet.monto + ", wallet :"+$scope.sel_matchbet.wallet );
           // if ($scope.betForm.$valid) {
                $scope.showerror=false; 
                var datasend = {
                    match : $scope.sel_matchbet.matchid,
                    amount : $scope.sel_matchbet.monto ,
                    wallet : $scope.sel_matchbet.wallet,
                    typebet: $scope.sel_matchbet.bet_operacion,
                    team : $scope.sel_matchbet.bet_team_id
                };
                BetsService.store(datasend).then(function(response){
                    var d = response.data;
                    $scope.getListBets();
                    if( d.sucess){
                        $rootScope.showAlert (d.type,d.message);
                    }else{
                        $rootScope.showAlert (d.type,d.message);
                    }
                }).catch(function(err){
                    $scope.showerror=true;
                    $scope.deserr = err.data.message;

                });
           /* }else{
                $scope.showerror=true;
                $scope.deserr = "Todos los campos son requeridos"; 
            }    */
        };


        $scope.cancel_bet = function(ev, id) {
            var l_txt="confirmCancel";
            var confirm = $mdDialog.confirm()
            .title($filter('translate')(l_txt))
            .targetEvent(ev)
            .ok($filter('translate')('yes'))
            .cancel($filter('translate')('no'));
    
            $mdDialog.show(confirm).then(function() {
                BetsService.cancel(id).then(function(response){
                    var d = response.data;
                    if( d.sucess){
                        $scope.getListBets();
                    }else{
                        $rootScope.showAlert (d.type,d.message);
                    }
                }).catch(function(err){
                    //console.log(err);
                })
            }, function() {
    
            });
        };


        
});
