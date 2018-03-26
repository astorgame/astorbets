appModels.factory('GamesService', function($http, CONFIG) {
   	var urlx = CONFIG.URL_WS;
	var entidad="pgames";
	return {
        list: function(query_) {
             var config_ = {
                  params: query_
               };
             return $http.get(urlx + entidad, config_ );
        },
        get: function(query_) {
            return $http.get(urlx + entidad +'/' + query_ );
        }
    };

});