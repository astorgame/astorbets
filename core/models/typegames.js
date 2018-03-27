appModels.factory('TypegamesService', function($http, CONFIG) {
   	var urlx = CONFIG.URL_WS;
	var entidad="ptypegames";
	return {
        list: function(query_) {
             var config_ = {
                  params: query_
               };
             return $http.get(urlx + entidad, config_ );
        }
    };

});