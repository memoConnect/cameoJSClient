var emptyFunction = function(){return this},
    elementMock = {
        name:'element',
        appendChild: emptyFunction,
        addEventListener: emptyFunction,
        attachEvent: emptyFunction,
        removeEventListener: emptyFunction,
        detachEvent: emptyFunction,
        style: {webkitBehavior:''},
        setAttribute: emptyFunction,
        pathname: ''
    },
    document = {
        name:'document',
        createElementNS: function(a, b){return elementMock},
        createElement: function(){return elementMock},
        getElementsByTagName: function(){return [elementMock]},
        querySelector: function(){return [elementMock]},
        appendChild: emptyFunction,
        addEventListener: emptyFunction,
        attachEvent: emptyFunction,
        removeEventListener: emptyFunction,
        detachEvent: emptyFunction
    },
    location = {
        name:'location',
        href: ''
    },
    Base64 = emptyFunction,
    ASN1   = emptyFunction,
    window = {
        name:'window',
        document: document,
        location: location,
        addEventListener: emptyFunction,
        Base64: Base64
    },

    angular = {
        $$csp:emptyFunction,
        element:function(){return{find:function(){return{prepend:emptyFunction}}}},
        module:function(){return{
            run:emptyFunction,
            constant:emptyFunction,
            config:emptyFunction,
            provider:emptyFunction,
            service:emptyFunction,
            factory:emptyFunction,
            directive:emptyFunction,
            filter:emptyFunction
        }}
    };
