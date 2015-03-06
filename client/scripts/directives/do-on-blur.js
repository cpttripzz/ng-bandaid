/**
 * @ngdirective
 * Sets the current navbar option in focus.
 */
app.directive("doOnBlur", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            run: "="
        },
        controller: function ($scope, $element, $attrs,  $injector) {
            var config = angular.fromJson($attrs.doOnBlur);
            var service = $injector.get(config.service);
            $scope.service = service;
        },
        link: function (scope, element, attrs, ngModel) {

            element.bind('blur', function (e) {
                if(!scope.run){
                    return;
                }
                var config = angular.fromJson(attrs.doOnBlur);
                var validateClass = config.validateClass;
                var reverseResult = (config.reverseResult === 'true');
                var currentValue = element.val();
                if(ngModel.$valid) {
                    scope.service[config.functionName](config.field, currentValue)
                        .then(function (result) {
                            if (currentValue === element.val()) {
                                var result = (reverseResult) ? !result.result : result.result;
                                console.log('result = ' + result);
                                ngModel.$setValidity(validateClass, result);
                            }
                        });
                }
            });
            element.bind('keydown', function (e) {
                var config = angular.fromJson(attrs.doOnBlur);
                var validateClass = config.validateClass;
                ngModel.$setValidity(validateClass, true);
            });
        }
    }
});
