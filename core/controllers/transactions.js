'use strict';
app.controller('TransactionsCtrl', function($scope, $rootScope, $location, $stateParams, $timeout, $q , $auth, $mdDialog, TransactionsService ) {
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
        limitOptions : [5, 10,15, 20, 25, 50,100 ]
    };
  
    $scope.query = {
      order: 'description',
      limit: 15,
      page: 1
    };


    $scope.getList = function() {
        $scope.pb_loadtable=true;
        TransactionsService.list($scope.query).then(function(data){
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
