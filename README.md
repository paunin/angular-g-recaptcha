G reCaptcha AngularJS Directive
=========================================

Use this directive to be able to submit with XHR a form that contains a NEW Google reCaptcha.


Demo
====

See [the demo file](index.html) for an usage example.

Keep in mind that the captcha only works when used from a real domain and with a valid re-captcha key, so this file wont work if you just load it in your browser.


Usage
=====

First, you need to get a valid public key for your domain. See http://www.google.com/recaptcha.

Then, include the reCaptcha [AJAX API](https://developers.google.com/recaptcha/docs/display#AJAX) using this script in your HTML:

```html
<script type="text/javascript"  src="https://www.google.com/recaptcha/api.js?render=explicit&onload=initApp"></script>
```

Also include the g-recaptcha script and make your angular app depend on the `vcRecaptcha` module.

```html
    <script src="angular-g-recaptcha.js"></script>
```

```javascript
var app = angular.module('myApp', ['angularGRecaptcha']);
```


After that, you can place a container for the captcha widget in your view, and call the `vc-recaptcha` directive on it like this:

```html
<div g-recaptcha id="captcha_img" ng-model="model.response" theme="clean" key="model.key"></div>
```

Here the `key` attribute is passed to the directive's scope, so you can use either a property in your scope or just a hardcoded string. Be careful to use your public key, not your private one.


NOTA BENE:
====
* Any `g-recaptcha` directive should have `id` attribute
* You have to bootstrap your angular application after recaptcha js loaded. So in example we have `onload` callback for `recaptcha/api.js` with simple code:
```
var initApp = function(){
    initGRecaptcha();
    angular.element(document).ready(function () {
        angular.bootstrap(document, ["testApp"]);
    });
}
```


Other Parameters
================

You can optionally pass other parameters to the captcha, as html attributes:

```html
    <div
        g-recaptcha
        ng-model="model.captcha"
        theme="clean"
        key="'---- YOUR PUBLIC KEY GOES HERE ----'"
    ></div>
```

In this case we are specifying that the captcha should use the theme named 'clean'.
