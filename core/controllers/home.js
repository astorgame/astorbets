'use strict';
app.controller('homeCtrl', function($scope, $rootScope, $location,  $timeout, $q , GamesService,AreasService, $filter) {

    //var opcx = $stateParams.operacion;
    $scope.ls_games={};
    $scope.ls_areas={};
    $scope.ls_events={};
    $scope.areascount = 0;

        $scope.getListGames = function() {
            var querygames = {
                order: 'order_view',
                fill: 1,
                optsel: "id,description,logo,icono"
            };
            GamesService.list(querygames).then(function(response){
                $scope.ls_games =response.data.data;
            },function(response){
                
            });   
        };
        
        $scope.getGame  = function(item_sel) {
            $scope.record_selected = item_sel;
            var queryareas = {
                filterby: 'game_id',
                filterid: item_sel.id,
                order: 'order_view',
                fill: 1,
                optsel: "id,description,icono"
            };
            GamesService.list(queryareas).then(function(response){
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
