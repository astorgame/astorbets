'use strict';
app.controller('WalletsCtrl', function($scope, $rootScope, $location, $stateParams, $timeout, $q , $auth, $mdDialog, WalletsService, TypecoinsService  ) {

    $scope.selected = [];
    $scope.showOptions = false;
    $scope.recordscount = 0;
    $scope.deserr = "";
    $scope.dessucces = "";
    $scope.showerror=false;
    $scope.ls_typecoins={};
    
    

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
      order: 'description',
      limit: 5,
      page: 1
    };

    $scope.getListTypecoins = function(){
        var query1 = {
            order: 'description',
            fill: 1,
            optsel: "id,description,acronym,logo"
        };
        TypecoinsService.list(query1).then(function(response){
             $scope.ls_typecoins =response.data.data;
        },function(response){
            
        });   
    };

    $scope.getList = function() {
        $scope.getListTypecoins();
        WalletsService.list($scope.query).then(function(data){
            $scope.list = data.data.data;
            $scope.recordscount = data.data.total;
        }).catch(function(err){
            $scope.list ={};
            $scope.showerror=true;
            $scope.deserr = err.data.message;
        });
    };

    $scope.getItem = function() {
        var id_ = $stateParams.id;
        $scope.operacion = $stateParams.operacion;
        if($scope.operacion == "new")
            $scope.new = true;
        else
            $scope.new = false;

            WalletsService.get(id_).then(function(response){
                $scope.record = response.data.data;
            }).catch(function(err){
                $scope.showerror=true;
            $scope.deserr = err.data.message;
            });
    };

    $scope.add = function(typeid){
        var datasend = {
            active: true,
            typecoin_id: typeid
        };
        $scope.newFailed=false;
        WalletsService.store(datasend).then(function(response){
            var d = response.data;
            if( d.sucess){
                $scope.getList ();

                $rootScope.showAlert (d.type,d.message);
            }else{
                $rootScope.showAlert (d.type,d.message);
            }
        }).catch(function(err){
            $scope.showerror=true;
            $scope.deserr = err.data.message;
            
        });
    };

    $scope.update = function() {
        WalletsService.update($scope.record).then(function(response){
            var d = response.data;
            if( d.sucess){
                $rootScope.showAlert (d.type,d.message);
            }else{
                $rootScope.showAlert (d.type,d.message);
            }
        }).catch(function(err){
            $scope.showerror=true;
            $scope.deserr = err.data.message;
        });
    };


})
