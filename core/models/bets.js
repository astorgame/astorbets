appModels.factory('BetsService', function($http, CONFIG) {
   	var urlx = CONFIG.URL_WS;
	var entidad="bets";
	return {
        list: function(query_) {
             var config_ = {
                  params: query_
               };
             return $http.get(urlx + entidad, config_ );
        },
        store: function(query_) {
            return $http.post(urlx +  entidad, query_);
        },

    };

});