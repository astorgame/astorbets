'use strict';
app.directive('imgPreload', ['$rootScope', function($rootScope) {
    return {
      restrict: 'A',
      scope: {
        ngSrc: '@'
      },
      link: function(scope, element, attrs) {
          var idele='crp'+attrs.id;
          var htmEl ='<img id="'+idele+'" src="images/loading.gif" class="spinner-img" >';
          var ngEl = angular.element(htmEl);
            element.on('load', function() {
               // console.debug("imagen "+ attrs.id +" cargada!");
                element.removeClass('hidden');
                var nEl = document.getElementById(idele);
                angular.element(nEl).remove();
            }).on('error', function() {
                 $rootScope.bannerLoading = false;
                // console.debug("error");
            });
            scope.$watch('ngSrc', function(newVal) {
               // console.debug("cargando... "+ attrs.id );
                element.addClass('hidden');
                element.parent().append(ngEl);
            });
      }
    };
}]);
