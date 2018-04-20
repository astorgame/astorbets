app.config(['$authProvider','CONFIG',function($authProvider,CONFIG) {
        $authProvider.httpInterceptor = function() { return true; };
        $authProvider.tokenPrefix = 'appAstorbetsToken';
        $authProvider.baseUrl = CONFIG.URL_WS;
        $authProvider.loginUrl = 'auth/login';
        $authProvider.unlinkUrl = 'auth/invalidate';
        $authProvider.tokenName = 'token';
        $authProvider.storageType = 'localStorage';
   }    
]);

app.config(['$httpProvider','CONFIG',function($httpProvider,CONFIG){
    $httpProvider.interceptors.push(['$rootScope', '$q',
        function($rootScope, $q) {
            return {
                request: function(config) {
                    config.headers['id-app'] = CONFIG.APP_ID; 
                    config.headers['type-app'] = "web-bets"; 
                    config.headers['time-app'] = new Date().toLocaleString();
                    config.headers['timezone-app'] = (new Date().getTimezoneOffset()) ;
                    return config;
                },
                requestError: function(config) {
                    return config;
                },
                response: function(response) {
                    return response;
                },
                responseError: function(response) {
                    return response;
                }
            };
        }]);
}]);




app.config(function($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
     $translateProvider.preferredLanguage('es');
});