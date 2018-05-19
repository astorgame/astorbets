'use strict';
app.controller('homeCtrl', function($scope, $rootScope, $location,$localStorage, $stateParams,$timeout, $q, $filter,$mdDialog,TypegamesService, GamesService,AreasService,WalletsService,BetsService  ) {
    $rootScope.getUserinfo();
    var opcx = $stateParams.game;

    $scope.pb_c1=false;
    $scope.pb_c2=false;

    $scope.pb_events=false;
    $scope.pb_placebet=false;
    $scope.pb_loadtable=false;
    
    
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

    $scope.record_selected={};
    $scope.item_selected={};
    $scope.item_selected_comp="";
    $scope.item_selected_jorn="";
    

    $scope.class_filter_by_today="btn-noselected";
    $scope.class_filter_by_all="btn-selected";
    $scope.tit_filter_sel=$filter('translate')('tit_eventosdia');

    $scope.class_filter_by_t1="btn-tabselected";
    $scope.class_filter_by_t2="btn-tabnoselected";
    $scope.class_filter_by_t3="btn-tabnoselected";

    $scope.inputitembet_visible = true;
    $scope.inputbet_visible = false;

    $scope.total_odds = 0;
    $scope.total_stake = 0;
    $scope.total_retr = 0;
    $scope.total_monto= 0;

    //$scope.ttmonto = 0;
    $scope.formdata = { ttmonto: 0 };

    $scope.getTotal = function(){
        var tots  = 0;
        var mons  = 0;
        var odds  = 0;
        var inps  = 0;
        if( $rootScope.active_typebet ==1 ){
            angular.forEach($rootScope.list_tmp_bets, function (item) {
                odds += parseFloat(item.bet_st);
                inps += item.monto;
                mons += item.monto * item.bet_st;
            });  
            $scope.total_odds = odds;
            $scope.total_stake = inps;
            $scope.total_retr =mons;     
        }else if( $rootScope.active_typebet ==2 ){
            var i=0;    
            for(i = 0;i < $rootScope.list_tmp_bets.length;i++){
                if(i==0 ){
                    odds = parseFloat($rootScope.list_tmp_bets[i].bet_st);   
                }else{
                    odds = (  odds * parseFloat($rootScope.list_tmp_bets[i].bet_st) );  
                }
            }
            //console.log($scope.formdata.ttmonto.$modelValue);
            var monto =$scope.formdata.ttmonto;
            $scope.total_odds = odds;
            $scope.total_stake = monto;
            $scope.total_retr = monto * odds;
        }else if( $rootScope.active_typebet ==3 ){
            angular.forEach($rootScope.list_tmp_bets, function (item) {
                odds += parseFloat(item.bet_st);
                inps += item.monto;
                mons += item.monto * item.bet_st;
            });  
            $scope.total_odds = odds;
            $scope.total_stake = inps;
            $scope.total_retr = mons; 
        }
    }
    
    $scope.getListSWallets = function(){
        if(  $rootScope.isAuthenticated()  ){
            var query1 = {
                listfbets: 1
            };
            WalletsService.list(query1).then(function(response){
                $scope.ls_wallets =response.data.data;
                $rootScope.changeActiveWallet($scope.ls_wallets[0]);
            },function(response){
                
            });   
       }
    };
    $scope.getListBets = function(){
        if(  $rootScope.isAuthenticated()  ){
            var query1 = {
                listfbets: 1
            };
            BetsService.list(query1).then(function(response){
                $scope.ls_bets =response.data.data;
            },function(response){
                
            });  
        }   
    };

    
    $rootScope.getInitvals = function(){
        $rootScope.list_tmp_bets = $localStorage.tmp_bets || [];
        $scope.getListSWallets();
        $scope.getListBets();
    };
    $scope.getInitvalsBets = function(){
        $rootScope.list_tmp_bets = $localStorage.tmp_bets || [];
        $rootScope.view_bet="views/priv/bets/bets.html";
    };

    $scope.getMatchDetails = function(objitm,tj,tc) {
        $scope.item_selected=objitm;
        $scope.item_selected_comp=tc;
        $scope.item_selected_jorn=tj;
        $rootScope.actual_view="views/events-details.html";
    };  

    $scope.betmath = function(objmatch,tipo) {
            $scope.getListSWallets() ;
           //$scope.getListBets ();
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
                id: objmatch.id+'-'+team_bet_id,
                matchid: objmatch.id,
                bet_match: objmatch.matchdetails[0].team.description+' vs '+ objmatch.matchdetails[1].team.description,
                bet_st: stds,
                bet_operacion : ope,
                bet_team_des : team_bet,
                bet_team_id : team_bet_id,
                monto: 0
            };
            $rootScope.list_tmp_bets.push(betdata);
            $localStorage.tmp_bets =  $rootScope.list_tmp_bets;
            $rootScope.view_bet="views/priv/bets/bets.html";
        };  


        $scope.getListTypegames = function(){
            $scope.pb_c1=true;
            var querytypegames = {
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo,icono"
            };
            TypegamesService.list(querytypegames).then(function(response){
                $scope.ls_typegames =response.data.data;
                $scope.pb_c1=false;
            },function(response){
                $scope.pb_c1=false;
            });   
        };

        $rootScope.getListGames = function(typegame_id){
            $scope.pb_c2=true;
            var querygames = {
                filterby: 'typegame_id',
                filterid: typegame_id,
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo,icono"
            };
            GamesService.list(querygames).then(function(response){
                $scope.ls_games =response.data.data;
                $scope.getGame($scope.ls_games[0],1);
                $scope.pb_c2=false;
            },function(response){
                $scope.pb_c2=false;
            });   
        };

        $scope.setTypeBet  = function(type) {
            $rootScope.active_typebet =type;
            if(type==1 ){
                $scope.class_filter_by_t1="btn-tabselected";
                $scope.class_filter_by_t2="btn-tabnoselected";
                $scope.class_filter_by_t3="btn-tabnoselected";
                $scope.inputitembet_visible = true;
                $scope.inputbet_visible = false;
            }else if(type==2 ){
                $scope.class_filter_by_t1="btn-tabnoselected";
                $scope.class_filter_by_t2="btn-tabselected";
                $scope.class_filter_by_t3="btn-tabnoselected";
                $scope.inputitembet_visible = false;
                $scope.inputbet_visible = true;
            }else if(type==3 ){
                $scope.class_filter_by_t1="btn-tabnoselected";
                $scope.class_filter_by_t2="btn-tabnoselected";
                $scope.class_filter_by_t3="btn-tabselected";
                $scope.inputitembet_visible = false;
                $scope.inputbet_visible = true;
            }    
            $scope.getTotal();
        };    



        $scope.getGame  = function(item_sel,type) {
            $scope.pb_events=true;
            $rootScope.actual_view="views/events.html";
            //$rootScope.view_play="views/live.html";
            $scope.record_selected = item_sel;
            
           /* var queryareas = {
                filterby: 'game_id',
                filterid: item_sel.id,
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo"
            };
            AreasService.list(queryareas).then(function(response){
                $scope.ls_areas =response.data.data;
            },function(response){
                
            });*/
            var flimit =  'today';
            $scope.class_filter_by_today="btn-selected";
            $scope.class_filter_by_all="btn-noselected";
            $scope.tit_filter_sel=$filter('translate')('tit_eventosdia');
            if(type==2 ){
                flimit =  'all';
                $scope.class_filter_by_today="btn-noselected";
                $scope.class_filter_by_all="btn-selected";
                $scope.tit_filter_sel= $filter('translate')('tit_eventostodos');
            }    
           var query = {
                filterby: 'game_id',
                filterid: item_sel.id,
                filtertype: flimit,
                order: 'order_view',
                orderdir: 'asc',
                list: 1,
                limit: 5,
                page: 1
            };
            AreasService.list(query).then(function(response){
                 $scope.ls_events =response.data.data;
                 $scope.pb_events=false;
                // $scope.areascount = response.data.total;
            },function(response){
                $scope.pb_events=false;
            }); 
        }; 

        
        $scope.placebet = function(){
            $scope.showerror=false; 
            if(  $rootScope.isAuthenticated()  ){
                $scope.pb_placebet=true; 
                var datasend = {
                    ac_amount : $scope.formdata.ttmonto,
                    ac_odds : $scope.total_odds,
                    wallet: $rootScope.active_wallet.id,
                    type : $rootScope.active_typebet,
                    items : $rootScope.list_tmp_bets
                };
                BetsService.store(datasend).then(function(response){

                    var d = response.data;
                    if( d.sucess){
                        delete $localStorage.tmp_bets;
                        $rootScope.getInitvals();
                        $rootScope.showAlert (d.type,d.message);
                    }else{
                        $rootScope.showAlert (d.type,d.message);
                    }
                    $scope.pb_placebet=false;
                }).catch(function(err){
                    $scope.pb_placebet=false;
                    $scope.showerror=true;
                    $scope.deserr = err.data.message;
                });
            }else{
                $scope.showerror=true;
                $scope.deserr = $filter('translate')('tit_nosession');
            }   
        };


        $scope.cancel_bet = function(index) {
            $rootScope.list_tmp_bets.splice(index, 1);
            $localStorage.tmp_bets =  $rootScope.list_tmp_bets;
            $scope.getTotal();
            $rootScope.view_bet="views/priv/bets/bets.html";    
        };

        $scope.delete_bet = function(ev, id) {
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
                        $rootScope.showAlert (d.type,d.message);
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
