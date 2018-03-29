app.config(function($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.when('/dashboard', '/dashboard/home');
    //$urlRouterProvider.otherwise('home');
    $stateProvider
        .state('/events', {
            url: '/events/:game',
            templateUrl: 'views/events.html?v='+window.app_version,
            controller: 'homeCtrl'  
        })

       /* .state('login', {
            url: '/login',
            parent: 'base',
            templateUrl: 'views/pages/login.html?v='+window.app_version,
            controller: 'LoginCtrl'
        })*/
        ;
});
