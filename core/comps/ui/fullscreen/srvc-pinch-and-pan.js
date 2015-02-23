'use strict';

angular.module('cmUi')
    .factory('cmPinchAndPan',[
        'cmFullscreen', 'cmUtil', 'cmModal',
        '$window', '$timeout', '$document',
        function(cmFullscreen, cmUtil, cmModal,
                 $window, $timeout, $document) {

            var utils = {
                calcBounds: function(){
                    var minX = Math.ceil((mask.dim.w / 2) - ((image.dim.w * image.scale) / 2)),
                        minY = Math.ceil((mask.dim.h / 2) - ((image.dim.h * image.scale) / 2)),
                        maxX = -(minX),
                        maxY = -(minY);

                    return {
                        x: {
                            min: minX,
                            max: maxX
                        },
                        y: {
                            min: minY,
                            max: maxY
                        }
                    }
                },
                stayInBounds: function(possibleX, possibleY, _bounds_){
                    var bounds = _bounds_ || this.calcBounds(),
                        setX = 0, setY = 0;

                    if(possibleX < bounds.x.min && possibleX > bounds.x.max)
                        setX = possibleX;
                    else if(possibleX < bounds.x.min)
                        setX = bounds.x.max;
                    else if(possibleX > bounds.x.max)
                        setX = bounds.x.min;

                    if(possibleY < bounds.y.min && possibleY > bounds.y.max)
                        setY = possibleY;
                    else if(possibleY < bounds.y.min)
                        setY = bounds.y.max;
                    else if(possibleY > bounds.y.max)
                        setY = bounds.y.min;

                    return {
                        x: setX,
                        y: setY
                    }
                }
            };

            var mask = {
                dim: {},
                init: function(){
                    this.resize();

                    angular.element($window).on('resize',this.resize);
                    angular.element($window).on('orientationchange',this.resize);
                },
                resize: function(){
                    // dimensions
                    mask.dim.w = $window.innerWidth;
                    mask.dim.h = $window.innerHeight;
                    mask.dim.r = mask.dim.w / mask.dim.h;
                },
                getCenter: function(){
                    return {
                        x: (this.dim.w / 2),
                        y: (this.dim.h / 2)
                    }
                }
            },
            image = {
                element: null,
                tmp: {},
                transform: {},
                dim: {},
                init: function(element, isFullscreenInit){
                    // dom element
                    if(isFullscreenInit)
                        this.element = angular.element(element).find('img');
                    else
                        this.element = angular.element(element);

                    // dimensions
                    this.dim.w = this.element[0].width;
                    this.dim.h = this.element[0].height;
                    this.dim.r = this.element[0].width / this.element[0].height;

                    // startScale
                    this.scale = this.tmp.startScale = self.settings.startScale || 1;

                    // check settings
                    // fits the height
                    if('fitHeight' in self.settings && self.settings.fitHeight){
                        this.scale = this.tmp.startScale = mask.dim.h / this.dim.h;
                    }
                    // fits the height
                    if('fitWidth' in self.settings && self.settings.fitWidth){
                        this.scale = this.tmp.startScale = mask.dim.w / this.dim.w;
                    }

                    this.tmp.startX = this.tmp.lastX = 0;
                    this.tmp.startY = this.tmp.lastY = 0;

                    // first draw
                    this.reset();
                },
                getDifference: function(){
                    var newWidth = this.dim.w * this.scale,
                        newHeight = this.dim.h * this.scale;
                    return {
                        w: newWidth - this.dim.w,
                        h: newHeight - this.dim.h
                    }
                },
                getCenter: function(){
                    return {
                        x: (this.dim.w / 2),
                        y: (this.dim.h / 2)
                    }
                },
                reset: function(){
                    this.transform = {
                        translate: { x: this.tmp.startX, y: this.tmp.startY },
                        scale: this.tmp.startScale
                    };

                    this.update();
                },
                update: function(clear){
                    // disable pan
                    this.transform.translate = {x:0,y:0};

                    var value = [
                        'translateX(' + this.transform.translate.x + 'px)',
                        'translateY(' + this.transform.translate.y + 'px)',
                        'scale(' + this.transform.scale + ', ' + this.transform.scale + ')'
                    ];

                    value = value.join(' ');

                    if(clear)
                        value = '';

                    //mask.textContent = value;
                    this.element.css({
                        webkitTransform: value,
                        mozTransform: value,
                        transform: value
                    });
                },
                panTo: function(newX, newY){
                    var maskCenter = mask.getCenter(),
                        difference = this.getDifference(),
                        bounds = utils.calcBounds(),
                        possibleX = -((bounds.x.min + (newX * this.scale)) - difference.w - maskCenter.x),
                        possibleY = -((bounds.y.min + (newY * this.scale)) - difference.h - maskCenter.y),
                        coords = utils.stayInBounds(possibleX, possibleY);

                    this.transform.translate.x = coords.x;
                    this.transform.translate.y = coords.y;

                    this.update();
                }
            };

            var self = {
                mc: null,
                settings: null,
                target: null,
                init: function(_settings_, _element_){

                    this.settings = {
                        startScale: 1,
                        maxScale: 3,
                        fitHeight: false,
                        fitWidth: false,
                        panInBounds: true
                    };

                    function init(target, isFullscreenInit){
                        if(self.mc != null) {
                            return false;
                        }

                        self.target = target;

                        // let the browser init all dimensions of image and mask
                        $timeout(function(){
                            mask.init();
                            self.initHammer();
                            image.init(target, isFullscreenInit);
                        },100);
                    }

                    if('initOnFullscreen' in _settings_ && _settings_.initOnFullscreen) {
                        cmFullscreen.on('change', function (event, data) {
                            if (!cmUtil.isInParent(data.element, _element_[0])) {
                                return false;
                            }

                            if (data.isOpen) {
                                init(data.element, true);
                            } else {
                                image.update(true);
                                self.destroy();
                            }
                        });
                    } else if('initOnModalChange' in _settings_ && _settings_.initOnModalChange) {
                        init(_element_[0]);

                        cmModal.one('modal:closed', function(){
                            self.destroy();
                        });
                    } else {
                        init(_element_[0]);
                    }
                },
                initHammer: function(){
                    this.mc = new Hammer.Manager(this.target);

                    this.mc.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
                    this.mc.add(new Hammer.Pinch({ threshold: 0 }))
                        .recognizeWith( this.mc.get('pan') );

                    //this.mc.on('panstart panmove', this.handler.pan);
                    this.mc.on('pinchstart pinchmove', this.handler.pinch);
                    this.mc.on('hammer.input', this.handler.final);

                    angular.element($window).on('mousewheel', this.handler.mousewheel);
                    angular.element($window).on('DOMMouseScroll', this.handler.mousewheel);
                },
                handler: {
                    // desktop pinching via mousewheel
                    mousewheel: function(e) {
                        // cross-browser wheel delta
                        var e = $window.event || e; // old IE support
                        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                            center = {
                                x: e.clientX,
                                y: e.clientY
                            };

                        self.handler.scroll(delta,center);
                    },
                    scroll: function(delta, center){
                        var fakeEvent = {
                            type: 'pinchstart',
                            center: center,
                            scale: 0
                        };

                        // zoom in
                        if(delta > 0){
                            fakeEvent.scale = 1.25;
                            // zoom out
                        } else {
                            fakeEvent.scale = 0.85;
                        }

                        self.handler.pinch(fakeEvent);
                    },
                    pinch: function(ev) {
                        if(ev.type == 'pinchstart') {
                            image.tmp.initScale = image.scale || 1;
                            image.tmp.panTo = {
                                x: -(image.tmp.lastX - ev.center.x),
                                y: -(image.tmp.lastY - ev.center.y)
                            };
                        }

                        var newScale = image.tmp.initScale * ev.scale,
                            setScale = 1;

                        switch(true){
                            case newScale > self.settings.maxScale:
                                setScale = self.settings.maxScale;
                            break;
                            case newScale < 0.5:
                                setScale = 0.5;
                            break;
                            default:
                                setScale = newScale;
                        }

                        image.scale = image.transform.scale = setScale;

                        image.panTo(image.tmp.panTo.x,image.tmp.panTo.y);

                        image.update();
                    },
                    pan: function(ev) {
                        if(ev.type == 'panstart'){
                            image.tmp.panScale = 1;
                            image.tmp.panBounds = utils.calcBounds(image.tmp.panScale);
                        }

                        var possibleX = image.tmp.lastX + ev.deltaX,
                            possibleY = image.tmp.lastY + ev.deltaY,
                            coords = self.settings.panInBounds
                                ? utils.stayInBounds(possibleX, possibleY, image.tmp.panBounds, image.tmp.panScale)
                                : {x:possibleX,y:possibleY};


                        //console.log(coords)

                        //image.transform.translate.x = coords.x;
                        //image.transform.translate.y = coords.y;

                        image.update();
                    },
                    final: function(ev) {
                        if (ev.isFinal) {
                            //console.log('final', JSON.stringify(image.transform, null));
                            image.tmp.lastX = image.transform.translate.x;
                            image.tmp.lastY = image.transform.translate.y;
                        }
                    }
                },
                destroy: function(){
                    if(self.mc != null) {
                        self.mc.destroy();
                        self.mc = null;
                    }

                    angular.element($window).off('mousewheel', self.handler.mousewheel);
                    angular.element($window).off('DOMMouseScroll', self.handler.mousewheel);

                    angular.element($window).off('resize',mask.resize);
                    angular.element($window).off('orientationchange',mask.resize);
                }
            };

            return self;
        }
]);