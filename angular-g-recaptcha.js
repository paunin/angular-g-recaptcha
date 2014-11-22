// USE:
//      <script type="text/javascript"  src="https://www.google.com/recaptcha/api.js?render=explicit&onload=initGRecaptcha"></script>
//      var app = angular.module('app', ['angularGRecaptcha'/*, ... */]);
//      <div g-recaptcha id="resend_email_captcha_img" ng-model="form.captcha" theme="clean" key="captchaKey"></div>
var grecaptchaModule = angular.module('angularGRecaptcha',[]);
// We should trig this function before angular app bootstraping BUT after recaptcha js loaded
var initGRecaptcha = function () {
    //console.log('GRecaptcha loaded');
    grecaptchaModule.directive('gRecaptcha', [function () {
        //console.log('GRecaptcha inited');
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                key: '='
            },
            link: function (scope, elem, attrs, ctrl) {
                if (!attrs.hasOwnProperty('key')) {
                    throw 'You need to set the "key" attribute to your public reCaptcha key. If you don\'t have a key, please get one from https://www.google.com/recaptcha/admin/create';
                }
                if (!attrs.hasOwnProperty('id')) {
                    throw 'You need to set the "id" attribute to use GRecaptcha directive';
                }
                //console.log(attrs);
                var captcha = grecaptcha.render(attrs.id, {
                    'sitekey' : scope.key,
                    'callback' : function(response){
                        scope.$apply(function(){
                            if (ctrl) {
                                ctrl.$setViewValue(response);
                            }
                        });
                        //console.log('user_response:'+response);
                    },
                    'theme' : attrs.theme || 'clean'
                });

            }
        };
    }]);
}
