appModels.factory('LimitService', function($http, CONFIG) {
    var urlx = CONFIG.URL_WS;
    var entidad="limits";   
	return {
        list: function(query_) {
            var config_ = {
                 params: query_
              };
            return $http.get(urlx + entidad, config_ );
        },
        get: function(query_) {
            return $http.get(urlx + entidad+ '/' + query_ );
        },
        store: function(query_) {
            return $http.post(urlx + entidad, query_);
        }
    };

});