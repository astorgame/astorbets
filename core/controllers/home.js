'use strict';
app.controller('homeCtrl', function($scope, $rootScope, $location, $stateParams,$timeout, $q,$mdDialog,TypegamesService, GamesService,AreasService) {
    $rootScope.getUserinfo();
    var opcx = $stateParams.game;

    $scope.ls_typegames={};
    $scope.ls_games={};
    $scope.ls_areas={};
    $scope.ls_events={};
    $scope.areascount = 0;
    

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

        $scope.getListGames = function(typegame_id){
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
        
});
