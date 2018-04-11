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

app.config(function($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitize');
    $translateProvider.useStaticFilesLoader({
        prefix: 'languages/',
        suffix: '.json'
    });
     $translateProvider.preferredLanguage('es');
});