'use strict';

angular.module('shared/ui/drtv-menu.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('shared/ui/drtv-menu.html',
'<div class="cm-handler" ng-click="handleMenu()"><cm-notify-signal></cm-notify-signal><i class="fa cm-menu-right-close" ng-class="{\'cm-menu-right-open\':menuVisible}"></i></div><div class="cm-menu-layer" ng-show="menuVisible"><div cm-transparent-bg ng-click="handleMenu()"></div><div class="cm-menu-list"><ul class="list-group"><li class="cm-nose-wrapper" ng-click="handleMenu()"><i class="fa cm-nose-up"></i></li><li class="cm-list-group-item" ng-repeat="btn in btns" ng-class="btn.css" ng-click="goTo(btn.href)"><i class="fa" ng-if="btn.icon != undefined" ng-class="btn.icon"></i><span>{{btn.i18n|cmTranslate}}<cm-friend-request-counter ng-if="btn.drtv != undefined && btn.drtv == \'cm-friend-request-counter\'"></cm-friend-request-counter></span><div class="clearfix"></div></li><li class="cm-list-group-item" ng-click="logout()" data-qa="logout-btn"><i class="fa cm-logout"></i><a class="logout">{{\'MENU.LOGOUT\'|cmTranslate}}</a><div class="clearfix"></div></li><li class="cm-list-group-item"><i class="fa cm-rhino-positive"></i><span>{{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}<br /></span><div class="clearfix"></div></li></ul><div class="bottom-filler"></div></div></div>');
}]);
angular.module('shared/ui/drtv-modal-alert.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('shared/ui/drtv-modal-alert.html',
'<article class="cm-modal-alert"><header ng-show="closeBtn"><button ng-click="close()" class="close"><i class="fa cm-close"></i></button></header><ng-transclude class="content"></ng-transclude><footer><button class="cm-btn-block" ng-click="close()"> {{(footerLabel||\'MODAL.ALERT.OK\')|cmTranslate}}<i ng-if="footerIcon" class="fa {{footerIcon}} cm-lg-icon"></i></button></footer></article><div class="backdrop"></div>');
}]);
angular.module('shared/ui/drtv-modal-fullscreen.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('shared/ui/drtv-modal-fullscreen.html',
'<div class="content" ng-click="close()"><cm-spinner ng-if="fullscreenSpinner" cm-color="#02BED2"></cm-spinner><ng-transclude></ng-transclude></div><div class="backdrop"></div>');
}]);
angular.module('shared/ui/drtv-modal-plain.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('shared/ui/drtv-modal-plain.html',
'<article class="cm-modal-plain"><header><button ng-click="close()" class="close" ng-show="closeBtn"><i class="fa cm-close"></i></button><h2 class="{{severity}}">{{title}}</h2></header><ng-transclude class="content"></ng-transclude></article><div class="backdrop"></div>');
}]);
angular.module('cmUi', [
    'cmCore',
    'ngSanitize'
,'shared/ui/drtv-menu.html','shared/ui/drtv-modal-alert.html','shared/ui/drtv-modal-fullscreen.html','shared/ui/drtv-modal-plain.html'])
.directive('cmAdaptiveChange', [
    '$timeout',
    function ($timeout){
        return {
            restrict:       'A',
            require:        'ngModel',
            scope:          false,

            link:           function(scope, element, attrs, ngModelCtrl){
                //inputs with this directive will not update the scope on simple keydown-events
                var timeout;

                element
                    .unbind('input')
                    .unbind('keydown')
                    .on('keydown', function(){
                        // clear exists timeout
                        if(timeout)
                            $timeout.cancel(timeout)
                        // create new timeout
                        timeout = $timeout(function(){
                            scope.$apply(function() {
                                ngModelCtrl.$setViewValue(element.val())
                            })
                        },500)
                    })
            }
        }
    }
])
.directive('cmAvatar',[
    function (){

        var avatarMocks = {
            none: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAqACoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9hKKKuaFHZy6tCt+8kdqW+dkHP/6qAKdFep2GneF7i8+w28VlNNjO0AuTxn73/wBeuO+IvhOHwvqkf2dm8i4Usqk5KEdRn05oA52iiigAooooA9E+GXhuHR9IbWLkrvkRmUnpFGOp+px+X41yfjbxU3ivV/NClIIhsiU9cep9zXX2/wAPUbwov/EwvhI1vu4m/cjIzjb/AHe1ecUAFFFFABRRRQBpL4u1JNJ+wi7k+ykbdnGcemeuPbOKzaKKACiiigD/2Q=='
        };

        return {
            restrict: 'AE',
            template: '<img >',

            link: function(scope, element, attrs){

                function showBlobAsImage(file){
                    if(file['base64Url'] == undefined) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            file.base64Url = e.target.result;
                            //                      element.css({'background-image': 'url('+ e.target.result +')'});
                            element.find('img').attr('src', e.target.result);
                        };
                        reader.readAsDataURL(file.blob);
                    } else {
                        element.find('img').attr('src', file.base64Url);
                    }
                }

                function refresh(identity){
                    // hide the complete avatar
                    if(attrs.cmView == 'hide-owner' && identity.isAppOwner){
                        element.css('display','none');
                    } else {
                        // get avatar image from model
                        var file = identity.getAvatar();

                        if(typeof file.on == 'function' && file.state != 'cached'){
                            file.on('file:cached', function(){
                                showBlobAsImage(file);
                            });
                        } else if(file.state == 'cached') {
                            showBlobAsImage(file);
                        }

                        // show identity name
                        if(attrs.cmWithName){
                            if(!element.hasClass('with-name')){
                                element.addClass('with-name');
                                element.append('<div class="name" data-qa="avatar-display-name">'+identity.getDisplayName()+'</div>');
                                element.attr('title',identity.getDisplayName());
                            }
                        }
                    }
                }

                // is unknown avatar for add reciepients or choose avatar
                if(attrs.cmView == 'unknown'){
                    element.find('img').attr('src', avatarMocks.none );
                    //element.css({'background-image': 'url(' + avatarMocks.none +')'});
                } else {
                    scope.$watch(attrs.cmData, function(identity){
                        if(identity && identity['getAvatar'] != undefined){

                            refresh(identity);

                            identity.on('init:finish',function(event, identity){
                                // refresh Avatar
                                refresh(identity);
                            });
                        }
                    });
                }
            }
        }
    }
])

.directive('cmBack',[
    '$rootScope',
    '$window',
    '$location',
    function ($rootScope, $window, $location){
        return {
            restrict: 'AE',
            scope: true,
            template: '<div class="back-wrap">'+
                        '<i class="fa cm-left" ng-show="isVisible"></i>'+
                        '<span ng-if="pageTitle">{{pageTitle}}</span>'+
                      '</div>',
            controller: function($scope, $element, $attrs){
                // vars
                $scope.isVisible = $rootScope.urlHistory.length > 1 ? true : false;
                $scope.pageTitle = '';
                $scope.fakeBack = '';
                // check page-title attribute in directive
                if('pageTitle' in $attrs){
                    $scope.pageTitle = $scope.$eval($attrs.pageTitle);
                }
                // check default back-to attribute
                if('backTo' in $attrs){
                    $scope.backTo = $attrs.backTo;
                    $scope.isVisible = true;
                }
                // bind click event
                $element.on('click', function(){
                    // if history has more then one index
                    if($rootScope.urlHistory.length > 0 && ('plainBack' in $attrs) == false){
                        $window.history.back();
                        // if is set an default path in route
                    } else if($scope.backTo != ''){
                        $location.path($scope.backTo);
                        $scope.$apply();
                    }
                });
            }
        }
    }
])
.directive('cmDateSeperator',[
    function (){
        return{
            restrict: 'AE',
            transclude: true,
            template: '<div class="date-seperator" cm-rubber-space>'+
                        '<div class="line" cm-weight="1"></div>'+
                        '<div class="date" cm-weight="3" ng-transclude></div>'+
                        '<div class="line" cm-weight="1"></div>'+
                      '</div>'
        }
    }
])
.directive('cmEdge',[
    '$location',
    function (){
        return{
            restrict: 'AE',
            transclude: true,

            link: function(scope, element, attrs, controller, transclude){
                var background = angular.element('<i class="fa cm-edge background"></i>'),
                    foreground = angular.element('<div class="foreground"></div>');

                transclude(scope, function(clone){
                    foreground.append(angular.element(clone))
                });

                element
                .append(background)
                .append(foreground);
            }
        }
    }
])
.directive('cmFooter',[
    '$location',
    'cmTranslate',
    function ($location, cmTranslate){
        return {
            restrict: 'AE',
            priority: '0',

            link : function(scope, element){
                //if element has no children add default elements:
                if(element.children().length == 0 ) {
                    scope.btns.forEach(function(btn){
                        var el = angular.element('<a cm-weight="1">'+cmTranslate(btn.i18n)+'</a>');
                        el.toggleClass('active', btn.isActive ? true : false);
                        if(btn.href != '')
                            el.attr('href', '#'+btn.href);
                        else
                            el.addClass('deactivated');
                        element.append(el);
                    });
                }
            },
            controller: function($scope){
                $scope.btns = [
                    {i18n:'DRTV.FOOTER.TALKS',    href:'/talks'},
                    {i18n:'DRTV.FOOTER.CONTACTS', href:'/contacts'},
                    {i18n:'DRTV.FOOTER.MEDIA',    href:''}
                ];

                angular.forEach($scope.btns,function(btn){
                    btn.isActive = btn.href != '' && $location.$$path.search(btn.href) != -1;
                });
            }
        }
    }
])
.directive('cmHandleFixxed',[
    'cmEnv',
    function (cmEnv) {
        return {
            restrict: 'A',
            link: function (scope, element) {

                function stopEvent(e){
                    if(e.target != trigger) {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    }
                }

                // Fix mobile floating toolbar when input is focused
                if(true || cmEnv.isiOS){
//                    var headerAndFooter = angular.element(document.querySelectorAll('cm-header, div.answer, cm-footer'));
//
//                    element
//                    .on('focus', function(e) {
//                        headerAndFooter.css('position', 'absolute');
//                    })
//                    .on('blur', function(e) {
//                        headerAndFooter.css('position', '');
//                    });

                    var view = angular.element(document.querySelector('body'));
                    var trigger = document.querySelector('i.cm-post');

                    element
                    .find('textarea')
                    .on('focus',function(){
                        view.on('touchstart',stopEvent);
                    })
                    .on('blur',function(){
                        view.off('touchstart',stopEvent)
                    });
                }
            }
        }
    }
])
.directive('cmHeader',[
    function (){
        return {
            restrict: 'AE'
        }
    }
])
.directive('cmIcons',[
    function cmIcons(){
        return {
            restrict:   'AE',
            template:   '',
            scope:      {},

            link: function(scope, element, attrs){
                scope.count = attrs.count
                scope.icons = attrs.icons

                function draw(){
                    // clear all
                    element.children().remove();
                    // draw x
                    if(scope.count == 0 && scope.alt) {
                        element.append('<i class="fa '+scope.alt+'"></i>')
                    } else {
                        for (var i = 0; i < scope.count; i++) {
                            element.append('<i class="fa '+scope.icons+'"></i>')
                        }
                    }
                }

                attrs.$observe('count', function(count) {
                    scope.count = attrs.count
                    draw()
                })
            }

        }
    }
])
.directive('cmIdentity',[
    'cmUserModel',
    function (cmUserModel){
        return {
            restrict: 'AE',
            template: '<cm-avatar cm-data="identity" cm-header="true"></cm-avatar> {{identity.getDisplayName()}}',
            scope: true,
            controller: function($scope){
                $scope.identity = cmUserModel.data.identity;

                cmUserModel.on('init:finish',function(){
                    $scope.identity = cmUserModel.data.identity;
                });
            }
        }
    }
])
.directive('cmLargeInput',[
    function(){
        return {
            restrict: 'A',

            link: function(scope, element, attrs){
                var outer_wrapper = angular.element('<div></div>').addClass('cm-form-group'),
                    inner_wrapper = angular.element('<div></div>').addClass('cm-form-control white-control with-inputter with-outside-icon'),
                    icon          = angular.element('<i></i>').addClass('fa').addClass(attrs.cmIcon)

                element.wrap(outer_wrapper)
                element.after(icon)
                element.wrap(inner_wrapper)
                element.attr('data-qa','input-search')
            }
        }
    }
])
.directive('cmLogo',[
    function (){
        return {
            restrict: 'AE',
            template:
            //'<i class="fa cm-logo"></i>'+
                '<i class="fa cm-logo-c"></i>'+
                '<i class="fa cm-logo-a"></i>'+
                '<i class="fa cm-logo-m"></i>'+
                '<i class="fa cm-logo-e"></i>'+
                '<i class="fa cm-logo-o"></i>'+
                '<i class="fa cm-logo-net"></i>'
        }
    }
])
.directive('cmMenu',[
    '$window',
    '$document',
    '$location',
    'cmUserModel',
    'cmVersion',
    function ($window, $document, $location, cmUserModel, cmVersion){
        // left: 37, up: 38, right: 39, down: 40,
        // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
        var keys = [37, 38, 39, 40];

        function preventDefault(e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = false;
        }

        function keydown(e) {
            for (var i = keys.length; i--;) {
                if (e.keyCode === keys[i]) {
                    preventDefault(e);
                    return;
                }
            }
        }

        function wheel(e) {
            preventDefault(e);
        }

        function disableScroll() {
            if ($window.addEventListener) {
                $window.addEventListener('DOMMouseScroll', wheel, false);
            }
            $window.onmousewheel = $document.onmousewheel = wheel;
            $document.onkeydown = keydown;
        }

        function enableScroll() {
            if ($window.removeEventListener) {
                $window.removeEventListener('DOMMouseScroll', wheel, false);
            }
            $window.onmousewheel = $document.onmousewheel = $document.onkeydown = null;
        }

        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'shared/ui/drtv-menu.html',

            controller: function($scope, $element, $rootScope){
                $scope.cmVersion = cmVersion;
                $scope.btns = [
                    {i18n:'MENU.HEADER', icon:'cm-menu', css:'cm-menu-header'},
                    {i18n:'MENU.NOTIFICATIONS', icon:'cm-bell', css:'cm-menu-notify', href:'/notfications'},
                    {i18n:'MENU.REQUESTS', icon:'cm-contacts', css:'cm-menu-notify qa-btn-request-notify', href:'/contacts/requests', drtv:'cm-friend-request-counter'},
                    {i18n:'MENU.MESSAGES', icon:'cm-envelope-closed', css:'cm-menu-notify', href:'/talks'},
//                {i18n:'MENU.HINTS', icon:'cm-info', css:'cm-menu-notify', href:'#/notfications/hints'},
//                {i18n:'MENU.ACTIVITY', icon:'cm-person', href:'#/settings'},
                    {i18n:'MENU.SETTINGS', icon:'cm-settings', href:'/settings'}
                ];

                $scope.menuVisible = false;

                $rootScope.$on('logout', function(){
                    //enableScroll();
                });

                $scope.handleMenu = function(){
                    $scope.menuVisible = $scope.menuVisible ? false : true;
                    // kill scroll if visible
                    if($scope.menuVisible){
                        //disableScroll();
                    } else {
                        //enableScroll();
                    }
                };

                $scope.goTo = function(url){
                    if(typeof url !== 'undefined'){
                        $location.path(url);
                    }

                    return false;
                }

                $scope.logout = function(){
                    cmUserModel.doLogout();
                };
            }
        }
    }
])
.directive('cmModal', [
    'cmModal', 'cmTranslate', '$rootScope', '$timeout',
    function (cmModal, cmTranslate, $rootScope, $timeout){

        // handle nose position
        function addNose(element, attrs){
            if(!attrs.nose) return null

            var nose        =   angular.element('<i class="nose fa"></i>'),
                nose_side   =   attrs.nose.split('-'),
                nose_class  =   {
                    'top-left':     'cm-nose-up flip',
                    'top-right':    'cm-nose-up',
                    'left-top':     'cm-nose-left flip',
                    'left-bottom':  'cm-nose-left',
                    'right-top':    'cm-nose-right',
                    'right-bottom': 'cm-nose-right flip',
                    'bottom-left':  'cm-nose-down flip',
                    'bottom-right': 'cm-nose-down'
                }

            nose
                .addClass(nose_class[attrs.nose])
                .addClass(nose_side[0])
                .css(nose_side[1], attrs.nosePosition || '2rem')

            element
                .addClass('nose-'+nose_side[0])

            element.find('article').append(nose)
        }

        return {
            restrict: 'AE',
            transclude: true,
            scope: true,
            
            templateUrl: function(tElement, tAttrs){
                var type = tAttrs.type || 'plain',
                    templateUrl = {
                        plain: 'shared/ui/drtv-modal-plain.html',
                        fullscreen: 'shared/ui/drtv-modal-fullscreen.html',
                        alert: 'shared/ui/drtv-modal-alert.html'
                    };

                return templateUrl[type];
            },

            link: function(scope, element, attrs, controller, transclude){

                scope.closeBtn = attrs.cmCloseBtn || true;
                scope.footerLabel = attrs.cmFooterLabel || undefined;
                scope.footerIcon = attrs.cmFooterIcon || undefined;

                // refresh modal content
                scope.refresh = function(){                   
                    transclude(scope, function (clone) {
                        var transclude_container = element.find('ng-transclude');

                        transclude_container
                        .children()
                        .remove();

                        transclude_container
                        .append(clone);                 
                    })
                };

                // add external data to scope
                scope.setData = function(data){
                    if(data != undefined) {
                        scope[attrs.cmDataAs || 'data'] = data;
                    }
                    return this;
                };

                // toggle visiblity modal
                scope.toggle = function(on){
                    on = (on == undefined ? $element.hasClass('active') : on);
                    if(on){
                        scope.refresh();
                        element.addClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = true;
                        })                        
                    } else {
                        element.removeClass('active');
                        $timeout(function(){
                            $rootScope.isModalVisible = false;
                        })
                    }

                    return this
                };

                // open modal
                scope.open = function(){
                    this.toggle(true);

                    return this
                };
                // close modal
                scope.close = function(){
                    this.toggle(false);

                    return this
                };

                // close modal when clicked on backdrop
                if(!attrs.cmCloseOnBackdrop) {
                    angular.element(element.children()[1]).on('click', function () {
                        scope.close()
                    });
                }

                element
                .addClass(attrs.severity)
                .css('transition-duration', '300ms');

                addNose(element, attrs);
                // register modal to service
                cmModal.register(attrs.id, scope);
                // refresh content
                scope.refresh();
            },

            controller: function($scope, $element, $attrs){   
                $scope.title    = cmTranslate($attrs.cmTitle);
                $scope.severity = $attrs.severity || 'info';
            }
        }
    }
])
.directive('cmMultiInput',[
    function (){
        return {
            restrict: 'AE',
            scope: true,
            transclude: true,
            priority: 101,

            template: '<div ng-repeat="item in collection" class="cm-multi-input-wrap">' +
                '<div ng-transclude ng-keyup="showMultiplier()"></div>'+
                '<div class="cm-multiplier" ng-click="multiply()" ng-show="isMultiplyable">'+
                '<i class="fa cm-checkbox-bg"></i>'+
                '<i class="fa cm-checkbox-add"></i>'+
                '</div>'+
                '</div>',

            controller: function ($scope, $element, $attrs) {
                $scope.collection = [];
                $scope.isMultiplyable = false;

                $scope.$watchCollection($attrs.cmCollection,function(collection) {
                    if(collection != undefined) {
                        $scope.collection = collection;
                        $scope.showMultiplier();
                    }
                });

                $scope.showMultiplier = function(){
                    var isDisabled = $scope.$eval($attrs.cmDisabled) || false;
                    var last = $scope.collection.length-1;

                    if(isDisabled == false && last > -1 && $scope.collection[last].value != ''){
                        $scope.isMultiplyable = true;
                    } else {
                        $scope.isMultiplyable = false;
                    }
                };

                $scope.multiply = function(){
                    var last = $scope.collection.length-1;
                    // check last item if filled
                    if($scope.collection[last].value != ''){
                        $scope.collection.push({value:''});
                    }
                };
            }
        }
    }
])
.directive('cmOverlay',[
    '$rootScope',
    function ($rootScope){
        return {
            restrict : 'AE',
            scope: true,
            transclude : true,

            link : function(scope, element, attrs, controller, transclude){
                var container = angular.element('<div class="container" ng-transclude></div>'),
                    bg = angular.element('<div cm-transparent-bg ng-click="hideOverlay()"></div>');

                element.append(bg);
                element.append(container);

                function show(){
                    angular.element(document.getElementById('cm-app')).append(element);

                    transclude(scope, function(clone){
                        container.append(clone);
                    });
                    element.addClass('visible');
                }

                function hide(){
                    element.removeClass('visible');
                    container.children().remove();
                }

                //container.on('click', hide)

                $rootScope.$on('cmOverlay:show', function(event, id){ if(attrs.id == id) show() });
                $rootScope.$on('cmOverlay:hide', function(event, id){ if(attrs.id == id) hide() });
            },

            controller: function($scope, $element, $attrs){
                $scope.hideOverlay = function(){
                    $scope.$emit('cmOverlay:hide', $attrs.id);
                }
            }
        }
    }
])
.directive('cmProgressbar',[
    function (){
        return {
            restrict: 'E',
            template: '<div class="percent">{{percent}}<span>%</span></div>' +
                      '<div class="progressbar" style="width:{{percent}}%"></div>',
            controller: function($scope, $element, $attrs) {
                $scope.percent = 0;

                if($attrs.cmPercent){
                    $scope.$watch($attrs.cmPercent, function (newPercent) {
                        // default multiply hundret times
                        if($attrs.cmHundretTimes == undefined){
                            newPercent = newPercent * 100;
                        }

                        // for whatever reason percent over 100%
                        if(newPercent > 100) {
                            newPercent = 100;
                        }

                        $scope.percent = Math.round(newPercent);
                    })
                }
            }
        }
    }
])
.directive('cmReload',[
    '$route',
    function ($route){
        return {
            restrict: 'AE',
            scope: true,
            template: '<i class="fa cm-change"></i>',
            controller: function($scope, $element){
                $element.on('click',function(){
                    //$route.reload();
                    location.reload();
                });
            }
        }
    }
])
.directive('cmResizeTextarea',[
    '$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                // vars
                var paddingLeft = element.css('paddingLeft'),
                    paddingRight = element.css('paddingRight'),
                    maxRows = attrs.cmMaxRows || 2,
                    shadowRowHeight = 0,
                    textAreaRowHeight = 0,
                    diffRowHeight = 0,
                    unit = 'px',
                    $shadow;

                /**
                 * create shadow of textarea for calcing the rows
                 */
                function createShadow(){
                    var width = element[0].offsetWidth;
                        if(width == 0)
                            width = parseInt(element.css('width'));

                    $shadow = angular.element('<div></div>').css({
                        position: 'fixed',
                        top: -10000+unit,
                        left: -10000+unit,
                        width: width - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0)+unit,
                        'font-size': element.css('fontSize'),
                        'font-family': element.css('fontFamily'),
                        'line-height': element.css('lineHeight'),
                        'word-wrap': 'break-word'
                    });
                    element.after($shadow);
                }

                /**
                 * update for textarea input
                 */
                function update(){
                    // replace function for white spaces
                    var times = function(string, number){
                        for (var i = 0, r = ''; i < number; i++) r += string;
                        return r;
                    };

                    // set textarea value to shadow
                    var val = element.val().replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/&/g, '&amp;')
                        .replace(/\n$/, '<br/>&nbsp;')
                        .replace(/\n/g, '<br/>')
                        .replace(/\s{2,}/g, function(space) { return times('&nbsp;', space.length - 1) + ' ' });
                    $shadow.html(val);

                    // on init get one row height
                    var shadowHeight = $shadow[0].offsetHeight;

                    // on init get one row height
                    if(shadowHeight > 0 && shadowRowHeight == 0){
                        shadowRowHeight = shadowHeight
                        diffRowHeight = textAreaRowHeight-shadowHeight
                    }
                    // handle textarea height
                    if(shadowRowHeight > 0) {
                        // one line
                        if (shadowHeight < shadowRowHeight) {
                            element.css('height', (shadowRowHeight + diffRowHeight) + unit);
                            element.attr('rows', 1);
                            element.css('overflow', 'hidden');
                        // under max rows
                        } else if (maxRows * shadowRowHeight >= shadowHeight) {
                            element.css('height', (shadowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'hidden');
                            element.attr('rows', Math.round(shadowHeight/shadowRowHeight));
                        // max rows
                        } else {
                            element.css('height', (maxRows * shadowRowHeight + diffRowHeight) + unit);
                            element.css('overflow', 'auto');
                            element.attr('rows', maxRows);
                        }
                    }
                }

                /**
                 * at cursor position inserter
                 * @param el
                 * @param text
                 */
                function insertTextAtCursor(el, text) {
                    var val = el.value, endIndex, range;
                    if (typeof el.selectionStart != 'undefined' && typeof el.selectionEnd != 'undefined') {
                        endIndex = el.selectionEnd;
                        el.value = val.slice(0, el.selectionStart) + text + val.slice(endIndex);
                        el.selectionStart = el.selectionEnd = endIndex + text.length;
                    } else if (typeof document.selection != 'undefined' && typeof document.selection.createRange != 'undefined') {
                        el.focus();
                        range = document.selection.createRange();
                        range.collapse(false);
                        range.text = text;
                        range.select();
                    }
                }

                // style textarea
                element
                    .css({
                        'overflow': 'hidden',
                        'resize': 'none'
                    })
                    .attr('rows',1);

                // find one row height for rows setting
                textAreaRowHeight = parseInt(element.css('height')||0);
                if(textAreaRowHeight == 0)
                    textAreaRowHeight = element[0].offsetHeight;

                // event binding
                element.on('keyup redo undo keypress change', update);
                element.on('keydown', function(event){
                    if (event.which == 9) {
                        insertTextAtCursor(this, '\t');
                        return(false)
                    }
                    return true;
                });

                // watch on ngModel for extern changes
                var timeoutWatch = null;
                scope.$watch(attrs.ngModel,function(newValue){
                    if(newValue == ''){
                        if(timeoutWatch != null)
                            $timeout.remove(timeoutWatch);
                        timeoutWatch = $timeout(function(){
                            update();
                            timeoutWatch = null;
                        },50);
                    }
                });

                // init
                createShadow();
                update();
            }
        }
    }
])
.directive('cmRubberSpace',[
    function (){
        return {
            restrict : 'AE',
            priority: 1,

            link : function(scope, element, attrs, controller){
                var total_weight    = 0,
                    available_space = 100,
                    width           = element[0].offsetWidth

                //remove text nodes:
                angular.forEach(element[0].childNodes, function(el){
                    if(el.nodeType != 1) element[0].removeChild(el)
                })

                //calculate total weight:
                angular.forEach(element.children(), function(child){
                    var weight = parseInt( angular.element(child).attr('cm-weight')) || false

                    if(weight){
                        child.weight     = weight
                        total_weight    += child.weight
                    }else{
                        available_space -= 100 * child.offsetWidth/width
                    }

                })

                //stretch children according to their weight:
                function tighten(){
                    angular.forEach(element.children(), function(child){
                        child = angular.element(child)

                        if(child[0].weight){
                            child.css('width', (available_space*child[0].weight/total_weight)+'%')
                        }

                    })
                }

                tighten()

            }
        }
    }
])
.directive('cmScrollTo',[
    '$timeout',
    '$rootScope',
    function ($timeout, $rootScope){
        return {
            restrict: 'A',
            link: function($scope, $element, $attrs){

                function initTimeout(target){
                    var anchor = angular.element(document.querySelector(target)),
                        body = angular.element(document.querySelector('body')),
                        html = angular.element(document.querySelector('html'));

                    $timeout(function(){
                        var bottom = anchor[0].offsetTop + 5000;
                        body[0].scrollTop = bottom;
                        html[0].scrollTop = bottom;
                    },500);
                }

                if($attrs.ngRepeat && $scope.$last && $attrs.cmScrollTo != ''){
                    initTimeout($attrs.cmScrollTo);
                    // this because of cm-blob-image
                    $rootScope.$on('scroll:to',function(event,target){
                        initTimeout(target);
                    })
                } else if(!$attrs.ngRepeat){
                    initTimeout($attrs.cmScrollTo);
                }
            }
        }
    }
])
.directive('cmSpinner',[
    function (){
        return {
            restrict: 'AE',
            template: '<div class="spinner-wrapper" ng-show="loading"><div class="spinner"></div></div>',
            controller: function($scope, $element, $attrs){
                $scope.loading = false;

                var opts = {};
                if($attrs.cmLength)
                    opts.length = $attrs.cmLength;
                if($attrs.cmRadius)
                    opts.radius = $attrs.cmRadius;
                if($attrs.cmColor)
                    opts.color = $attrs.cmColor;
                if($attrs.cmWidth)
                    opts.width = $attrs.cmWidth;

                var spinner = new Spinner(opts);
                var loadingContainer = angular.element($element[0].querySelector('.spinner'))[0];


                $scope.$watch($attrs.ngShow, function(bool){
                    if(bool != false){
                        spinner = spinner.spin();
                        loadingContainer.appendChild(spinner.el);
                        $scope.loading = true
                    } else {
                        spinner.stop();
                        loadingContainer.innerHTML = '';
                        $scope.loading = false
                    }
                });

                $scope.$on('cmSpinner:start', function(){
                    spinner = spinner.spin();
                    loadingContainer.appendChild(spinner.el);
                    $scope.loading = true
                });
                $scope.$on('cmSpinner:stop', function(){
                    spinner.stop();
                    loadingContainer.innerHTML = '';
                    $scope.loading = false
                });
            }
        }
    }
])
.directive('cmStayInViewport',[
    '$window',
    '$timeout',
    function ($window, $timeout){
        return {
            restrict: 'A',
            link: function(scope, element, attrs){
                // hide image for hidden scale operation
                element.css('visibility','hidden');

                if(attrs.cmSrc) {
                    // set src with delay for showing loader
                    $timeout(function () {
                        element.attr('src', scope[attrs.cmSrc]);
                    }, 1000);
                    // after setted src and image loaded check viewport
                    element.on('load', function () {
                        var viewport = {
                            w: $window.innerWidth,
                            h: $window.innerHeight
                        };
                        var image = {
                            w: element[0].width,
                            h: element[0].height,
                            isPortrait: element[0].height > element[0].width
                        };
                        // calc height if greater than viewport
                        if (image.isPortrait) {
                            element.parent().addClass('is-portrait');
                            if (image.h > viewport.h) {
                                element.css('height', (viewport.h - 150) + 'px');
                                element.css('max-width', 'none');
                            } else {
                                element.css('height', image.h + 'px');
                                element.css('max-width', 'none');
                            }
                        } else {
                            element.parent().addClass('is-landscape');
                            element.css('width', '90%');
                            element.css('max-width', 'none');
                        }
                        // show image and hide loader on scope
                        if (attrs.cmLoadedSpinner) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedSpinner] = false;
                            });
                        }
                        if (attrs.cmLoadedVisibility) {
                            scope.$apply(function () {
                                scope[attrs.cmLoadedVisibility] = {visibility: 'visible'};
                            });
                        }
                        // show image
                        element.css('visibility', 'visible');
                    });
                }
            }
        }
    }
])
.directive('cmView', [
    '$route',
    'cmUserModel',
    function ($route, cmUserModel){
        return {
            restrict: 'A',
            controller: function($scope){
                if(cmUserModel.isGuest() !== false && $route.current.$$route.guests !== true){
                    cmUserModel.doLogout();
                    return false;
                }
                $scope.css = $route.current.$$route.css;
            }
        }
    }
])
.filter('cmAutolink', [
    function(){
        return function(text, attrStrLen){
            var pattern = /(^|[\s\n]|<br\/?>)(((?:https?|ftp)(:\/\/)|(www|\/\/))[\-A-Z0-9+\u0026\u2019@#\/%?=()~_|!:,.;]*[\-A-Z0-9+\u0026@#\/%=~()_|])/gi;
            var strLen = attrStrLen||50

            return text.replace(pattern, function(link){
                var tag = '<a href="%href" target="_blank" title="%href">%link</a>';
                if(link != undefined){
                    if(link.length > strLen){
                        return tag.replace(/%href/,link).replace(/%link/,String(link).substring(0, strLen));
                    } else {
                        return tag.replace(/%href/,link).replace(/%link/,link);
                    }
                }
            });
        }
    }
])
.filter('cmDigits', [
    function(){
        return function(number, digits){
            var x   = parseFloat(number)
            var str =  (Math.round(x * Math.pow(10, digits)) / Math.pow(10, digits)).toString()

            str = str.match(/\./) ? str : str+'.'
            while(str.indexOf('.') >= str.length-2) str +='0'

            return str.match(/^[0-9\.]*$/) ? str : '0'
        }
    }
])
/*

 # Usage in html template:

 "xxx | nl2br"

 <div ng-bind-html=" YourString | nl2br "></div>

 or:

 "xxx | nl2br:Boolean"

 Boolean( true or flase or just keep null) means is xhtml  or not

 if is xhtml, replace with <br/> ; if not , replace with <br>

 <div ng-bind-html=" YourString | nl2br:true "></div>


 -------------------------

 # Example:

 //==Analog data===
 $scope.items = [
 {"message": "test"},
 {"message": "New\nLine"},
 ]
 //=====
 <div class="comment" ng-repeat="item in items">
 <p ng-bind-html=" item.message | nl2br "></p>
 </div>

 -------------------------

 # Output result:

 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 test
 </p>
 </div>
 <div class="comment ng-scope" ng-repeat="item in items">
 <p class="ng-binding" ng-bind-html=" item.message | nl2br ">
 New<br>Line
 </p>
 </div>

 */


.filter('nl2br', [
    '$sce',
    function($sce){
        return function(msg,is_xhtml) {
            var is_xhtml = is_xhtml || true;
            var breakTag = (is_xhtml) ? '<br />' : '<br>';
            var msg = (msg + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
            return $sce.trustAsHtml(msg);
        }
    }
])
.filter('truncate', [
    function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 10;

            if (end === undefined)
                end = "...";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length-end.length) + end;
            }

        };
    }
])
.service('cmModal',[

    '$rootScope',
    'cmObject',
    'cmLogger',
    '$compile',
    '$document',

    function($rootScope, cmObject, cmLogger, $compile, $document){

        var self = {}

        cmObject.addEventHandlingTo(self)

        self.instances = {}

        self.register = function(id, scope){

            if(!scope){
                cmLogger.error('cmModal: unable to register modal without id or scope.')
                return null
            }

            var old_scope = self.instances[id]

            if(old_scope != scope){
                self.instances[id] = scope
                self.trigger('register', id)
            }

            return self
            
        }

        self.open = function(id, data){
            if(self.instances[id]){
                self.instances[id]
                    .setData(data)
                    .open()
            } else {
                self.one('register', function(event, registered_id){
                    return !!(registered_id == id ? self.open(id, data) : false)                              
                })
            }
            return self
        }

        self.close = function(id){
            self.instances[id].close()
            return self
        }

        self.closeAll = function(){
            angular.forEach(self.instances, function(modal_instance, key){
                modal_instance.close()
            })
            return self
        }

        self.create = function(config, template, target, scope){
            // clear existing instance
            if(self.instances[config.id] != undefined){
                delete self.instances[config.id];
            }

            // clear DOM element, if neccessary
            if(angular.element(document.getElementById(config.id)).length > 0){
                angular.element(document.getElementById(config.id)).remove();
            }

            // create new element
            var attrs = '',
                scope = scope || $rootScope.$new()

            //Todo: könnte man schöner machen:
            angular.forEach(config, function(value, key){ attrs += key+'="'+value+'"' });

            var modal = $compile('<cm-modal '+attrs+' >'+(template||'')+'</cm-modal>')(scope)
            // move modal up the dom hierarchy, if necessary:
            angular.element(target || document.getElementById('cm-app') || 'body').append(modal)

            // the modal directive (<cm-modal>) will register itself on next digest

            return modal
        }

        $rootScope.openModal    = self.open
        $rootScope.closeModal   = self.close
        $rootScope.isModalVisible = false
//        $rootScope.$watch('isModalVisible' ,function(newValue){
//            console.log('watch modal '+newValue)
//            $rootScope.isModalVisible = newValue;
//        });

        //close all modals on route change:
        $rootScope.$on('$routeChangeStart', function(){
            self.closeAll();
        })

        $document.bind('keydown', function (evt) {
            if (evt.which === 27) {
                self.closeAll();
            }
        });

        return self
    }
])