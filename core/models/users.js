appModels.factory('UsersService', function($http, CONFIG) {
    var urlx = CONFIG.URL_WS;
    var entidad="users";   
	return {
        /*list: function(query_) {
             var config_ = {
                  params: query_
               };
             return $http.get(urlx + entidad , config_ );
        },*/
        getUser: function(query_) {
            return $http.get(urlx + entidad+ '/' + query_ );
        },
        store: function(query_) {
            return $http.post(urlx + 'signup', query_);
        },
        update: function(query_) {
            return $http.patch(urlx + entidad, query_);
        }
    };

});