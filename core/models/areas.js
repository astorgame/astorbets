appModels.factory('AreasService', function($http, CONFIG) {
   	var urlx = CONFIG.URL_WS;
	var entidad="pareas";
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