'use strict';
app.controller('BetsCtrl', function($scope, $rootScope, $location, $stateParams, $timeout, $q , $auth, $mdDialog, BetsService ) {
    $scope.pb_loadtable=false;
    $scope.selected = [];
    $scope.showOptions = false;
    $scope.recordscount = 0;
    $scope.deserr = "";
    $scope.showerror=false;
    
        $scope.options = {
            rowSelection: true,
            multiSelect: true,
            autoSelect: true,
            decapitate: false,
            largeEditDialog: false,
            boundaryLinks: true,
            limitSelect: true,
            pageSelect: true,
            limitOptions : [5, 10, 20, 50,100 ]
        };
  
        $scope.query = {
            order: 'created_at',
            limit: 5,
            page: 1
        };


    $scope.getList = function() {
        $scope.pb_loadtable=true;
        BetsService.list($scope.query).then(function(data){
            $scope.list = data.data.data;
            $scope.recordscount = data.data.total;
            $scope.pb_loadtable=false;
        }).catch(function(err){
            $scope.pb_loadtable=false;
            $scope.list ={};
            $scope.showerror=true;
            $scope.deserr = err.data.message;
        });
    };
    
    
})
