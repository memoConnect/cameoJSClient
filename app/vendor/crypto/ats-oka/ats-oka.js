(function(root, factory) {
    root.atsOka = factory()
}(this, function(){
    "use strict";

    var self = {}, __package, __import, __export, __unit, __uses, __DEFINED_UNITS, __CURRENT_UNIT;
    /*
 * packages.js
 * Simple framework for managing script's dependency.
 * See packages.readme.txt for further information.
 *
 * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
 * This script file is distributed under the LGPL
     */
    function initPackages( __scope ) {
        __package = function( packageRoot,  pathString ) {
            var paths = pathString.split( "." );
            var currentPackage = packageRoot;
            for ( var i=0; i<paths.length; i++ ) {
                var id = paths[i];
                if ( currentPackage[ id ] == null ) {
                    currentPackage[ id ] = {};
                }
                currentPackage= currentPackage[ id ];
            }
            return currentPackage;
        };

        __export = function( packageRoot,  pathString , object ) {
            var paths = pathString.split( "." );
            var currentPackage = packageRoot;
            for ( var i=0; i<paths.length; i++ ) {
                var id = paths[i];
                if ( i < paths.length -1 ) {
                    if ( currentPackage[ id ] == null ) {
                        currentPackage[ id ] = {};
                    }
                } else {
                    if ( currentPackage[ id ] == null ) {
                        currentPackage[ id ] = object;
                    } else {
                        throw "The specified package path is already defined. " + pathString;
                    }
                }
                currentPackage= currentPackage[ id ];
            }
            return currentPackage;
        };

        __import = function( packageRoot,  pathString , object ) {
            var paths = pathString.split( "." );
            var currentPackage = packageRoot;
            var currentPath = "[package root]";
            for ( var i=0; i<paths.length; i++ ) {
                var id = paths[i];
                currentPath += "."+id;
                if ( currentPackage[ id ] == null ) {
                    throw pathString + " is not found. " + currentPath + " is null in " +__CURRENT_UNIT.unit_name+".";
                }
                currentPackage= currentPackage[ id ];
            }
            return currentPackage;
        };

        __DEFINED_UNITS={};
        __CURRENT_UNIT = "";
        __unit = function( unit_name ) {
            __DEFINED_UNITS[ unit_name ] = true;
            __CURRENT_UNIT = {
                unit_name : unit_name,
                requring_units : {}
            };
        }
        __uses = function( unit_name ) {
            if ( __DEFINED_UNITS[ unit_name ] ) {
                __CURRENT_UNIT.requring_units[ unit_name ] = true;
                return true;
            } else {
                throw "Unit Not Found Error : " + __CURRENT_UNIT.unit_name + " requires " + unit_name ;
            }
        };


        Object.prototype.resolve = function( pathString ) {
            return __package( this, pathString );
        };

        __scope.__package = __package;
        __scope.__import = __import;
        __scope.__export = __export;
        __scope.__unit = __unit;
        __scope.__uses = __uses;
        __scope.__DEFINED_UNITS = __DEFINED_UNITS;
        __scope.__PACKAGE_ENABLED = true;

        __unit( "packages.js" );
    }
    initPackages( self );

    /*
     * isarray.js
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     */
    var packageRoot = self;
    if ( packageRoot.__PACKAGE_ENABLED ) {
        __unit("isarray.js");
        __uses("packages.js");
    }
    Array.prototype.isArray=true;

    /////////////////////////////////////////////////////////
    //                                                     //
    // "nonstructured.js"                                  //
    // A Framework for Non-Structure Oriented Programming  //
    // Implementation                                      //
    // Copyright(c) 2008 Atsushi Oka [ http://oka.nu/ ]    //
    // This script file is distributed under the LGPL      //
    //                                                     //
    /////////////////////////////////////////////////////////
    // Please check nonstructured.examples.js.
    // There are many examples with description to learn how to use nonstructured.js.
    function init( packageRoot ) {
        if ( packageRoot.__PACKAGE_ENABLED ) {
            __unit( "nonstructured.js" );
        }

        Nonstructured.log = function(message) {
            // trace(message);
            return;
        };
        Nonstructured.err = function(message) {
            trace(message);
            return;
        };
        var log = function(message){
            Nonstructured.log(message);
            return;
        }
        var err = function(message){
            Nonstructured.err(message);
            return;
        };

        /**
         * A constructor of Nonstructured class. The constructor has variable
         * length parameters. You can pass any Function objects any Array
         * objects at this parameter. They will be stored in an internal queue
         * described below. Though you usually do not have to call this
         * constructor directly. Use ready() method instead.
         *
         * Once it starts, the closure will be repeatedly called until it returns
         * false.  When the closure returns another closure, it will be queued
         * on an internal stack as a statement and the closure will be processed
         * recursively.
         */
        function Nonstructured(/*...args */) {
            this._stack = [];
            this._scope = {};
            this._frequency = Nonstructured.frequency;
            this._timeout  = 1;
            this._done = function(){};
            this._progress = function(){};
            this._limit = createLimitChecker(-1);
            if ( 0<arguments.length ) {
                var a = [];
                for ( var i=0;i<arguments.length;i++ ) {
                    a[i] = arguments[i];
                }
                this.initialize( a );
            }
        };

        Nonstructured.frequency = 1;

        function createLimitChecker(value) {
            if ( value < 0 )  {
                return function(stepCount) {
                    return false;
                };
            } else {
                return function(stepCount) {
                    return value<stepCount;
                };
            }
        }

        function initialize( closures ) {
            var param = new Param();
            var subparam = new Param();
            for ( var i=0; i<closures.length; i++ ) {
                this._stack[i] = new StackFrame( closures[i], subparam, param );
                param=subparam;
                subparam= new Param();
            }
            return this;
        }

        Nonstructured.prototype.initialize = initialize;

        var callClosureNormal = function( id, closure, scope, param, subparam ) {
            return closure( scope, param, subparam );
        };
        var callClosureTrace = function( id, closure, scope, param, subparam ) {
            var name = ( closure.__NAME == null )
                ? 'CLOSURE=' + (id==null?"unknown":id)
                : 'CLOSURE=' + closure.__NAME + "/"+ (id==null?"unknown":id);
            var et = ElapsedTime.create();
            et.start( name );
            var result = closure( scope, param, subparam );
            et.stop();
            return result;
        };

        var callClosure = callClosureNormal;
        Nonstructured.traceResponce = function( v ) {
            if ( v ) {
                callClosure = callClosureTrace;
            } else {
                callClosure = callClosureNormal;
            }
        };

        /**
         * Process the top statement on the stack.
         *
         * In non-structured programming, a procedure can be divided into small
         * pieces of code chunk which are represented as a closure. In another
         * point of view, A closure is a statement. I prefer use this term.  A
         * statement is supposed to be called repeatedly until it returns false.
         * And I call this each calling "step".This process() method processes a
         * step.
         *
         * You can fully execute the procedure in this way :
         *
         *     var i=0;
         *     var f=function() {
         *         return i++<10;
         *     };
         *
         *     var nonstructured = f.ready();
         *     while ( nonstructured.process() ) {
         *         trace("processing!");
         *     }
         *     trace("done!");
         */

        Nonstructured.prototype.process = function() {
            if ( this._stack.length == 0 )
                return false;

            var result;
            var current = this._stack[0];
            var closure = current.closure;
            var scope = this._scope;

            closure = closuring( closure );

            // try {
            // result = closure( this._scope, current.param, current.subparam );
            result = callClosure( "others", closure, scope, current.param, current.subparam );
            // } catch ( e ) {
            // 	err( "Error occured :"+e );
            // 	return false;
            // }
            log( "process() closure() result: " + result );

            if ( result === undefined ) {
                err( "*** WARNING MAY BE MISSING return STATEMENT *** " );
                // result = BREAK;
            }

            if ( result ) {
                // result = BREAK;
            } else {
                result = CONTINUE;
            }

            if ( ! result.IS_CONTINUE() ) {
                // remove one stack frame from the queue.
                this._stack.shift();
            }

            if ( result.IS_RESULT_WRAPPER() ) {
                result = result.unwrap();
            }

            if ( result.IS_RUNNABLE() && ! result.IS_FLOW_CONTROLLER() ) {
                // queueing a new stack frame.
                this._stack.unshift( new StackFrame( result, current.subparam, new Param() ) );
            }
            return 0<this._stack.length;
        };

        Nonstructured.prototype.step = Nonstructured.prototype.process;

        /**
         * Methods below are setter/getter methods. Get a current value without
         * parameter and set a value with specific parameter.
         */

        /**
         * limit()
         *
         * limit property specifies the maximum steps for the execution.
         * If the count of steps exceeds this limit property, it will
         * automatically stop and notify the error.
         */
        Nonstructured.prototype.limit = function( value ) {
            if ( arguments.length == 0 ) {
                return this._limit;
            } else {
                this._limit = createLimitChecker( value );
                return this;
            }
        };

        /**
         * frequency()
         *
         * This frequency property specifies the frequency of step execution.
         * Nonstructured.go() method internally uses JavaScript's standard
         * global method setInterval()/clearInterval(). This frequency property
         * is applied to it.
         */
        Nonstructured.prototype.frequency = function( value ) {
            if ( arguments.length == 0 ) {
                return this._frequency;
            } else {
                this._frequency = value;
                return this;
            }
        };

        /**
         * timeout()
         *
         * This timeout property specifies the maximum elapsed time of each
         * timer calling.  Each timer calling, Nonstructured tries to call as
         * many steps until certain amount of time elapsed. This timeout
         * property specifies the amount of time in milliseconds.
         */
        Nonstructured.prototype.timeout = function( value ) {
            if ( arguments.length == 0 ) {
                return this._timeout;
            } else {
                this._timeout = value;
                return this;
            }
        };

        /**
         * done()
         *
         * done property specifies a procedure to be done when this object
         * finished to process all statements.
         */
        Nonstructured.prototype.done = function( value ) {
            if ( arguments.length == 0 ) {
                return this._done;
            } else {
                this._done = value;
                return this;
            }
        };

        /**
         * progress()
         *
         * progress property specifies a procedure to be call back when a
         * statement is processed.
         */
        Nonstructured.prototype.progress = function( value ) {
            if ( arguments.length == 0 ) {
                return this._progress;
            } else {
                this._progress = value;
                return this;
            }
        };

        /**
         * go()
         *
         * go() method automatically calls all statements in the internal stack.
         * If frequency property is zero or less than zero, Nonstructured tries
         * to call all statements and it will never return until the last
         * statement returns false.
         *
         * If frequency property is larger than zero, Nonstructured try to
         * execute it asynchronously.
         */
        Nonstructured.prototype.go = function() {
            log( "go()" );
            if ( this._frequency <=0 ) {
                return executeSync( this, this._limit, this._done, this._progress );
            } else {
                return executeAsync( this, this._frequency, this._timeout, this._limit, this._done, this._progress );
            }
        }

        /**
         * private class StackFrame
         */
        function StackFrame( closure, param, subparam ) {
            this.closure = closure;
            this.param= param;
            this.subparam= subparam;

        };

        /**
         * private class Param
         */
        function Param() {
        };
        Param.prototype.toString = function() {
            var names =[];
            for ( var n in this ) {
                if ( Object.prototype[n] == null ) {
                    names.push(n);
                }
            }
            names.sort();

            var s ="";
            for ( var i=0; i<names.length; i++ ) {
                s=s+names[i]+"="+this[names[i]] +"\n";
            }

            return "class Param(\n" + s + ")";

        };

        /**
         * private class ResultWrapper
         */
        function ResultWrapper( result ) {
            this.result = result;
        }
        ResultWrapper.prototype.toString = function() {
            return "class ResultWrapper() : " + this.result;
        };
        ResultWrapper.prototype.unwrap = function() {
            if ( this.result.IS_RESULT_WRAPPER() ) {
                return this.result.unwrap();
            } else {
                return this.result;
            }
        };

        /**
         * private methods.
         */

        function closuring( o ) {
            // log( "closuring : "+typeof o );
            // log( "closuring : "+o );

            if ( o.IS_RESULT_WRAPPER !=null && o.IS_RESULT_WRAPPER() ) {
                o = o.unwrap();
            }

            if ( o.__installedClosure == null ) {
                if ( ( typeof o ) != "function" ) {
                    o.__installedClosure = list( o );
                } else {
                    o.__installedClosure = o;
                }
            }

            return o.__installedClosure;
        }

        function createFlowController( name ) {
            var value = function() {
                return value;
            };
            value.toString = function() {
                // return name;
                return "FlowController."+name+"";
            };
            return value;
        }
        function createFlowController2( name ) {
            return function( labelName ) {
                return (new Object()).LABEL( labelName );
            };
        }


        var CONTINUE = createFlowController( "CONTINUE" ); // continue to process the current closure.
        var BREAK    = createFlowController( "BREAK" );    // break the current closure.
        var AGAIN    = createFlowController( "AGAIN" );    // go to beginning of the loop
        var EXIT     = createFlowController( "EXIT" );     // exit current loop.

        // Create a label flow-controller object
        var LABEL = createFlowController2();

        // Create a closure which implements FOR statement.
        var FOR = function( variable,condition,loop ) {
            var first = true;
            var func= function( scope,param,subparm) {
                param.FOR = variable;
                if ( first ) {
                    first = false;
                    log( "FOR:(first)" + condition(variable) );
                    var result = condition(variable);
                    if ( undefined === result ) {
                        err( "******** FOR : missing return statement in the condition closure **********" );
                    }
                    return result ? BREAK : EXIT;
                } else {
                    log( "FOR:" );
                    loop(variable);
                    var result = condition(variable);
                    if ( undefined === result ) {
                        err( "******** FOR : missing return statement in the condition closure **********" );
                    }
                    return result ? BREAK : EXIT;
                }
            };
            func.variable = variable;
            return func;
        };

        LABEL.toString = function() {
            return "FlowController.LABEL(null)";
        };
        FOR.toString = function() {
            return "FlowController.FOR(null)";
        };



        function zerof( n, digit ) {
            n = ""+n;
            while ( n.length < digit ) {
                n="0"+n;
            }
            return n;
        }

        /**
         * list()
         *
         * Creates a multiple-statement.  This method returns a newly generated
         * closure which executes multiple closures.
         */

        function list( closures ) {
            log( "Nonstructured.list start : the number of closures:" + closures.length );
            // for ( var i=0; i<closures.length; i++ ) {
            // 	log( "list["+i+"]="+closures[i] );
            // }

            var et = ElapsedTime.create();
            var first=true;

            var enterProc = function(){
                first=false;
                et.start( 'CLOSURE='+closureName + "(total)" );
            };
            var exitProc = function(){
                et.stop();
                first=true;
                reset();
            };

            var closureName = closures.__NAME;
            var labelName = closures.__LABEL_NAME;
            // trace( "labelName="+labelName);

            var i =0;
            function reset() {
                // log( "list.reset" );
                i =0;
            }
            function next() {
                // log( "list.next " + i);
                i++;
            }

            var result = function( scope, param, subparam ) {
                if ( first ) {
                    enterProc();
                }

                var closure = closuring( closures[ i ] );
                // var result = closure( scope, param, subparam );

                var name = closure.__NAME == null ? closureName + "("+ zerof(i,2) +")" : closure.__NAME;
                var result = callClosure( name , closure, scope, param, subparam );

                log( "list() closure() result: " + result );

                if ( result === undefined ) {
                    err( "*** WARNING MISSING return STATEMENT ***" );
                }

                if ( result ) {
                } else {
                    result = CONTINUE;
                }

                // NOTE1: If the result value is a Label object and their
                //        IDENTIFIED() values are not identical, ignore and
                //        deligate it to lower lebel lists/closures.
                // NOTE2: LABEL object is inherently same as EXIT operation.
                // NOTE3: Propagate this LABEL object to upper stack frames so do not replace the result.
                if ( result.IS_FLOW_CONTROLLER() ) {
                    if ( ( ! result.IS_LABEL() ) || ( result.LABELED() == closures.IDENTIFIED() ) ) {
                        if ( result.IS_CONTINUE() ) {
                            // reset();
                            result = CONTINUE;
                        } else if ( result.IS_BREAK() ) {
                            next();
                            result = CONTINUE;
                        } else if ( result.IS_AGAIN() ) {
                            reset();
                            result = CONTINUE;
                        } else if ( result.IS_EXIT() ) {
                            exitProc();
                            result = BREAK;
                        } else {
                            // THIS CAN'T BE HAPPENED
                            err("*** warning list() warning *** ");
                            next();
                            result = CONTINUE;
                        }
                    } else {
                        // trace("L2");
                        // REFER TO NOTES ABOVE.
                        exitProc();
                        // result = BREAK;
                    }

                    if ( closures.length <= i  ) {
                        err( "WARNING(1) *** MULTI-STATEMENT OVERED ITS LAST STATEMENT *** MAYBE MISSING FLOW-CONTROLLER *** " )
                        exitProc();
                        result = BREAK;
                    }

                } else {
                    // Wrap the result value by ResultWrapper object.
                    // The result value is not always fresh new instance druing it loops.
                    // modification for result causes skipping necessary procedure.
                    // to avoid this issue, wrapping it before any modification is required.

                    if ( ( ! result.IS_LABEL() ) || ( result.LABELED() == closures.IDENTIFIED() ) ) {
                        if ( result.IS_CONTINUE() ) {
                            // reset();
                            result = new ResultWrapper( result ).CONTINUE();
                        } else if ( result.IS_BREAK() ) {
                            next();
                            result = new ResultWrapper( result ).CONTINUE();
                        } else if ( result.IS_AGAIN() ) {
                            reset();
                            result = new ResultWrapper( result ).CONTINUE();
                        } else if ( result.IS_EXIT() ) {
                            exitProc();
                            result = new ResultWrapper( result ).BREAK();
                        } else {
                            // DEFAULT BEHAVIOR ( SAME AS BREAK )
                            next();
                            result = new ResultWrapper( result ).CONTINUE();
                        }
                    } else {
                        // trace("L1/" + result.LABELED() + "/"+closures.IDENTIFIED() );
                        // REFER TO NOTES ABOVE.
                        exitProc();
                        // result = new ResultWrapper( result ).BREAK();
                    }

                    if ( closures.length <= i  ) {
                        err( "WARNING(2) *** MULTI-STATEMENT OVERED ITS LAST STATEMENT *** MAYBE MISSING FLOW-CONTROLLER *** " )
                        exitProc();
                        result = new ResultWrapper( result ).BREAK();
                    }
                }

                return result;
            };

            if ( labelName !=null)  {
                result.__LABEL_NAME = labelName;
            }
            if ( closureName!=null ) {
                result.__NAME = closureName ;
            }
            return result;
        };

        /**
         * executeSync()
         * Execute all statements synchronously.
         */
        function executeSync( nonstructured, limit, done, progress ) {
            log("Nonstructured.executeSync:start >> ");
            var count=0;
            var startTime = new Date();
            for(;;){
                count++;
                if ( ! nonstructured.process() ) {
                    log("Nonstructured.executeSync:done <<" );
                    var finishTime = new Date();
                    done( true, count, ( finishTime.getTime() -startTime.getTime() ), startTime, finishTime );
                    break;
                }
                progress( count );
                if ( limit( count ) ) {
                    log("Nonstructured.executeSync:done ( exceed count limit ) <<" );
                    var finishTime = new Date();
                    done( false, count, ( finishTime.getTime() -startTime.getTime() ), startTime, finishTime );
                    break;
                }
            }
            return null;
        };

        /**
         * executeAsync()
         * Execute all statements asynchronously.
         */
        function executeAsync( nonstructured, frequency, timeout, limit, done, progress ) {
            log("Nonstructured.executeAsync:start >>" );
            var startTime = new Date();
            var finishTime;
            var synchronizedFlg = false;
            var count =0;
            var f = function() {
                if ( synchronizedFlg ) {
                    log( "confliction was detected." );
                    return;
                } else {
                    synchronizedFlg=true;
                    var s = new Date().getTime();
                    for ( var i=0;;i++ ){
                        count++;
                        if ( ! nonstructured.process() ) {
                            log("Nonstructured.executeAsync:done <<");
                            clearInterval( id );

                            finishTime = new Date();
                            done( true, count, ( finishTime.getTime()-startTime.getTime() ), startTime, finishTime );
                            break;
                        }
                        progress( count );
                        if ( limit(count) ) {
                            log("Nonstructured.executeAsync:done (exceed count limit)  <<");
                            clearInterval( id );

                            finishTime = new Date();
                            done( false, count, ( finishTime.getTime()-startTime.getTime() ), startTime, finishTime );
                            break;
                        }
                        var e = new Date().getTime();
                        if ( timeout < e-s  ) {
                            log("Async:count"+i);
                            break;
                        }
                    }
                    synchronizedFlg=false;
                }
            };
            var id = setInterval( f, frequency );
            return id;
        };

        function createFlowControlFunction( fieldName ) {
            return function() {
                this[ fieldName ] = true;
                return this;
            };
        }
        function createFlowControlResetFunction( fieldName ) {
            return function() {
                delete this[ fieldName ];
                return this;
            };
        }
        function createFlowControlCheckFunction( fieldName ) {
            return function() {
                // log( "CHECKING " + fieldName );
                return ( this[fieldName] !=null ? true : false );
            };
        }

        function createFlowControlFunction2( fieldName , defaultName) {
            return function(name) {
                if ( name == null ) {
                    name = defaultName;
                }
                this[ fieldName ] = name;
                return this;
            };
        }
        function createFlowControlGetFunction2( fieldName , defaultName) {
            return function(name) {
                return this[ fieldName ];
            };
        }

        var DEFAULT_LABEL_NAME = "DEFAULT_LABEL";

        var _SET_BREAK      = createFlowControlFunction( "__BREAK" );
        var _SET_CONTINUE   = createFlowControlFunction( "__CONTINUE" );
        var _SET_AGAIN      = createFlowControlFunction( "__AGAIN" );
        var _SET_EXIT       = createFlowControlFunction( "__EXIT" );
        var _SET_LABEL      = createFlowControlFunction2( "__LABEL", DEFAULT_LABEL_NAME );

        var _RESET_BREAK    = createFlowControlResetFunction( "__BREAK" );
        var _RESET_CONTINUE = createFlowControlResetFunction( "__CONTINUE" );
        var _RESET_AGAIN    = createFlowControlResetFunction( "__AGAIN" );
        var _RESET_EXIT     = createFlowControlResetFunction( "__EXIT" );
        var _RESET_LABEL    = createFlowControlResetFunction( "__LABEL", DEFAULT_LABEL_NAME );

        var _IS_BREAK       = createFlowControlCheckFunction( "__BREAK" );
        var _IS_CONTINUE    = createFlowControlCheckFunction( "__CONTINUE" );
        var _IS_AGAIN       = createFlowControlCheckFunction( "__AGAIN" );
        var _IS_EXIT        = createFlowControlCheckFunction( "__EXIT" );
        var _IS_LABEL       = createFlowControlCheckFunction( "__LABEL", DEFAULT_LABEL_NAME );

        var _GET_LABEL      = createFlowControlGetFunction2( "__LABEL", DEFAULT_LABEL_NAME );

        var RETURN_TRUE = function() {
            return true;
        };
        var RETURN_FALSE = function() {
            return false;
        };


        var _SET_LABEL_NAME = function( name ) {
            if ( name == null ) {
                name = DEFAULT_LABEL_NAME;
            }
            this.__LABEL_NAME = name;
            // trace("_SET_LABEL_NAME:__LABEL_NAME:"+this.__LABEL_NAME);
            return this;
        }

        var _GET_LABEL_NAME = function() {
            // trace("_GET_LABEL_NAME:__LABEL_NAME:"+this.__LABEL_NAME);
            return this.__LABEL_NAME;
        }

        function _ready() {
            return new Nonstructured( this );
        }

        function _SET_NAME( name ) {
            if ( arguments.length == 0 ) {
                return this.__NAME;
            } else {
                this.__NAME = name;
                return this;
            }
        }

        /* publishing the class */

        Function.prototype.ready = _ready;
        Array.prototype.ready = _ready;

        Object.prototype.NAME           = _SET_NAME;
        Object.prototype.IDENTIFY       = _SET_LABEL_NAME;
        Object.prototype.IDENTIFIED     = _GET_LABEL_NAME;

        Object.prototype.AGAIN          = _SET_AGAIN;
        Object.prototype.EXIT           = _SET_EXIT;
        Object.prototype.CONTINUE       = _SET_CONTINUE;
        Object.prototype.BREAK          = _SET_BREAK;
        Object.prototype.LABEL          = _SET_LABEL;

        Object.prototype.IS_AGAIN       = _IS_AGAIN;
        Object.prototype.IS_EXIT        = _IS_EXIT;
        Object.prototype.IS_CONTINUE    = _IS_CONTINUE;
        Object.prototype.IS_BREAK       = _IS_BREAK;
        Object.prototype.IS_LABEL       = _IS_LABEL;

        Object.prototype.RESET_AGAIN    = _RESET_AGAIN;
        Object.prototype.RESET_EXIT     = _RESET_EXIT;
        Object.prototype.RESET_CONTINUE = _RESET_CONTINUE;
        Object.prototype.RESET_BREAK    = _RESET_BREAK;
        Object.prototype.RESET_LABEL    = _RESET_LABEL;

        Object.prototype.LABELED        = _GET_LABEL;

        Object.prototype.IS_RUNNABLE       = RETURN_FALSE;
        Object.prototype.IS_RESULT_WRAPPER = RETURN_FALSE;
        Object.prototype.IS_FLOW_CONTROLLER = RETURN_FALSE;


        Function.prototype.IS_RUNNABLE            = RETURN_TRUE;
        Array.prototype.IS_RUNNABLE               = RETURN_TRUE;
        ResultWrapper.prototype.IS_RESULT_WRAPPER = RETURN_TRUE;

        CONTINUE.CONTINUE();
        BREAK.BREAK();
        AGAIN.AGAIN();
        EXIT.EXIT();
        LABEL.LABEL().EXIT();

        CONTINUE.IS_FLOW_CONTROLLER = RETURN_TRUE;
        BREAK.IS_FLOW_CONTROLLER = RETURN_TRUE;
        AGAIN.IS_FLOW_CONTROLLER = RETURN_TRUE;
        EXIT.IS_FLOW_CONTROLLER = RETURN_TRUE;
        LABEL.IS_FLOW_CONTROLLER = RETURN_TRUE;

        // NOTE : Using LABEL function itself as a constant flow controller is
        // available but not recommended.  It will work as EXIT with default
        // label name.

        packageRoot.Nonstructured = Nonstructured;
        packageRoot.CONTINUE = CONTINUE;
        packageRoot.BREAK = BREAK;
        packageRoot.AGAIN = AGAIN;
        packageRoot.EXIT = EXIT;
        packageRoot.LABEL = LABEL;
        packageRoot.FOR = FOR;
    }
    init( self );

    /*
     * binary.js
     * Tools for creating, modifying binary data
     * including base64-encoding, base64-decoding , utf8-encoding and utf8-decoding
     * See binary.readme.txt for further information.
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     */
    function initBinary( packageRoot ) {
        if ( packageRoot.__PACKAGE_ENABLED ) {
            __unit( "binary.js" );
        }

        var i2a  = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
            'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
            'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '/'
        ];

        function base64_encode( s ) {
            var length = s.length;
            var groupCount = Math.floor( length / 3 );
            var remaining = length - 3 * groupCount;
            var result = "";

            var idx = 0;
            for (var i=0; i<groupCount; i++) {
                var b0 = s[idx++] & 0xff;
                var b1 = s[idx++] & 0xff;
                var b2 = s[idx++] & 0xff;
                result += (i2a[ b0 >> 2]);
                result += (i2a[(b0 << 4) &0x3f | (b1 >> 4)]);
                result += (i2a[(b1 << 2) &0x3f | (b2 >> 6)]);
                result += (i2a[ b2 & 0x3f]);
            }

            if ( remaining == 0 ) {
            } else if ( remaining == 1 ) {
                var b0 = s[idx++] & 0xff;
                result += ( i2a[ b0 >> 2 ] );
                result += ( i2a[ (b0 << 4) & 0x3f] );
                result += ( "==" );
            } else if ( remaining == 2 ) {
                var b0 = s[idx++] & 0xff;
                var b1 = s[idx++] & 0xff;
                result += ( i2a[ b0 >> 2 ] );
                result += ( i2a[(b0 << 4) & 0x3f | (b1 >> 4)]);
                result += ( i2a[(b1 << 2) & 0x3f ] );
                result += ('=');
            } else {
                throw "never happen";
            }
            return result;
        }

        var a2i = [
            -1,   -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, -1,
            -1,   -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1, -1,
            -1,   -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  62,  -1,  -1,  -1, 63,
            52,   53,  54,  55,  56,  57,  58,  59,  60,  61,  -1,  -1,  -1,  -1,  -1, -1,
            -1,    0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,  13, 14,
            15,   16,  17,  18,  19,  20,  21,  22,  23,  24,  25,  -1,  -1,  -1,  -1, -1,
            -1,   26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,  39, 40,
            41,   42,  43,  44,  45,  46,  47,  48,  49,  50,  51
        ];

        function get_a2i( c ) {
            var result = (0<=c) && (c<a2i.length) ? a2i[ c ] : -1;
            if (result < 0) throw "Illegal character " + c;
            return result;
        }

        function base64_decode(s) {
            var length = s.length;
            var groupCount = Math.floor( length/4 );
            if ( 4 * groupCount != length )
                throw "String length must be a multiple of four.";

            var missing = 0;
            if (length != 0) {
                if ( s.charAt( length - 1 ) == '=' ) {
                    missing++;
                    groupCount--;
                }
                if ( s.charAt( length - 2 ) == '=' )
                    missing++;
            }

            var len = ( 3 * groupCount - missing );
            if ( len < 0 ) {
                len=0;
            }
            var result = new Array( len );
            // var result = new Array( 3 * groupCount - missing );
            // var result = new Array( 3 * ( groupCount +1 ) - missing );
            var idx_in = 0;
            var idx_out = 0;
            for ( var i=0; i<groupCount; i++ ) {
                var c0 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c1 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c2 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c3 = get_a2i( s.charCodeAt( idx_in++ ) );
                result[ idx_out++ ] = 0xFF & ( (c0 << 2) | (c1 >> 4) );
                result[ idx_out++ ] = 0xFF & ( (c1 << 4) | (c2 >> 2) );
                result[ idx_out++ ] = 0xFF & ( (c2 << 6) | c3 );
            }

            if ( missing == 0 ) {
            } else if ( missing == 1 ) {
                var c0 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c1 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c2 = get_a2i( s.charCodeAt( idx_in++ ) );
                result[ idx_out++ ] = 0xFF & ( (c0 << 2) | (c1 >> 4) );
                result[ idx_out++ ] = 0xFF & ( (c1 << 4) | (c2 >> 2) );

            } else if ( missing == 2 ) {
                var c0 = get_a2i( s.charCodeAt( idx_in++ ) );
                var c1 = get_a2i( s.charCodeAt( idx_in++ ) );
                result[ idx_out++ ] = 0xFF & ( ( c0 << 2 ) | ( c1 >> 4 ) );
            } else {
                throw "never happen";
            }
            return result;
        }

        function base64x_encode( s ) {
            return base64x_pre_encode( base64_encode(s)  );
        }
        function base64x_decode( s ) {
            return base64_decode( base64x_pre_decode(s) );
        }

        var base64x_pre_encode_map = {};
        base64x_pre_encode_map["x"] = "xx";
        base64x_pre_encode_map["+"] = "xa";
        base64x_pre_encode_map["/"] = "xb";
        base64x_pre_encode_map["="] = "";


        function base64x_pre_encode( s ) {
            var ss = "";
            for ( var i=0; i<s.length; i++ ) {
                var c = s.charAt(i);
                var cc = base64x_pre_encode_map[ c ];
                if ( cc != null ) {
                    ss = ss + cc;
                } else {
                    ss = ss + c;
                }
            }
            return ss;
        }

        var base64x_pre_decode_map = {};
        base64x_pre_decode_map['x'] = 'x';
        base64x_pre_decode_map['a'] = '+';
        base64x_pre_decode_map['b'] = '/';

        function base64x_pre_decode( s ) {
            var ss = "";
            for ( var i=0; i<s.length; i++ ) {
                var c = s.charAt(i);
                if ( c == 'x' ) {
                    c = s.charAt(++i);
                    var cc = base64x_pre_decode_map[ c ];
                    if ( cc != null ) {
                        ss = ss + cc;
                        // ss = ss + '/';
                    } else {
                        // throw "invalid character was found. ("+cc+")"; // ignore.
                    }
                } else {
                    ss = ss + c;
                }
            }
            while ( ss.length % 4 != 0 ) {
                ss += "=";
            }
            return ss;
        }

        function equals( a, b ){
            if ( a.length != b.length )
                return false;
            var size=a.length;
            for ( var i=0;i<size;i++ ){
                // trace( a[i] + "/" + b[i] );
                if ( a[i] != b[i] )
                    return false;
            }
            return true;
        }


        function hex( i ){
            if ( i == null )
                return "??";
            //if ( i < 0 ) i+=256;
            i&=0xff;
            var result = i.toString(16);
            return ( result.length<2 ) ? "0" +result : result;
        }

        function base16( data, columns, delim ) {
            return base16_encode( data,columns,delim );
        }
        function base16_encode( data, columns, delim ) {
            if ( delim == null ){
                delim="";
            }
            if ( columns == null ) {
                columns = 256;
            }
            var result ="";
            for ( var i=0; i<data.length; i++ ) {
                if ( ( i % columns == 0 ) && ( 0<i ) )
                    result += "\n";
                result += hex( data[i] ) + delim;
            }
            return result.toUpperCase();
        }

        var amap = {};
        amap['0'] =   0; amap['1'] =   1; amap['2'] =   2; amap['3'] =   3;
        amap['4'] =   4; amap['5'] =   5; amap['6'] =   6; amap['7'] =   7;
        amap['8'] =   8; amap['9'] =   9; amap['A'] =  10; amap['B'] =  11;
        amap['C'] =  12; amap['D'] =  13; amap['E'] =  14; amap['F'] =  15;
        amap['a'] =  10; amap['b'] =  11;
        amap['c'] =  12; amap['d'] =  13; amap['e'] =  14; amap['f'] =  15;

        function get_amap( c ) {
            var cc = amap[c];
            //trace(c + "=>" + cc );
            if ( cc == null )
                throw "found an invalid character.";
            return cc;
        }

        function base16_decode( data ) {
            var ca = [];
            for ( var i=0,j=0; i<data.length; i++ ) {
                var c = data.charAt( i );
                if ( c == "\s" ) {
                    continue;
                } else {
                    ca[j++] = c;
                }
            }
            if ( ca.length % 2 != 0 ) {
                throw "data must be a multiple of two.";
            }

            var result = new Array( ca.length >> 1 );
            for ( var i=0; i<ca.length; i+=2 ) {
                var v = 0xff & ( ( get_amap( ca[i] ) <<4 ) | ( get_amap( ca[i+1] ) ) )  ;
                result[i>>1] = v;
                // trace(  get_amap( ca[i+1] ) )
                // result[i>>1] =  get_amap( ca[i+1] );
            }
            return result;
        }
    // trace( base16_encode([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,128,255 ] ) );
    // trace( base16_encode( base16_decode("000102030405060708090A0B0C0D0E0F1080FF") ) );
    // trace( base16_encode( base16_decode( "000102030405060708090A0B0C0D0E0F102030405060708090A0B0C0D0E0F0FF" ) ) );
    //                                       000102030405060708090A0B0C0D0E0F102030405060708090A0B0C0D0E0F0FF


    /////////////////////////////////////////////////////////////////////////////////////////////

        var B10000000 = 0x80;
        var B11000000 = 0xC0;
        var B11100000 = 0xE0;
        var B11110000 = 0xF0;
        var B11111000 = 0xF8;
        var B11111100 = 0xFC;
        var B11111110 = 0xFE;
        var B01111111 = 0x7F;
        var B00111111 = 0x3F;
        var B00011111 = 0x1F;
        var B00001111 = 0x0F;
        var B00000111 = 0x07;
        var B00000011 = 0x03;
        var B00000001 = 0x01;

        function str2utf8( str ){
            var result = [];
            var length = str.length;
            var idx=0;
            for ( var i=0; i<length; i++ ){
                var c = str.charCodeAt( i );
                if ( c <= 0x7f ) {
                    result[idx++] = c;
                } else if ( c <= 0x7ff ) {
                    result[idx++] = B11000000 | ( B00011111 & ( c >>>  6 ) );
                    result[idx++] = B10000000 | ( B00111111 & ( c >>>  0 ) );
                } else if ( c <= 0xffff ) {
                    result[idx++] = B11100000 | ( B00001111 & ( c >>> 12 ) ) ;
                    result[idx++] = B10000000 | ( B00111111 & ( c >>>  6 ) ) ;
                    result[idx++] = B10000000 | ( B00111111 & ( c >>>  0 ) ) ;
                } else if ( c <= 0x10ffff ) {
                    result[idx++] = B11110000 | ( B00000111 & ( c >>> 18 ) ) ;
                    result[idx++] = B10000000 | ( B00111111 & ( c >>> 12 ) ) ;
                    result[idx++] = B10000000 | ( B00111111 & ( c >>>  6 ) ) ;
                    result[idx++] = B10000000 | ( B00111111 & ( c >>>  0 ) ) ;
                } else {
                    throw "error";
                }
            }
            return result;
        }

        function utf82str( data ) {
            var result = "";
            var length = data.length;

            for ( var i=0; i<length; ){
                var c = data[i++];
                if ( c < 0x80 ) {
                    result += String.fromCharCode( c );
                } else if ( ( c < B11100000 ) ) {
                    result += String.fromCharCode(
                        ( ( B00011111 & c         ) <<  6 ) |
                            ( ( B00111111 & data[i++] ) <<  0 )
                    );
                } else if ( ( c < B11110000 ) ) {
                    result += String.fromCharCode(
                        ( ( B00001111 & c         ) << 12 ) |
                            ( ( B00111111 & data[i++] ) <<  6 ) |
                            ( ( B00111111 & data[i++] ) <<  0 )
                    );
                } else if ( ( c < B11111000 ) ) {
                    result += String.fromCharCode(
                        ( ( B00000111 & c         ) << 18 ) |
                            ( ( B00111111 & data[i++] ) << 12 ) |
                            ( ( B00111111 & data[i++] ) <<  6 ) |
                            ( ( B00111111 & data[i++] ) <<  0 )
                    );
                } else if ( ( c < B11111100 ) ) {
                    result += String.fromCharCode(
                        ( ( B00000011 & c         ) << 24 ) |
                            ( ( B00111111 & data[i++] ) << 18 ) |
                            ( ( B00111111 & data[i++] ) << 12 ) |
                            ( ( B00111111 & data[i++] ) <<  6 ) |
                            ( ( B00111111 & data[i++] ) <<  0 )
                    );
                } else if ( ( c < B11111110 ) ) {
                    result += String.fromCharCode(
                        ( ( B00000001 & c         ) << 30 ) |
                            ( ( B00111111 & data[i++] ) << 24 ) |
                            ( ( B00111111 & data[i++] ) << 18 ) |
                            ( ( B00111111 & data[i++] ) << 12 ) |
                            ( ( B00111111 & data[i++] ) <<  6 ) |
                            ( ( B00111111 & data[i++] ) <<  0 )
                    );
                }
            }
            return result;
        }

    /////////////////////////////////////////////////////////////////////////////////////////////

    // convert unicode character array to string
        function char2str( ca ) {
            var result = "";
            for ( var i=0; i<ca.length; i++ ) {
                result += String.fromCharCode( ca[i] );
            }
            return result;
        }

    // convert string to unicode character array
        function str2char( str ) {
            var result = new Array( str.length );
            for ( var i=0; i<str.length; i++ ) {
                result[i] = str.charCodeAt( i );
            }
            return result;
        }

    /////////////////////////////////////////////////////////////////////////////////////////////

    // byte expressions (big endian)
        function i2ba_be(i) {
            return [
                0xff & (i>>24),
                0xff & (i>>16),
                0xff & (i>> 8),
                0xff & (i>> 0)
            ];
        }
        function ba2i_be(bs) {
            return (
                ( bs[0]<<24 )
                    | ( bs[1]<<16 )
                    | ( bs[2]<< 8 )
                    | ( bs[3]<< 0 )
                );
        }
        function s2ba_be(i) {
            return [
                0xff & (i>> 8),
                0xff & (i>> 0)
            ];
        }
        function ba2s_be(bs) {
            return (
                0
                    | ( bs[0]<< 8 )
                    | ( bs[1]<< 0 )
                );
        }

    // byte expressions (little endian)
        function i2ba_le(i) {
            return [
                0xff & (i>> 0),
                0xff & (i>> 8),
                0xff & (i>>16),
                0xff & (i>>24)
            ];
        }
        function ba2i_le(bs) {
            return (
                0
                    | ( bs[3]<< 0 )
                    | ( bs[2]<< 8 )
                    | ( bs[1]<<16 )
                    | ( bs[0]<<24 )
                );
        }
        function s2ba_le(i) {
            return [
                0xff & (i>> 0),
                0xff & (i>> 8)
            ];
        }
        function ba2s_le(bs) {
            return (
                0
                    | ( bs[1]<< 0 )
                    | ( bs[0]<< 8 )
                );
        }

        function ia2ba_be( ia ) {
            var length = ia.length <<2;
            var ba = new Array( length );
            for(var ii=0,bi=0;ii<ia.length&&bi<ba.length; ){
                ba[bi++] = 0xff & ( ia[ii] >> 24 );
                ba[bi++] = 0xff & ( ia[ii] >> 16 );
                ba[bi++] = 0xff & ( ia[ii] >>  8 );
                ba[bi++] = 0xff & ( ia[ii] >>  0 );
                ii++;
            }
            return ba;
        }
        function ba2ia_be( ba ) {
            var length = (ba.length+3)>>2;
            var ia = new Array( length );;
            for(var ii=0,bi=0; ii<ia.length && bi<ba.length; ){
                ia[ii++] =
                    ( bi < ba.length ? (ba[bi++]  << 24 ) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]  << 16 ) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]  <<  8 ) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]/*<< 0*/) : 0 ) ;
            }
            return ia;
        }

        function ia2ba_le( ia ) {
            var length = ia.length <<2;
            var ba = new Array( length );
            for(var ii=0,bi=0;ii<ia.length&&bi<ba.length; ){
                ba[bi++] = 0xff & ( ia[ii] >>  0 );
                ba[bi++] = 0xff & ( ia[ii] >>  8 );
                ba[bi++] = 0xff & ( ia[ii] >> 16 );
                ba[bi++] = 0xff & ( ia[ii] >> 24 );
                ii++;
            }
            return ba;
        }
        function ba2ia_le( ba ) {
            var length = (ba.length+3)>>2;
            var ia = new Array( length );;
            for(var ii=0,bi=0; ii<ia.length && bi<ba.length; ){
                ia[ii++] =
                    ( bi < ba.length ? (ba[bi++]/*<< 0*/) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]  <<  8 ) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]  << 16 ) : 0 ) |
                        ( bi < ba.length ? (ba[bi++]  << 24 ) : 0 ) ;
            }
            return ia;
        }

    /////////////////////////////////////////////////////////////////////////////////////////////

        function trim( s ){
            var result = "";
            for ( var idx=0; idx<s.length; idx++ ){
                var c = s.charAt( idx );
                if ( c == "\s" || c == "\t" || c == "\r" || c == "\n" ) {
                } else {
                    result += c;
                }
            }
            return result;
        }

    /////////////////////////////////////////////////////////////////////////////////////////////

        function mktst( encode, decode ) {
            return function ( trial,from,to ) {
                var flg=true;
                for (var i=0; i<trial; i++) {
                    for (var j=from; j<to; j++) {
                        var arr = new Array(j);
                        for (var k=0; k<j; k++)
                            arr[k] = Math.floor( Math.random() * 256 );

                        var s = encode(arr);
                        var b = decode(s);

                        // trace( "in:"+arr.length);
                        // trace( "base64:"+s.length);
                        // trace( "out:"+b.length);
                        // trace( "in:"+arr);
                        // trace( "base64:"+s );
                        // trace( "out:"+b );
                        trace( "in :"+arr.length + ":"+ base16_encode(arr) );
                        trace( "b64:"+s.length+":"+s);
                        trace( "out:"+b.length + ":"+ base16_encode(arr) );
                        if ( equals( arr, b ) ) {
                            trace( "OK! ( " + i + "," + j + ")" );
                        } else {
                            trace( "ERR ( " + i + "," + j + ")" );
                            flg=false;
                        }
                        trace( "-----------");
                    }
                }
                if ( flg ) {
                    trace( "ALL OK! " );
                } else {
                    trace( "FOUND ERROR!" );
                }
            };
        }

    // export

    // base64
        packageRoot.base64_encode = base64_encode;
        packageRoot.base64_decode = base64_decode;
        packageRoot.base64_test   = mktst( base64_encode, base64_decode );

    // base64ex
        packageRoot.base64x_encode = base64x_encode;
        packageRoot.base64x_decode = base64x_decode;
        packageRoot.base64x_test   = mktst( base64x_encode, base64x_decode );

        packageRoot.base64x_pre_encode = base64x_pre_encode;
        packageRoot.base64x_pre_decode = base64x_pre_decode;

    // base16
        packageRoot.base16_encode = base16_encode;
        packageRoot.base16_decode = base16_decode;
        packageRoot.base16        = base16;
        packageRoot.hex           = base16;

    // utf8
        packageRoot.utf82str      = utf82str;
        packageRoot.str2utf8      = str2utf8;
        packageRoot.str2char      = str2char;
        packageRoot.char2str      = char2str;

    // byte expressions
        packageRoot.i2ba    = i2ba_be;
        packageRoot.ba2i    = ba2i_be;
        packageRoot.i2ba_be = i2ba_be;
        packageRoot.ba2i_be = ba2i_be;
        packageRoot.i2ba_le = i2ba_le;
        packageRoot.ba2i_le = ba2i_le;

        packageRoot.s2ba    = s2ba_be;
        packageRoot.ba2s    = ba2s_be;
        packageRoot.s2ba_be = s2ba_be;
        packageRoot.ba2s_be = ba2s_be;
        packageRoot.s2ba_le = s2ba_le;
        packageRoot.ba2s_le = ba2s_le;

        packageRoot.ba2ia    = ba2ia_be;
        packageRoot.ia2ba    = ia2ba_be;
        packageRoot.ia2ba_be = ia2ba_be;
        packageRoot.ba2ia_be = ba2ia_be;
        packageRoot.ia2ba_le = ia2ba_le;
        packageRoot.ba2ia_le = ba2ia_le;


    // arrays
        packageRoot.cmparr        = equals;
    }
    initBinary( self );

    /*
     * elapse.js
     * Simple performance profiling tool.
     * See elapse.readme.txt for further information.
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     */
    function init_elapse( packageRoot ) {
        var createElapsedTime = function(_name) {
            if ( packageRoot.__PACKAGE_ENABLED ) {
                __unit( "elapse.js" );
            }

            if ( _name==null ) {
                _name = "ElapsedTime";
            }
            return {
                n : _name,
                s : 0,
                e : 0,
                now : function() {
                    return new Date().getTime();
                },
                start : function( n ) {
                    if ( n != null ) {
                        this.n = n;
                    }
                    // this.n = n == null ? "ElapsedTime" : n;
                    this.s = this.now();
                },
                stop: function() {
                    this.e = this.now();
                    ElapsedTime.get_db( this.n ).push( this.get() );
                },
                print : function() {
                    trace( this.name() + " : " + ( this.get() / 1000 ) );
                },
                name : function() {
                    return this.n;
                },
                get : function() {
                    return this.e-this.s;
                }
            }
        };

        var ElapsedTime = createElapsedTime();
        ElapsedTime.db = {};
        ElapsedTime.db.prototype=null;
        ElapsedTime.get_db = function( name ) {
            var arr = this.db[ name ];
            if ( arr == null ) {
                arr =[];
                this.db[ name ] = arr;
            }
            return arr;
        };
        ElapsedTime.display = function( name ) {
            if ( name == null ) {
                var pure = []
                var arr =[];
                var i=0;
                for ( var n in this.db ) {
                    if ( pure[n] === undefined ) {
                        arr[i++] = n;
                    }
                }
                arr.sort();
                for ( var i=0;i<arr.length; i++ ){
                    ElapsedTime.display( arr[i] );
                }
            } else {
                var arr = ElapsedTime.get_db( name );
                var accum = 0;
                for ( var i=0; i<arr.length; i++ ) {
                    accum += arr[i];
                }
                trace( "ElapsedTime(" + name + " ): " + accum+ "/"+ arr.length + " AVG=" + ( accum / arr.length / 1000) );
            }
        };
        ElapsedTime.create = createElapsedTime;
        packageRoot.ElapsedTime = ElapsedTime;
    }
    init_elapse( self );

    /*
     * SecureRandom.js
     * A Secure Random Number Generator
     * See SecureRandom.readme.txt for further information.
     *
     * ACKNOWLEDGMENT
     *
     *     This library is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     * MODIFICATION
     *
     *     Some modifications are applied by Atsushi Oka
     *
     *     Atushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Object-Oriented Interface.
     */
    function initRNG( packages ) {
        __unit( "SecureRandom.js" );
        __uses( "packages.js" );

        /////////////////////////////////////////////
        // import
        /////////////////////////////////////////////
        // var Arcfour = __package( packages ).Arcfour;

        /////////////////////////////////////
        // implementation
        /////////////////////////////////////

        //
        // Arcfour
        //
        var Arcfour = function () {
            this.i = 0;
            this.j = 0;
            this.S = new Array();
        };

        // Initialize arcfour context from key, an array of ints, each from [0..255]
        Arcfour.prototype.init = function (key) {
            var i, j, t;
            for(i = 0; i < 256; ++i)
                this.S[i] = i;
            j = 0;
            for(i = 0; i < 256; ++i) {
                j = (j + this.S[i] + key[i % key.length]) & 255;
                t = this.S[i];
                this.S[i] = this.S[j];
                this.S[j] = t;
            }
            this.i = 0;
            this.j = 0;
        };

        Arcfour.prototype.next = function () {
            var t;
            this.i = (this.i + 1) & 255;
            this.j = (this.j + this.S[this.i]) & 255;
            t = this.S[this.i];
            this.S[this.i] = this.S[this.j];
            this.S[this.j] = t;
            return this.S[ ( t + this.S[this.i] ) & 255 ];
        };


        // Plug in your RNG constructor here
        Arcfour.create = function () {
            return new Arcfour();
        };

        // Pool size must be a multiple of 4 and greater than 32.
        // An array of bytes the size of the pool will be passed to init()
        Arcfour.rng_psize= 256;

        //
        // SecureRandom
        //

        var rng_state = null;
        var rng_pool = [];
        var rng_pptr = 0;

        // Mix in a 32-bit integer into the pool
        var rng_seed_int= function (x) {
            // FIXED 7 DEC,2008 http://oka.nu/
            // >>
            // rng_pool[rng_pptr++] ^= x & 255;
            // rng_pool[rng_pptr++] ^= (x >> 8) & 255;
            // rng_pool[rng_pptr++] ^= (x >> 16) & 255;
            // rng_pool[rng_pptr++] ^= (x >> 24) & 255;
            rng_pool[rng_pptr] ^= x & 255;
            rng_pptr++;
            rng_pool[rng_pptr] ^= (x >> 8) & 255;
            rng_pptr++;
            rng_pool[rng_pptr] ^= (x >> 16) & 255;
            rng_pptr++;
            rng_pool[rng_pptr] ^= (x >> 24) & 255;
            rng_pptr++;
            // <<
            if(rng_pptr >= Arcfour.rng_psize) rng_pptr -= Arcfour.rng_psize;
        };

        // Mix in the current time (w/milliseconds) into the pool
        var rng_seed_time= function () {
            rng_seed_int( new Date().getTime() );
        };

        // Initialize the pool with junk if needed.
        var pool_init= function () {
            var t;
            if ( navigator.appName == "Netscape" && navigator.appVersion < "5" && window.crypto ) {
                // Extract entropy (256 bits) from NS4 RNG if available
                var z = window.crypto.random(32);
                for(t = 0; t < z.length; ++t)
                    rng_pool[rng_pptr++] = z.charCodeAt(t) & 255;
            }
            while(rng_pptr < Arcfour.rng_psize) {  // extract some randomness from Math.random()
                t = Math.floor(65536 * Math.random());
                rng_pool[rng_pptr++] = t >>> 8;
                rng_pool[rng_pptr++] = t & 255;
            }
            rng_pptr = 0;
            rng_seed_time();
            //rng_seed_int(window.screenX);
            //rng_seed_int(window.screenY);
        };

        var rng_get_byte= function () {
            if ( rng_state == null ) {
                rng_seed_time();
                // rng_state = Arcfour.prng_newstate();
                rng_state = Arcfour.create();
                rng_state.init( rng_pool );
                for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
                    rng_pool[rng_pptr] = 0;
                rng_pptr = 0;
                //rng_pool = null;
            }
            // TODO: allow reseeding after first request
            return rng_state.next();
        };

        var SecureRandom = function () {
        };
        SecureRandom.prototype.nextBytes = function (ba) {
            for ( var i = 0; i < ba.length; ++i )
                ba[i] = rng_get_byte();
        };

        // initialize
        pool_init();

        ///////////////////////////////////////////
        // export
        ///////////////////////////////////////////
        // __package( packages, path ).RNG = RNG;
        // __package( packages, path ).SecureRandom = SecureRandom;
        __export( packages, "titaniumcore.crypto.SecureRandom", SecureRandom );
    };
    initRNG( self );

    /*
     * Cipher.js
     * A block-cipher algorithm implementation on JavaScript
     * See Cipher.readme.txt for further information.
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     *
     * ACKNOWLEDGMENT
     *
     *     The main subroutines are written by Michiel van Everdingen.
     *
     *     Michiel van Everdingen
     *     http://home.versatel.nl/MAvanEverdingen/index.html
     *
     *     All rights for these routines are reserved to Michiel van Everdingen.
     *
     */
    function initBlockCipher( packageRoot ) {
        __unit( "Cipher.js" );
        __uses( "packages.js" );

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Math
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var MAXINT = 0xFFFFFFFF;

        function rotb(b,n){ return ( b<<n | b>>>( 8-n) ) & 0xFF; }
        function rotw(w,n){ return ( w<<n | w>>>(32-n) ) & MAXINT; }
        function getW(a,i){ return a[i]|a[i+1]<<8|a[i+2]<<16|a[i+3]<<24; }
        function setW(a,i,w){ a.splice(i,4,w&0xFF,(w>>>8)&0xFF,(w>>>16)&0xFF,(w>>>24)&0xFF); }
        function setWInv(a,i,w){ a.splice(i,4,(w>>>24)&0xFF,(w>>>16)&0xFF,(w>>>8)&0xFF,w&0xFF); }
        function getB(x,n){ return (x>>>(n*8))&0xFF; }

        function getNrBits(i){ var n=0; while (i>0){ n++; i>>>=1; } return n; }
        function getMask(n){ return (1<<n)-1; }

    // added 2008/11/13 XXX MUST USE ONE-WAY HASH FUNCTION FOR SECURITY REASON
        function randByte() {
            return Math.floor( Math.random() * 256 );
        }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Ciphers
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        var ALGORITHMS = {};

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // AES
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function createRijndael() {
            //
            var keyBytes      = null;
            var dataBytes     = null;
            var dataOffset    = -1;
            // var dataLength    = -1;
            var algorithmName = null;
            //var idx2          = -1;
            //

            algorithmName = "rijndael"

            var aesNk;
            var aesNr;

            var aesPows;
            var aesLogs;
            var aesSBox;
            var aesSBoxInv;
            var aesRco;
            var aesFtable;
            var aesRtable;
            var aesFi;
            var aesRi;
            var aesFkey;
            var aesRkey;

            function aesMult(x, y){ return (x&&y) ? aesPows[(aesLogs[x]+aesLogs[y])%255]:0; }

            function aesPackBlock() {
                return [ getW(dataBytes,dataOffset), getW(dataBytes,dataOffset+4), getW(dataBytes,dataOffset+8), getW(dataBytes,dataOffset+12) ];
            }

            function aesUnpackBlock(packed){
                for ( var j=0; j<4; j++,dataOffset+=4) setW( dataBytes, dataOffset, packed[j] );
            }

            function aesXTime(p){
                p <<= 1;
                return p&0x100 ? p^0x11B : p;
            }

            function aesSubByte(w){
                return aesSBox[getB(w,0)] | aesSBox[getB(w,1)]<<8 | aesSBox[getB(w,2)]<<16 | aesSBox[getB(w,3)]<<24;
            }

            function aesProduct(w1,w2){
                return aesMult(getB(w1,0),getB(w2,0)) ^ aesMult(getB(w1,1),getB(w2,1))
                    ^ aesMult(getB(w1,2),getB(w2,2)) ^ aesMult(getB(w1,3),getB(w2,3));
            }

            function aesInvMixCol(x){
                return aesProduct(0x090d0b0e,x)     | aesProduct(0x0d0b0e09,x)<<8 |
                    aesProduct(0x0b0e090d,x)<<16 | aesProduct(0x0e090d0b,x)<<24;
            }

            function aesByteSub(x){
                var y=aesPows[255-aesLogs[x]];
                x=y;  x=rotb(x,1);
                y^=x; x=rotb(x,1);
                y^=x; x=rotb(x,1);
                y^=x; x=rotb(x,1);
                return x^y^0x63;
            }

            function aesGenTables(){
                var i,y;
                aesPows = [ 1,3 ];
                aesLogs = [ 0,0,null,1 ];
                aesSBox = new Array(256);
                aesSBoxInv = new Array(256);
                aesFtable = new Array(256);
                aesRtable = new Array(256);
                aesRco = new Array(30);

                for ( i=2; i<256; i++){
                    aesPows[i]=aesPows[i-1]^aesXTime( aesPows[i-1] );
                    aesLogs[aesPows[i]]=i;
                }

                aesSBox[0]=0x63;
                aesSBoxInv[0x63]=0;
                for ( i=1; i<256; i++){
                    y=aesByteSub(i);
                    aesSBox[i]=y; aesSBoxInv[y]=i;
                }

                for (i=0,y=1; i<30; i++){ aesRco[i]=y; y=aesXTime(y); }

                for ( i=0; i<256; i++){
                    y = aesSBox[i];
                    aesFtable[i] = aesXTime(y) | y<<8 | y<<16 | (y^aesXTime(y))<<24;
                    y = aesSBoxInv[i];
                    aesRtable[i]= aesMult(14,y) | aesMult(9,y)<<8 |
                        aesMult(13,y)<<16 | aesMult(11,y)<<24;
                }
            }

            function aesInit( key ){
                keyBytes = key;
                keyBytes=keyBytes.slice(0,32);
                var i,k,m;
                var j = 0;
                var l = keyBytes.length;

                while ( l!=16 && l!=24 && l!=32 ) keyBytes[l++]=keyBytes[j++];
                aesGenTables();

                aesNk = keyBytes.length >>> 2;
                aesNr = 6 + aesNk;

                var N=4*(aesNr+1);

                aesFi = new Array(12);
                aesRi = new Array(12);
                aesFkey = new Array(N);
                aesRkey = new Array(N);

                for (m=j=0;j<4;j++,m+=3){
                    aesFi[m]=(j+1)%4;
                    aesFi[m+1]=(j+2)%4;
                    aesFi[m+2]=(j+3)%4;
                    aesRi[m]=(4+j-1)%4;
                    aesRi[m+1]=(4+j-2)%4;
                    aesRi[m+2]=(4+j-3)%4;
                }

                for (i=j=0;i<aesNk;i++,j+=4) aesFkey[i]=getW(keyBytes,j);

                for (k=0,j=aesNk;j<N;j+=aesNk,k++){
                    aesFkey[j]=aesFkey[j-aesNk]^aesSubByte(rotw(aesFkey[j-1], 24))^aesRco[k];
                    if (aesNk<=6)
                        for (i=1;i<aesNk && (i+j)<N;i++) aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];
                    else{
                        for (i=1;i<4 &&(i+j)<N;i++) aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];
                        if ((j+4)<N) aesFkey[j+4]=aesFkey[j+4-aesNk]^aesSubByte(aesFkey[j+3]);
                        for (i=5;i<aesNk && (i+j)<N;i++) aesFkey[i+j]=aesFkey[i+j-aesNk]^aesFkey[i+j-1];
                    }
                }

                for (j=0;j<4;j++) aesRkey[j+N-4]=aesFkey[j];
                for (i=4;i<N-4;i+=4){
                    k=N-4-i;
                    for (j=0;j<4;j++) aesRkey[k+j]=aesInvMixCol(aesFkey[i+j]);
                }
                for (j=N-4;j<N;j++) aesRkey[j-N+4]=aesFkey[j];
            }

            function aesClose(){
                aesPows=aesLogs=aesSBox=aesSBoxInv=aesRco=null;
                aesFtable=aesRtable=aesFi=aesRi=aesFkey=aesRkey=null;
            }

            function aesRounds( block, key, table, inc, box ){
                var tmp = new Array( 4 );
                var i,j,m,r;

                for ( r=0; r<4; r++ ) block[r]^=key[r];
                for ( i=1; i<aesNr; i++ ){
                    for (j=m=0;j<4;j++,m+=3){
                        tmp[j]=key[r++]^table[block[j]&0xFF]^
                            rotw(table[(block[inc[m]]>>>8)&0xFF], 8)^
                            rotw(table[(block[inc[m+1]]>>>16)&0xFF], 16)^
                            rotw(table[(block[inc[m+2]]>>>24)&0xFF], 24);
                    }
                    var t=block; block=tmp; tmp=t;
                }

                for (j=m=0;j<4;j++,m+=3)
                    tmp[j]=key[r++]^box[block[j]&0xFF]^
                        rotw(box[(block[inc[m  ]]>>> 8)&0xFF], 8)^
                        rotw(box[(block[inc[m+1]]>>>16)&0xFF],16)^
                        rotw(box[(block[inc[m+2]]>>>24)&0xFF],24);
                return tmp;
            }

            function aesEncrypt( data,offset ){
                dataBytes = data;
                dataOffset = offset;
                aesUnpackBlock( aesRounds( aesPackBlock(), aesFkey, aesFtable, aesFi, aesSBox ) );
            }

            function aesDecrypt( data,offset){
                dataBytes = data;
                dataOffset = offset;
                aesUnpackBlock( aesRounds(aesPackBlock(), aesRkey, aesRtable, aesRi, aesSBoxInv ) );
            }

            return {
                name    : "rijndael",
                blocksize : 128/8,
                open    : aesInit,
                close   : aesClose,
                encrypt : aesEncrypt,
                decrypt : aesDecrypt
            };
        }
        ALGORITHMS.RIJNDAEL = {
            create : createRijndael
        };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Serpent
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        function createSerpent() {
            //
            var keyBytes      = null;
            var dataBytes     = null;
            var dataOffset    = -1;
            //var dataLength    = -1;
            var algorithmName = null;
            // var idx2          = -1;
            //

            algorithmName = "serpent";

            var srpKey=[];

            function srpK(r,a,b,c,d,i){
                r[a]^=srpKey[4*i]; r[b]^=srpKey[4*i+1]; r[c]^=srpKey[4*i+2]; r[d]^=srpKey[4*i+3];
            }

            function srpLK(r,a,b,c,d,e,i){
                r[a]=rotw(r[a],13);r[c]=rotw(r[c],3);r[b]^=r[a];r[e]=(r[a]<<3)&MAXINT;
                r[d]^=r[c];r[b]^=r[c];r[b]=rotw(r[b],1);r[d]^=r[e];r[d]=rotw(r[d],7);r[e]=r[b];
                r[a]^=r[b];r[e]=(r[e]<<7)&MAXINT;r[c]^=r[d];r[a]^=r[d];r[c]^=r[e];r[d]^=srpKey[4*i+3];
                r[b]^=srpKey[4*i+1];r[a]=rotw(r[a],5);r[c]=rotw(r[c],22);r[a]^=srpKey[4*i+0];r[c]^=srpKey[4*i+2];
            }

            function srpKL(r,a,b,c,d,e,i){
                r[a]^=srpKey[4*i+0];r[b]^=srpKey[4*i+1];r[c]^=srpKey[4*i+2];r[d]^=srpKey[4*i+3];
                r[a]=rotw(r[a],27);r[c]=rotw(r[c],10);r[e]=r[b];r[c]^=r[d];r[a]^=r[d];r[e]=(r[e]<<7)&MAXINT;
                r[a]^=r[b];r[b]=rotw(r[b],31);r[c]^=r[e];r[d]=rotw(r[d],25);r[e]=(r[a]<<3)&MAXINT;
                r[b]^=r[a];r[d]^=r[e];r[a]=rotw(r[a],19);r[b]^=r[c];r[d]^=r[c];r[c]=rotw(r[c],29);
            }

            var srpS=[
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x3];r[x3]|=r[x0];r[x0]^=r[x4];r[x4]^=r[x2];r[x4]=~r[x4];r[x3]^=r[x1];
                    r[x1]&=r[x0];r[x1]^=r[x4];r[x2]^=r[x0];r[x0]^=r[x3];r[x4]|=r[x0];r[x0]^=r[x2];
                    r[x2]&=r[x1];r[x3]^=r[x2];r[x1]=~r[x1];r[x2]^=r[x4];r[x1]^=r[x2];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x1];r[x1]^=r[x0];r[x0]^=r[x3];r[x3]=~r[x3];r[x4]&=r[x1];r[x0]|=r[x1];
                    r[x3]^=r[x2];r[x0]^=r[x3];r[x1]^=r[x3];r[x3]^=r[x4];r[x1]|=r[x4];r[x4]^=r[x2];
                    r[x2]&=r[x0];r[x2]^=r[x1];r[x1]|=r[x0];r[x0]=~r[x0];r[x0]^=r[x2];r[x4]^=r[x1];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x3]=~r[x3];r[x1]^=r[x0];r[x4]=r[x0];r[x0]&=r[x2];r[x0]^=r[x3];r[x3]|=r[x4];
                    r[x2]^=r[x1];r[x3]^=r[x1];r[x1]&=r[x0];r[x0]^=r[x2];r[x2]&=r[x3];r[x3]|=r[x1];
                    r[x0]=~r[x0];r[x3]^=r[x0];r[x4]^=r[x0];r[x0]^=r[x2];r[x1]|=r[x2];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x1];r[x1]^=r[x3];r[x3]|=r[x0];r[x4]&=r[x0];r[x0]^=r[x2];r[x2]^=r[x1];r[x1]&=r[x3];
                    r[x2]^=r[x3];r[x0]|=r[x4];r[x4]^=r[x3];r[x1]^=r[x0];r[x0]&=r[x3];r[x3]&=r[x4];
                    r[x3]^=r[x2];r[x4]|=r[x1];r[x2]&=r[x1];r[x4]^=r[x3];r[x0]^=r[x3];r[x3]^=r[x2];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x3];r[x3]&=r[x0];r[x0]^=r[x4];r[x3]^=r[x2];r[x2]|=r[x4];r[x0]^=r[x1];
                    r[x4]^=r[x3];r[x2]|=r[x0];r[x2]^=r[x1];r[x1]&=r[x0];r[x1]^=r[x4];r[x4]&=r[x2];
                    r[x2]^=r[x3];r[x4]^=r[x0];r[x3]|=r[x1];r[x1]=~r[x1];r[x3]^=r[x0];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x1];r[x1]|=r[x0];r[x2]^=r[x1];r[x3]=~r[x3];r[x4]^=r[x0];r[x0]^=r[x2];
                    r[x1]&=r[x4];r[x4]|=r[x3];r[x4]^=r[x0];r[x0]&=r[x3];r[x1]^=r[x3];r[x3]^=r[x2];
                    r[x0]^=r[x1];r[x2]&=r[x4];r[x1]^=r[x2];r[x2]&=r[x0];r[x3]^=r[x2];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x1];r[x3]^=r[x0];r[x1]^=r[x2];r[x2]^=r[x0];r[x0]&=r[x3];r[x1]|=r[x3];
                    r[x4]=~r[x4];r[x0]^=r[x1];r[x1]^=r[x2];r[x3]^=r[x4];r[x4]^=r[x0];r[x2]&=r[x0];
                    r[x4]^=r[x1];r[x2]^=r[x3];r[x3]&=r[x1];r[x3]^=r[x0];r[x1]^=r[x2];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x1]=~r[x1];r[x4]=r[x1];r[x0]=~r[x0];r[x1]&=r[x2];r[x1]^=r[x3];r[x3]|=r[x4];r[x4]^=r[x2];
                    r[x2]^=r[x3];r[x3]^=r[x0];r[x0]|=r[x1];r[x2]&=r[x0];r[x0]^=r[x4];r[x4]^=r[x3];
                    r[x3]&=r[x0];r[x4]^=r[x1];r[x2]^=r[x4];r[x3]^=r[x1];r[x4]|=r[x0];r[x4]^=r[x1];
                }];

            var srpSI=[
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x3];r[x1]^=r[x0];r[x3]|=r[x1];r[x4]^=r[x1];r[x0]=~r[x0];r[x2]^=r[x3];
                    r[x3]^=r[x0];r[x0]&=r[x1];r[x0]^=r[x2];r[x2]&=r[x3];r[x3]^=r[x4];r[x2]^=r[x3];
                    r[x1]^=r[x3];r[x3]&=r[x0];r[x1]^=r[x0];r[x0]^=r[x2];r[x4]^=r[x3];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x1]^=r[x3];r[x4]=r[x0];r[x0]^=r[x2];r[x2]=~r[x2];r[x4]|=r[x1];r[x4]^=r[x3];
                    r[x3]&=r[x1];r[x1]^=r[x2];r[x2]&=r[x4];r[x4]^=r[x1];r[x1]|=r[x3];r[x3]^=r[x0];
                    r[x2]^=r[x0];r[x0]|=r[x4];r[x2]^=r[x4];r[x1]^=r[x0];r[x4]^=r[x1];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x2]^=r[x1];r[x4]=r[x3];r[x3]=~r[x3];r[x3]|=r[x2];r[x2]^=r[x4];r[x4]^=r[x0];
                    r[x3]^=r[x1];r[x1]|=r[x2];r[x2]^=r[x0];r[x1]^=r[x4];r[x4]|=r[x3];r[x2]^=r[x3];
                    r[x4]^=r[x2];r[x2]&=r[x1];r[x2]^=r[x3];r[x3]^=r[x4];r[x4]^=r[x0];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x2]^=r[x1];r[x4]=r[x1];r[x1]&=r[x2];r[x1]^=r[x0];r[x0]|=r[x4];r[x4]^=r[x3];
                    r[x0]^=r[x3];r[x3]|=r[x1];r[x1]^=r[x2];r[x1]^=r[x3];r[x0]^=r[x2];r[x2]^=r[x3];
                    r[x3]&=r[x1];r[x1]^=r[x0];r[x0]&=r[x2];r[x4]^=r[x3];r[x3]^=r[x0];r[x0]^=r[x1];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x2]^=r[x3];r[x4]=r[x0];r[x0]&=r[x1];r[x0]^=r[x2];r[x2]|=r[x3];r[x4]=~r[x4];
                    r[x1]^=r[x0];r[x0]^=r[x2];r[x2]&=r[x4];r[x2]^=r[x0];r[x0]|=r[x4];r[x0]^=r[x3];
                    r[x3]&=r[x2];r[x4]^=r[x3];r[x3]^=r[x1];r[x1]&=r[x0];r[x4]^=r[x1];r[x0]^=r[x3];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x1];r[x1]|=r[x2];r[x2]^=r[x4];r[x1]^=r[x3];r[x3]&=r[x4];r[x2]^=r[x3];r[x3]|=r[x0];
                    r[x0]=~r[x0];r[x3]^=r[x2];r[x2]|=r[x0];r[x4]^=r[x1];r[x2]^=r[x4];r[x4]&=r[x0];r[x0]^=r[x1];
                    r[x1]^=r[x3];r[x0]&=r[x2];r[x2]^=r[x3];r[x0]^=r[x2];r[x2]^=r[x4];r[x4]^=r[x3];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x0]^=r[x2];r[x4]=r[x0];r[x0]&=r[x3];r[x2]^=r[x3];r[x0]^=r[x2];r[x3]^=r[x1];
                    r[x2]|=r[x4];r[x2]^=r[x3];r[x3]&=r[x0];r[x0]=~r[x0];r[x3]^=r[x1];r[x1]&=r[x2];
                    r[x4]^=r[x0];r[x3]^=r[x4];r[x4]^=r[x2];r[x0]^=r[x1];r[x2]^=r[x0];
                },
                function(r,x0,x1,x2,x3,x4){
                    r[x4]=r[x3];r[x3]&=r[x0];r[x0]^=r[x2];r[x2]|=r[x4];r[x4]^=r[x1];r[x0]=~r[x0];r[x1]|=r[x3];
                    r[x4]^=r[x0];r[x0]&=r[x2];r[x0]^=r[x1];r[x1]&=r[x2];r[x3]^=r[x2];r[x4]^=r[x3];
                    r[x2]&=r[x3];r[x3]|=r[x0];r[x1]^=r[x4];r[x3]^=r[x4];r[x4]&=r[x0];r[x4]^=r[x2];
                }];

            var srpKc=[7788,63716,84032,7891,78949,25146,28835,67288,84032,40055,7361,1940,77639,27525,24193,75702,
                7361,35413,83150,82383,58619,48468,18242,66861,83150,69667,7788,31552,40054,23222,52496,57565,7788,63716];
            var srpEc=[44255,61867,45034,52496,73087,56255,43827,41448,18242,1939,18581,56255,64584,31097,26469,
                77728,77639,4216,64585,31097,66861,78949,58006,59943,49676,78950,5512,78949,27525,52496,18670,76143];
            var srpDc=[44255,60896,28835,1837,1057,4216,18242,77301,47399,53992,1939,1940,66420,39172,78950,
                45917,82383,7450,67288,26469,83149,57565,66419,47400,58006,44254,18581,18228,33048,45034,66508,7449];

            function srpInit(key)
            {
                keyBytes = key;
                var i,j,m,n;
                function keyIt(a,b,c,d,i){ srpKey[i]=r[b]=rotw(srpKey[a]^r[b]^r[c]^r[d]^0x9e3779b9^i,11); }
                function keyLoad(a,b,c,d,i){ r[a]=srpKey[i]; r[b]=srpKey[i+1]; r[c]=srpKey[i+2]; r[d]=srpKey[i+3]; }
                function keyStore(a,b,c,d,i){ srpKey[i]=r[a]; srpKey[i+1]=r[b]; srpKey[i+2]=r[c]; srpKey[i+3]=r[d]; }

                keyBytes.reverse();
                keyBytes[keyBytes.length]=1; while (keyBytes.length<32) keyBytes[keyBytes.length]=0;
                for (i=0; i<8; i++){
                    srpKey[i] = (keyBytes[4*i+0] & 0xff)       | (keyBytes[4*i+1] & 0xff) <<  8 |
                        (keyBytes[4*i+2] & 0xff) << 16 | (keyBytes[4*i+3] & 0xff) << 24;
                }

                var r = [srpKey[3],srpKey[4],srpKey[5],srpKey[6],srpKey[7]];

                i=0; j=0;
                while (keyIt(j++,0,4,2,i++),keyIt(j++,1,0,3,i++),i<132){
                    keyIt(j++,2,1,4,i++); if (i==8){j=0;}
                    keyIt(j++,3,2,0,i++); keyIt(j++,4,3,1,i++);
                }

                i=128; j=3; n=0;
                while(m=srpKc[n++],srpS[j++%8](r,m%5,m%7,m%11,m%13,m%17),m=srpKc[n],keyStore(m%5,m%7,m%11,m%13,i),i>0){
                    i-=4; keyLoad(m%5,m%7,m%11,m%13,i);
                }
            }

            function srpClose(){
                srpKey=[];
            }

            function srpEncrypt( data,offset)
            {
                dataBytes = data;
                dataOffset = offset;
                var blk = dataBytes.slice(dataOffset,dataOffset+16); blk.reverse();
                var r=[getW(blk,0),getW(blk,4),getW(blk,8),getW(blk,12)];

                srpK(r,0,1,2,3,0);
                var n=0, m=srpEc[n];
                while (srpS[n%8](r,m%5,m%7,m%11,m%13,m%17),n<31){ m=srpEc[++n]; srpLK(r,m%5,m%7,m%11,m%13,m%17,n); }
                srpK(r,0,1,2,3,32);

                for (var j=3; j>=0; j--,dataOffset+=4) setWInv(dataBytes,dataOffset,r[j]);
            }

            function srpDecrypt(data,offset)
            {
                dataBytes = data;
                dataOffset = offset;
                var blk = dataBytes.slice(dataOffset,dataOffset+16); blk.reverse();
                var r=[getW(blk,0),getW(blk,4),getW(blk,8),getW(blk,12)];

                srpK(r,0,1,2,3,32);
                var n=0, m=srpDc[n];
                while (srpSI[7-n%8](r,m%5,m%7,m%11,m%13,m%17),n<31){ m=srpDc[++n]; srpKL(r,m%5,m%7,m%11,m%13,m%17,32-n); }
                srpK(r,2,3,1,4,0);

                setWInv(dataBytes,dataOffset,r[4]); setWInv(dataBytes,dataOffset+4,r[1]); setWInv(dataBytes,dataOffset+8,r[3]); setWInv(dataBytes,dataOffset+12,r[2]);
                dataOffset+=16;
            }

            return {
                name    : "serpent",
                blocksize : 128/8,
                open    : srpInit,
                close   : srpClose,
                encrypt : srpEncrypt,
                decrypt : srpDecrypt
            };
        }
        ALGORITHMS.SERPENT = {
            create : createSerpent
        };


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Twofish
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function createTwofish() {
            //
            var keyBytes      = null;
            var dataBytes     = null;
            var dataOffset    = -1;
            // var dataLength    = -1;
            var algorithmName = null;
            // var idx2          = -1;
            //

            algorithmName = "twofish";

            var tfsKey=[];
            var tfsM=[[],[],[],[]];

            function tfsInit(key)
            {
                keyBytes = key;
                var  i, a, b, c, d, meKey=[], moKey=[], inKey=[];
                var kLen;
                var sKey=[];
                var  f01, f5b, fef;

                var q0=[[8,1,7,13,6,15,3,2,0,11,5,9,14,12,10,4],[2,8,11,13,15,7,6,14,3,1,9,4,0,10,12,5]];
                var q1=[[14,12,11,8,1,2,3,5,15,4,10,6,7,0,9,13],[1,14,2,11,4,12,3,7,6,13,10,5,15,9,0,8]];
                var q2=[[11,10,5,14,6,13,9,0,12,8,15,3,2,4,7,1],[4,12,7,5,1,6,9,10,0,14,13,8,2,11,3,15]];
                var q3=[[13,7,15,4,1,2,6,14,9,11,3,0,8,5,12,10],[11,9,5,1,12,3,13,14,6,4,7,15,2,0,8,10]];
                var ror4=[0,8,1,9,2,10,3,11,4,12,5,13,6,14,7,15];
                var ashx=[0,9,2,11,4,13,6,15,8,1,10,3,12,5,14,7];
                var q=[[],[]];
                var m=[[],[],[],[]];

                function ffm5b(x){ return x^(x>>2)^[0,90,180,238][x&3]; }
                function ffmEf(x){ return x^(x>>1)^(x>>2)^[0,238,180,90][x&3]; }

                function mdsRem(p,q){
                    var i,t,u;
                    for(i=0; i<8; i++){
                        t = q>>>24;
                        q = ((q<<8)&MAXINT) | p>>>24;
                        p = (p<<8)&MAXINT;
                        u = t<<1; if (t&128){ u^=333; }
                        q ^= t^(u<<16);
                        u ^= t>>>1; if (t&1){ u^=166; }
                        q ^= u<<24 | u<<8;
                    }
                    return q;
                }

                function qp(n,x){
                    var a,b,c,d;
                    a=x>>4; b=x&15;
                    c=q0[n][a^b]; d=q1[n][ror4[b]^ashx[a]];
                    return q3[n][ror4[d]^ashx[c]]<<4 | q2[n][c^d];
                }

                function hFun(x,key){
                    var a=getB(x,0), b=getB(x,1), c=getB(x,2), d=getB(x,3);
                    switch(kLen){
                        case 4:
                            a = q[1][a]^getB(key[3],0);
                            b = q[0][b]^getB(key[3],1);
                            c = q[0][c]^getB(key[3],2);
                            d = q[1][d]^getB(key[3],3);
                        case 3:
                            a = q[1][a]^getB(key[2],0);
                            b = q[1][b]^getB(key[2],1);
                            c = q[0][c]^getB(key[2],2);
                            d = q[0][d]^getB(key[2],3);
                        case 2:
                            a = q[0][q[0][a]^getB(key[1],0)]^getB(key[0],0);
                            b = q[0][q[1][b]^getB(key[1],1)]^getB(key[0],1);
                            c = q[1][q[0][c]^getB(key[1],2)]^getB(key[0],2);
                            d = q[1][q[1][d]^getB(key[1],3)]^getB(key[0],3);
                    }
                    return m[0][a]^m[1][b]^m[2][c]^m[3][d];
                }

                keyBytes=keyBytes.slice(0,32); i=keyBytes.length;
                while ( i!=16 && i!=24 && i!=32 ) keyBytes[i++]=0;

                for (i=0; i<keyBytes.length; i+=4){ inKey[i>>2]=getW(keyBytes,i); }
                for (i=0; i<256; i++){ q[0][i]=qp(0,i); q[1][i]=qp(1,i); }
                for (i=0; i<256; i++){
                    f01 = q[1][i]; f5b = ffm5b(f01); fef = ffmEf(f01);
                    m[0][i] = f01 + (f5b<<8) + (fef<<16) + (fef<<24);
                    m[2][i] = f5b + (fef<<8) + (f01<<16) + (fef<<24);
                    f01 = q[0][i]; f5b = ffm5b(f01); fef = ffmEf(f01);
                    m[1][i] = fef + (fef<<8) + (f5b<<16) + (f01<<24);
                    m[3][i] = f5b + (f01<<8) + (fef<<16) + (f5b<<24);
                }

                kLen = inKey.length/2;
                for (i=0; i<kLen; i++){
                    a = inKey[i+i];   meKey[i] = a;
                    b = inKey[i+i+1]; moKey[i] = b;
                    sKey[kLen-i-1] = mdsRem(a,b);
                }
                for (i=0; i<40; i+=2){
                    a=0x1010101*i; b=a+0x1010101;
                    a=hFun(a,meKey);
                    b=rotw(hFun(b,moKey),8);
                    tfsKey[i]=(a+b)&MAXINT;
                    tfsKey[i+1]=rotw(a+2*b,9);
                }
                for (i=0; i<256; i++){
                    a=b=c=d=i;
                    switch(kLen){
                        case 4:
                            a = q[1][a]^getB(sKey[3],0);
                            b = q[0][b]^getB(sKey[3],1);
                            c = q[0][c]^getB(sKey[3],2);
                            d = q[1][d]^getB(sKey[3],3);
                        case 3:
                            a = q[1][a]^getB(sKey[2],0);
                            b = q[1][b]^getB(sKey[2],1);
                            c = q[0][c]^getB(sKey[2],2);
                            d = q[0][d]^getB(sKey[2],3);
                        case 2:
                            tfsM[0][i] = m[0][q[0][q[0][a]^getB(sKey[1],0)]^getB(sKey[0],0)];
                            tfsM[1][i] = m[1][q[0][q[1][b]^getB(sKey[1],1)]^getB(sKey[0],1)];
                            tfsM[2][i] = m[2][q[1][q[0][c]^getB(sKey[1],2)]^getB(sKey[0],2)];
                            tfsM[3][i] = m[3][q[1][q[1][d]^getB(sKey[1],3)]^getB(sKey[0],3)];
                    }
                }
            }

            function tfsG0(x){ return tfsM[0][getB(x,0)]^tfsM[1][getB(x,1)]^tfsM[2][getB(x,2)]^tfsM[3][getB(x,3)]; }
            function tfsG1(x){ return tfsM[0][getB(x,3)]^tfsM[1][getB(x,0)]^tfsM[2][getB(x,1)]^tfsM[3][getB(x,2)]; }

            function tfsFrnd(r,blk){
                var a=tfsG0(blk[0]); var b=tfsG1(blk[1]);
                blk[2] = rotw( blk[2]^(a+b+tfsKey[4*r+8])&MAXINT, 31 );
                blk[3] = rotw(blk[3],1) ^ (a+2*b+tfsKey[4*r+9])&MAXINT;
                a=tfsG0(blk[2]); b=tfsG1(blk[3]);
                blk[0] = rotw( blk[0]^(a+b+tfsKey[4*r+10])&MAXINT, 31 );
                blk[1] = rotw(blk[1],1) ^ (a+2*b+tfsKey[4*r+11])&MAXINT;
            }

            function tfsIrnd(i,blk){
                var a=tfsG0(blk[0]); var b=tfsG1(blk[1]);
                blk[2] = rotw(blk[2],1) ^ (a+b+tfsKey[4*i+10])&MAXINT;
                blk[3] = rotw( blk[3]^(a+2*b+tfsKey[4*i+11])&MAXINT, 31 );
                a=tfsG0(blk[2]); b=tfsG1(blk[3]);
                blk[0] = rotw(blk[0],1) ^ (a+b+tfsKey[4*i+8])&MAXINT;
                blk[1] = rotw( blk[1]^(a+2*b+tfsKey[4*i+9])&MAXINT, 31 );
            }

            function tfsClose(){
                tfsKey=[];
                tfsM=[[],[],[],[]];
            }

            function tfsEncrypt( data,offset){
                dataBytes = data;
                dataOffset = offset;
                var blk=[getW(dataBytes,dataOffset)^tfsKey[0], getW(dataBytes,dataOffset+4)^tfsKey[1], getW(dataBytes,dataOffset+8)^tfsKey[2], getW(dataBytes,dataOffset+12)^tfsKey[3]];
                for (var j=0;j<8;j++){ tfsFrnd(j,blk); }
                setW(dataBytes,dataOffset   ,blk[2]^tfsKey[4]);
                setW(dataBytes,dataOffset+ 4,blk[3]^tfsKey[5]);
                setW(dataBytes,dataOffset+ 8,blk[0]^tfsKey[6]);
                setW(dataBytes,dataOffset+12,blk[1]^tfsKey[7]);
                dataOffset+=16;
            }

            function tfsDecrypt(data,offset){
                dataBytes = data;
                dataOffset = offset;
                var blk=[getW(dataBytes,dataOffset)^tfsKey[4], getW(dataBytes,dataOffset+4)^tfsKey[5], getW(dataBytes,dataOffset+8)^tfsKey[6], getW(dataBytes,dataOffset+12)^tfsKey[7]];
                for (var j=7;j>=0;j--){ tfsIrnd(j,blk); }
                setW(dataBytes,dataOffset   ,blk[2]^tfsKey[0]);
                setW(dataBytes,dataOffset+ 4,blk[3]^tfsKey[1]);
                setW(dataBytes,dataOffset+ 8,blk[0]^tfsKey[2]);
                setW(dataBytes,dataOffset+12,blk[1]^tfsKey[3]);
                dataOffset+=16;
            }

            return {
                name    : "twofish",
                blocksize : 128/8,
                open    : tfsInit,
                close   : tfsClose,
                encrypt : tfsEncrypt,
                decrypt : tfsDecrypt
            };
        }
        ALGORITHMS.TWOFISH  = {
            create : createTwofish
        };




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BLOCK CIPHER MODES
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var MODES = {};

        function createECB() {
            function encryptOpenECB() {
                this.algorithm.open( this.keyBytes );
                this.dataLength = this.dataBytes.length;
                this.dataOffset=0;
                // idx2=0;
                return;
            }

            function encryptCloseECB() {
                this.algorithm.close();
            }
            function encryptProcECB(){
                this.algorithm.encrypt( this.dataBytes, this.dataOffset );
                this.dataOffset += this.algorithm.blocksize;
                if (this.dataLength<=this.dataOffset) {
                    return 0;
                } else {
                    return this.dataLength-this.dataOffset;
                }
            }
            function decryptOpenECB() {
                this.algorithm.open( this.keyBytes );
                // this.dataLength = dataBytes.length;
                this.dataLength = this.dataBytes.length;
                this.dataOffset=0;
                // idx2=0;
                return;
            }

            function decryptProcECB(){
                this.algorithm.decrypt( this.dataBytes, this.dataOffset );
                this.dataOffset += this.algorithm.blocksize;
                if ( this.dataLength<=this.dataOffset ){
                    return 0;
                } else {
                    return this.dataLength-this.dataOffset;
                }
            }
            function decryptCloseECB() {
                this.algorithm.close();

                // ???
                while( this.dataBytes[this.dataBytes.length-1] ==0 )
                    this.dataBytes.pop();
                // while( dataBytes[dataBytes.length-1] ==0 )
                //     dataBytes.pop();
            }

            return {
                encrypt : {
                    open  : encryptOpenECB,
                    exec  : encryptProcECB,
                    close : encryptCloseECB
                },
                decrypt : {
                    open  : decryptOpenECB,
                    exec  : decryptProcECB,
                    close : decryptCloseECB
                }
            };
        }
        MODES.ECB = createECB();


        function createCBC() {
            function encryptOpenCBC() {
                this.algorithm.open( this.keyBytes );
                this.dataBytes.unshift(
                    randByte(),randByte(),randByte(),randByte(),   randByte(),randByte(),randByte(),randByte(),
                    randByte(),randByte(),randByte(),randByte(),   randByte(),randByte(),randByte(),randByte()
                );
                this.dataLength = this.dataBytes.length;
                this.dataOffset=16;
                // idx2=0;
                return;
            }
            function encryptProcCBC(){
                for (var idx2=this.dataOffset; idx2<this.dataOffset+16; idx2++)
                    this.dataBytes[idx2] ^= this.dataBytes[idx2-16];
                this.algorithm.encrypt( this.dataBytes, this.dataOffset );
                this.dataOffset += this.algorithm.blocksize;

                if (this.dataLength<=this.dataOffset) {
                    return 0;
                } else {
                    return this.dataLength-this.dataOffset;
                }
            }
            function encryptCloseCBC() {
                this.algorithm.close();
            }

            function decryptOpenCBC() {
                this.algorithm.open( this.keyBytes );
                this.dataLength = this.dataBytes.length;

                // notice it start from dataOffset:16
                this.dataOffset=16;

                // added 2008/12/31
                // 1. Create a new field for initialization vector.
                // 2. Get initialized vector and store it on the new field.
                this.iv = this.dataBytes.slice(0,16);

                // idx2=0;
                return;
            }

            // function decryptProcCBC(){
            //     this.dataOffset=this.dataLength-this.dataOffset;
            //
            //     this.algorithm.decrypt( this.dataBytes, this.dataOffset );
            //     this.dataOffset += this.algorithm.blocksize;
            //
            //     for (var idx2=this.dataOffset-16; idx2<this.dataOffset; idx2++)
            //         this.dataBytes[idx2] ^= this.dataBytes[idx2-16];
            //
            //     this.dataOffset = this.dataLength+32-this.dataOffset;
            //
            //     if ( this.dataLength<=this.dataOffset ){
            //         return 0;
            //     } else {
            //         return this.dataLength-this.dataOffset;
            //     }
            // }

            function decryptProcCBC(){
                // copy cipher text for later use of initialization vector.
                var iv2 = this.dataBytes.slice( this.dataOffset, this.dataOffset + 16 );
                // decryption
                this.algorithm.decrypt( this.dataBytes, this.dataOffset );
                // xor with the current initialization vector.
                for ( var ii=0; ii<16; ii++ )
                    this.dataBytes[this.dataOffset+ii] ^= this.iv[ii];

                // advance the index counter.
                this.dataOffset += this.algorithm.blocksize;
                // set the copied previous cipher text as the current initialization vector.
                this.iv = iv2;

                if ( this.dataLength<=this.dataOffset ){
                    return 0;
                } else {
                    return this.dataLength-this.dataOffset;
                }
            }
            function decryptCloseCBC() {
                this.algorithm.close();
                // trace( "splice.before:"+base16( this.dataBytes ) );
                this.dataBytes.splice(0,16);
                // trace( "splice.after:"+base16( this.dataBytes ) );

                // ???
                while( this.dataBytes[this.dataBytes.length-1] ==0 )
                    this.dataBytes.pop();
            }

            return {
                encrypt : {
                    open  : encryptOpenCBC,
                    exec  : encryptProcCBC,
                    close : encryptCloseCBC
                },
                decrypt : {
                    open  : decryptOpenCBC,
                    exec  : decryptProcCBC,
                    close : decryptCloseCBC
                }
            };
        }
        MODES.CBC = createCBC();

        function createCFB() {
            function encryptOpenCFB() {
                throw "not implemented!";
            }
            function encryptProcCFB(){
                throw "not implemented!";
            }
            function encryptCloseCFB() {
                throw "not implemented!";
            }
            function decryptOpenCFB() {
                throw "not implemented!";
            }
            function decryptProcCFB(){
                throw "not implemented!";
            }
            function decryptCloseCFB() {
                throw "not implemented!";
            }

            return {
                encrypt : {
                    open  : encryptOpenCFB,
                    exec  : encryptProcCFB,
                    close : encryptCloseCFB
                },
                decrypt : {
                    open  : decryptOpenCFB,
                    exec  : decryptProcCFB,
                    close : decryptCloseCFB
                }
            };
        }
        MODES.CFB = createCFB();

        function createOFB(){
            function encryptOpenOFB() {
                throw "not implemented!";
            }
            function encryptProcOFB(){
                throw "not implemented!";
            }
            function encryptCloseOFB() {
                throw "not implemented!";
            }
            function decryptOpenOFB() {
                throw "not implemented!";
            }
            function decryptProcOFB(){
                throw "not implemented!";
            }
            function decryptCloseOFB() {
                throw "not implemented!";
            }

            return {
                encrypt : {
                    open  : encryptOpenOFB,
                    exec  : encryptProcOFB,
                    close : encryptCloseOFB
                },
                decrypt : {
                    open  : decryptOpenOFB,
                    exec  : decryptProcOFB,
                    close : decryptCloseOFB
                }
            };
        }
        MODES.OFB = createOFB();

        function createCTR() {
            function encryptOpenCTR() {
                throw "not implemented!";
            }
            function encryptProcCTR(){
                throw "not implemented!";
            }
            function encryptCloseCTR() {
                throw "not implemented!";
            }
            function decryptOpenCTR() {
                throw "not implemented!";
            }
            function decryptProcCTR(){
                throw "not implemented!";
            }
            function decryptCloseCTR() {
                throw "not implemented!";
            }

            return {
                encrypt : {
                    open  : encryptOpenCTR,
                    exec  : encryptProcCTR,
                    close : encryptCloseCTR
                },
                decrypt : {
                    open  : decryptOpenCTR,
                    exec  : decryptProcCTR,
                    close : decryptCloseCTR
                }
            };
        }
        MODES.CTR = createCTR();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // PADDING ALGORITHMS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var PADDINGS = {};

        /*
         * | DD DD DD DD DD DD DD DD | DD DD DD 80 00 00 00 00 |
         */
        function createRFC1321() {
            function appendPaddingRFC1321(data) {
                var len = 16 - ( data.length % 16 );
                data.push( 0x80 );
                for ( var i=1;i<len;i++ ) {
                    data.push( 0x00 );
                }
                return data;
            }
            // trace( "appendPaddingRFC1321:" + base16( appendPaddingRFC1321( [0,1,2,3,4,5,6,7,8] ) ) );

            function removePaddingRFC1321(data) {
                for ( var i=data.length-1; 0<=i; i-- ) {
                    var val = data[i];
                    if ( val == 0x80 ) {
                        data.splice( i );
                        break;
                    } else if ( val != 0x00 ) {
                        break;
                    }
                }
                return data;
            }
            // trace( "removePaddingRFC1321:" + base16( removePaddingRFC1321( [0,1,2,3,4,5,6,7,8,9,0x80,00,00,00,00] ) ) );
            return {
                append : appendPaddingRFC1321,
                remove : removePaddingRFC1321
            };
        };
        PADDINGS.RFC1321 = createRFC1321();

        /*
         * ... | DD DD DD DD DD DD DD DD | DD DD DD DD 00 00 00 04 |
         */
        function createANSIX923() {
            function appendPaddingANSIX923(data) {
                var len = 16 - ( data.length % 16 );
                for ( var i=0; i<len-1; i++ ) {
                    data.push( 0x00 );
                }
                data.push( len );
                return data;
            }
            // trace( "appendPaddingANSIX923:" + base16( appendPaddingANSIX923( [0,1,2,3,4,5,6,7,8,9 ] ) ) );

            function removePaddingANSIX923(data) {
                var len = data.pop();
                if ( 16 < len ) len = 16;
                for ( var i=1; i<len; i++ ) {
                    data.pop();
                }
                return data;
            }
            // trace( "removePaddingANSIX923:" + base16( removePaddingANSIX923( [0,1,2,3,4,5,6,7,8,9,0x00,00,00,00,0x05] ) ) );
            return {
                append : appendPaddingANSIX923,
                remove : removePaddingANSIX923
            };
        }
        PADDINGS.ANSIX923 = createANSIX923();

        /*
         * ... | DD DD DD DD DD DD DD DD | DD DD DD DD 81 A6 23 04 |
         */
        function createISO10126() {

            function appendPaddingISO10126(data) {
                var len = 16 - ( data.length % 16 );
                for ( var i=0; i<len-1; i++ ) {
                    data.push( randByte() );
                }
                data.push( len );
                return data;
            }
            // trace( "appendPaddingISO10126:" + base16( appendPaddingISO10126( [0,1,2,3,4,5,6,7,8,9 ] ) ) );
            function removePaddingISO10126(data) {
                var len = data.pop();
                if ( 16 < len ) len = 16;
                for ( var i=1; i<len; i++ ) {
                    data.pop();
                }
                return data;
            }
            // trace( "removePaddingISO10126:" + base16( removePaddingISO10126( [0,1,2,3,4,5,6,7,8,9,0x00,00,00,00,0x05] ) ) );
            return {
                append : appendPaddingISO10126,
                remove : removePaddingISO10126
            };
        }
        PADDINGS.ISO10126 = createISO10126();


        /*
         * 01
         * 02 02
         * 03 03 03
         * 04 04 04 04
         * 05 05 05 05 05
         * etc.
         */
        function createPKCS7() {
            function appendPaddingPKCS7(data) {
                // trace( "appendPaddingPKCS7");
                // alert( "appendPaddingPKCS7");
                var len = 16 - ( data.length % 16 );
                for ( var i=0; i<len; i++ ) {
                    data.push( len );
                }
                // trace( "data:"+base16(data) );
                // trace( "data.length:"+data.length );
                return data;
            }
            // trace( "appendPaddingPKCS7:" + base16( appendPaddingPKCS7( [0,1,2,3,4,5,6,7,8,9 ] ) ) );
            function removePaddingPKCS7(data) {
                var len = data.pop();
                if ( 16 < len ) len = 0;
                for ( var i=1; i<len; i++ ) {
                    data.pop();
                }
                return data;
            }
            // trace( "removePaddingPKCS7:" + base16( removePaddingPKCS7( [0,1,2,3,4,5,6,7,8,9,0x00,04,04,04,0x04] ) ) );
            return {
                append : appendPaddingPKCS7,
                remove : removePaddingPKCS7
            };
        }
        PADDINGS.PKCS7 = createPKCS7();

        /*
         * NO PADDINGS
         */
        function createNoPadding() {
            function appendPaddingNone(data) {
                return data;
            }
            // trace( "appendPaddingPKCS7:" + base16( appendPaddingPKCS7( [0,1,2,3,4,5,6,7,8,9 ] ) ) );
            function removePaddingNone(data) {
                return data;
            }
            // trace( "removePaddingPKCS7:" + base16( removePaddingPKCS7( [0,1,2,3,4,5,6,7,8,9,0x00,04,04,04,0x04] ) ) );
            return {
                append : appendPaddingNone,
                remove : removePaddingNone
            };
        }
        PADDINGS.NO_PADDING = createNoPadding();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // ENCRYPT/DECRYPT
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var DIRECTIONS = {
            ENCRYPT : "encrypt",
            DECRYPT : "decrypt"
        };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // INTERFACE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        function Cipher( algorithm, direction, mode, padding ) {
            this.algorithm = algorithm;
            this.direction = direction;
            this.mode = mode;
            this.padding = padding;

            this.modeOpen  = mode[ direction ].open;
            this.modeExec  = mode[ direction ].exec;
            this.modeClose = mode[ direction ].close;

            // NOTE : values below are reffered by MODE functions via "this" parameter.
            this.keyBytes  = null;
            this.dataBytes = null;
            this.dataOffset = -1;
            this.dataLength = -1;

        }

        Cipher.prototype = new Object();
        Cipher.prototype.inherit = Cipher;

        function open( keyBytes, dataBytes ) {
            if ( keyBytes == null ) throw "keyBytes is null";
            if ( dataBytes == null ) throw "dataBytes is null";

            // BE CAREFUL : THE KEY GENERATING ALGORITHM OF SERPENT HAS SIDE-EFFECT
            // TO MODIFY THE KEY ARRAY.  IT IS NECESSARY TO DUPLICATE IT BEFORE
            // PROCESS THE CIPHER TEXT.
            this.keyBytes = keyBytes.concat();

            // DATA BUFFER IS USUALLY LARGE. DON'T DUPLICATE IT FOR PERFORMANCE REASON.
            this.dataBytes = dataBytes/*.concat()*/;

            this.dataOffset = 0;
            this.dataLength = dataBytes.length;

            //if ( this.direction == Cipher.ENCRYPT ) // fixed 2008/12/31
            if ( this.direction == DIRECTIONS.ENCRYPT ) {
                this.padding.append( this.dataBytes );
            }

            this.modeOpen();
        }

        function operate() {
            return this.modeExec();
        }

        function close() {
            this.modeClose();
            // if ( this.direction == Cipher.DECRYPT ) // fixed 2008/12/31
            if ( this.direction == DIRECTIONS.DECRYPT ) {
                this.padding.remove( this.dataBytes );
            }
            return this.dataBytes;
        }

        function execute( keyBytes, dataBytes ) {
            this.open( keyBytes, dataBytes );
            for(;;) {
                var size = this.operate();
                if ( 0<size ) {
                    // trace( size );
                    //alert( size );
                    continue;
                } else {
                    break;
                }
            }
            return this.close();
        }

        Cipher.prototype.open = open;
        Cipher.prototype.close = close;
        Cipher.prototype.operate = operate;
        Cipher.prototype.execute = execute;

    ////////////////////////////////////////////////////////////////////////

    // this.updateMode = function() {
    //     this.modeProcs = this.mode[ this.direction ];
    // };


    ////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


        Cipher.ENCRYPT  = "ENCRYPT";
        Cipher.DECRYPT  = "DECRYPT";

        Cipher.RIJNDAEL = "RIJNDAEL";
        Cipher.SERPENT  = "SERPENT";
        Cipher.TWOFISH  = "TWOFISH";

        Cipher.ECB      = "ECB";
        Cipher.CBC      = "CBC";
        Cipher.CFB      = "CFB";
        Cipher.OFB      = "OFB";
        Cipher.CTR      = "CTR";

        Cipher.RFC1321    = "RFC1321";
        Cipher.ANSIX923   = "ANSIX923";
        Cipher.ISO10126   = "ISO10126";
        Cipher.PKCS7      = "PKCS7";
        Cipher.NO_PADDING = "NO_PADDING";

        Cipher.create = function( algorithmName, directionName, modeName, paddingName ) {

            if ( algorithmName == null ) algorithmName = Cipher.RIJNDAEL;
            if ( directionName == null ) directionName = Cipher.ENCRYPT;
            if ( modeName      == null ) modeName      = Cipher.CBC;
            if ( paddingName   == null ) paddingName   = Cipher.PKCS7;

            var algorithm  = ALGORITHMS[ algorithmName ];
            var direction  = DIRECTIONS[ directionName ];
            var mode       = MODES[ modeName ];
            var padding    = PADDINGS[ paddingName ];

            if ( algorithm  == null ) throw "Invalid algorithm name '" + algorithmName + "'.";
            if ( direction  == null ) throw "Invalid direction name '" + directionName + "'.";
            if ( mode       == null ) throw "Invalid mode name '"      + modeName      + "'.";
            if ( padding    == null ) throw "Invalid padding name '"   + paddingName   + "'.";

            return new Cipher( algorithm.create(), direction, mode, padding );
        };

        Cipher.algorithm = function( algorithmName ) {
            if ( algorithmName == null ) throw "Null Pointer Exception ( algorithmName )";
            var algorithm  = ALGORITHMS[ algorithmName ];
            if ( algorithm  == null ) throw "Invalid algorithm name '" + algorithmName + "'.";
            // trace( "ss" );
            // trace( algorithm );
            return algorithm.create();
        }


    ///////////////////////////////////
    // export
    ///////////////////////////////////
        __export( packageRoot, "titaniumcore.crypto.Cipher", Cipher );

    } // the end of initBlockCipher();
    initBlockCipher( self );

    /*
     * SOAEP.js
     * See SOAEP.readme.txt for further information.
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     */
    // Sub-Optimal Asymmetric Encryption Padding
    function initSOAEP( packages ) {
        __unit( "SOAEP.js" );
        __uses( "packages.js" );
        // __uses( "trace.js" );
        // __uses( "elapse.js" );
        __uses( "binary.js" );
        __uses( "Cipher.js" );
        __uses( "SecureRandom.js" );

        var SecureRandom = __import( self,"titaniumcore.crypto.SecureRandom" );
        var Cipher = __import( self,"titaniumcore.crypto.Cipher" );

        // var encrypt = Cipher.create( algorithm, Cipher.ENCRYPT, Cipher.ECB, Cipher.NO_PADDING );
        // var decrypt = Cipher.create( algorithm, Cipher.DECRYPT, Cipher.ECB, Cipher.NO_PADDING );
        // var inputText  = dataBytes.concat();
        // var cipherText = encrypt.execute( keyBytes, inputText.concat() );
        // var outputText  = decrypt.execute( keyBytes, cipherText.concat() );

        function SOAEP( random, cipherAlgorithm, withBitPadding ) {
            if ( withBitPadding == null ) {
                withBitPadding = true;
            }
            this.random = random == null ? new SecureRandom() : random ;
            this.cipherAlgorithm = cipherAlgorithm == null ? Cipher.algorithm( Cipher.TWOFISH ) : cipherAlgorithm;
            this.withBitPadding = withBitPadding;
        }

        function maxsize( length ){
            var blocksize = this.cipherAlgorithm.blocksize;
            return length-blocksize + ( this.withBitPadding ? -1 : 0 );
        }


        function encode( input, length ) {
            // initialization
            var blocksize = this.cipherAlgorithm.blocksize;

            // if length is not specified, calculate the sufficient length for the length of input data.
            if ( length == null ) {
                length = Math.ceil( (1+input.length) / blocksize ) * blocksize + blocksize;
            }
            // alert( ""+input.length+"/"+length );

            if ( 0!=(length % blocksize ) ) {
                throw "SOAEP.encode() error : length("+length+") must be a multiple of " + blocksize + " since the block size of " + this.cipherAlgorithm.name + " is " +blocksize;
            }

            var blockCount = Math.floor( length / blocksize );

            // var maxsize = length - blocksize -1;
            var maxsize = this.maxsize( length );

            // trim input data if input data length exceeds the specified length by "length" parameter.
            // -1 for the terminater byte.
            if ( maxsize < input.length ) {
                throw "SOAEP.encode() error : the size of input data (" + input.length + " bytes) must not exceed " + maxsize + "byte. \n"+maxsize+"(maxsize)="+length+"(bit-length of the RSA key )-" + blocksize+"( blocksize of the cipher algorithm)" + ( this.withBitPadding ? "-1(size of the terminator byte)" : "" ) ;
                // input = input.slice( 0, length-blocksize -1 );
            }

            // Create output array.
            var output = new Array( length );

            // Create a random token block. Use it as synmmetoric cipher key later.
            var randomized = new Array( blocksize );
            this.random.nextBytes( randomized );

            // Copy input text to output
            for ( var i=0; i<input.length; i++ ) {
                output[i] = input[i];
            }

            // Pad input data with bit-padding-method to make it fit to the length.
            if ( this.withBitPadding ) {
                output[input.length] = 0x80;
                for ( var i=input.length+1; i<length-blocksize; i++ ) {
                    output[i] = 0x00;
                }
            } else {
                for ( var i=input.length; i<length-blocksize; i++ ) {
                    output[i] = 0x00;
                }
            }

            // Copy the random token block to the last block in output.
            for ( var i=length-blocksize,j=0; i<length; i++,j++ ) {
                output[i] = randomized[j];
            }

            // Encode blocks as CBC mode in reverse order.
            var iv = randomized.concat();
            this.cipherAlgorithm.open( randomized );

            for ( var idx=blockCount-2; 0<=idx; idx-- ) {
                var offset = idx*blocksize;
                for ( var i=offset,j=0; j<blocksize; i++,j++ ) {
                    output[i] ^= iv[j];
                }
                this.cipherAlgorithm.encrypt( output,offset );
                iv = output.slice( offset, offset+blocksize );
            }
            this.cipherAlgorithm.close();

            // Encode the blocks again in normal order.
            // Use first block as cipher-key and iv.
            var firstblock = output.slice( 0, blocksize );
            iv = firstblock;
            this.cipherAlgorithm.open( firstblock );
            for ( var idx=1; idx<blockCount; idx++ ) {
                var offset = idx*blocksize;
                for ( var i=offset,j=0; j<blocksize; i++,j++ ) {
                    output[i] ^= iv[j];
                }
                this.cipherAlgorithm.encrypt( output, offset );
                iv = output.slice( offset, offset+blocksize );
            }

            this.cipherAlgorithm.close();

            return output;
        }

        function decode( input ) {
            var length  = input.length
            // initialization
            var blocksize = this.cipherAlgorithm.blocksize;
            if ( 0!=length % blocksize ) {
                throw "SOAEP.decode() error : length "+length+" must be a multiple of " + blocksize;
            }
            var blockCount = Math.floor( length / blocksize );

            // create output array.
            var output = input.concat();

            // Decode  1
            // Use first block as cipher-key and iv.
            var firstblock = output.slice( 0, blocksize );
            var iv = firstblock;
            this.cipherAlgorithm.open( firstblock );
            for ( var idx=1; idx<blockCount; idx++ ) {
                var offset = idx*blocksize;
                var iv2 = output.slice( offset, offset+blocksize );
                this.cipherAlgorithm.decrypt( output, offset );
                for ( var i=offset,j=0; j<blocksize; i++,j++ ) {
                    output[i] ^= iv[j];
                    // trace("i="+i)
                }
                iv = iv2;
            }


            // Decode  2
            // Encode blocks as CBC mode in reverse order.
            var lastblock_offset = (blockCount-1)*blocksize;
            var lastblock = output.slice( lastblock_offset, lastblock_offset + blocksize );
            var iv = lastblock;
            this.cipherAlgorithm.open( lastblock );

            for ( var idx=blockCount-2; 0<=idx; idx-- ) {
                var offset = idx*blocksize;
                var iv2=output.slice( offset, offset+blocksize );
                this.cipherAlgorithm.decrypt( output, offset );
                for ( var i=offset,j=0; j<blocksize; i++,j++ ) {
                    output[i] ^= iv[j];
                }
                iv = iv2;
            }
            this.cipherAlgorithm.close();

            // trace( "SOAEP:" + base16(output ) );

            // Chop the remaining by bit-padding-method.
            if ( this.withBitPadding ) {
                for ( var i=lastblock_offset-1; 0<=i; i-- ) {
                    // trace( output[i].toString(16) );
                    if ( output[i]==0x80 ) {
                        output = output.slice( 0,i );
                        break;
                    } else if ( output[i] ==0x00 ) {
                    } else {
                        throw "decode() : found illegal character 0x" + output[i].toString(16).toUpperCase();
                        //output = output.slice( 0,i );
                        //break;
                    }
                }
            } else {
                output = output.slice( 0,lastblock_offset );
            }

            return output;
        }
        function blocksize(){
            return this.cipherAlgorithm.blocksize;
        }

        SOAEP.prototype.encode = encode;
        SOAEP.prototype.decode = decode;
        SOAEP.prototype.maxsize = maxsize;
        SOAEP.prototype.blocksize = blocksize;

        function create( random, cipherAlgorithm, withBitPadding ) {
            return new SOAEP( random, cipherAlgorithm, withBitPadding );
        }

        SOAEP.create = create;

        // __package( packages, path ).SOAEP = SOAEP;
        __export( packages, "titaniumcore.crypto.SOAEP", SOAEP );
    }
    initSOAEP( self );

    /*
     * BigInteger.init1.js
     * A class which is a representation of variable lengthed integer.
     * > Basic JavaScript BN library - subset useful for RSA-encryption.
     *
     * See BigInteger.readme.txt for further information.
     *
     * ACKNOWLEDGMENT
     *
     *     This class is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     *
     *     Several modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Asynchronous Execution Feauture.
     *     - Modified some names of methods for use in Flash ActionScript
     *     - Fixed Some trivial bugs.
     */
    function initBigInteger1( packages ) {
        __unit( "BigInteger.init1.js" );
        __uses( "packages.js" );

        ///////////////////////////////////////////////////////////////
        // import
        ///////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////
        // implementation
        ///////////////////////////////////////////////////////////////

        var installAM = function ( BigInteger ) {
            // // Bits per digit
            // $root.dbits= null;
            // $root.BI_FP= 52;

            ////////////////////////////////////////////////////////////
            // am: Compute w_j += (x*this_i), propagate carries,
            // c is initial carry, returns final carry.
            // c < 3*dvalue, x < 2*dvalue, this_i < dvalue
            // We need to select the fastest one that works in this environment.
            ////////////////////////////////////////////////////////////

            ////////////////////////////////////////////////////////////
            // am1: use a single mult and divide to get the high bits,
            // max digit bits should be 26 because
            // max internal value = 2*dvalue^2-2*dvalue (< 2^53)
            ////////////////////////////////////////////////////////////
            var am1 = function (i,x,w,j,c,n) {
                while(--n >= 0) {
                    var v = x*this[i++]+w[j]+c;
                    c = Math.floor(v/0x4000000);
                    w[j++] = v&0x3ffffff;
                }
                return c;
            };

            ////////////////////////////////////////////////////////////
            // am2 avoids a big mult-and-extract completely.
            // Max digit bits should be <= 30 because we do bitwise ops
            // on values up to 2*hdvalue^2-hdvalue-1 (< 2^31)
            ////////////////////////////////////////////////////////////
            var am2= function (i,x,w,j,c,n) {
                var xl = x&0x7fff, xh = x>>15;
                while(--n >= 0) {
                    var l = this[i]&0x7fff;
                    var h = this[i++]>>15;
                    var m = xh*l+h*xl;
                    l = xl*l+((m&0x7fff)<<15)+w[j]+(c&0x3fffffff);
                    c = (l>>>30)+(m>>>15)+xh*h+(c>>>30);
                    w[j++] = l&0x3fffffff;
                }
                return c;
            };

            ////////////////////////////////////////////////////////////
            // Alternately, set max digit bits to 28 since some
            // browsers slow down when dealing with 32-bit numbers.
            ////////////////////////////////////////////////////////////
            var am3= function (i,x,w,j,c,n) {
                var xl = x&0x3fff, xh = x>>14;
                while(--n >= 0) {
                    var l = this[i]&0x3fff;
                    var h = this[i++]>>14;
                    var m = xh*l+h*xl;
                    l = xl*l+((m&0x3fff)<<14)+w[j]+c;
                    c = (l>>28)+(m>>14)+xh*h;
                    w[j++] = l&0xfffffff;
                }
                return c;
            };

            ////////////////////////////////////////////////////////////
            // JavaScript engine analysis
            ////////////////////////////////////////////////////////////
            var canary= 0xdeadbeefcafe;
            var j_lm= ( ( canary&0xffffff ) == 0xefcafe );

            if ( true ) {
                BigInteger.prototype.am = am2;
                BigInteger.dbits = 30;
                BigInteger.log( "AM_INIT MODIFICATION SUCCEEDED." );
            } else
            if( j_lm && (navigator.appName == "Microsoft Internet Explorer")) {
                BigInteger.prototype.am = am2;
                BigInteger.dbits = 30;
            }
            else if( j_lm && (navigator.appName != "Netscape")) {
                BigInteger.prototype.am = am1;
                BigInteger.dbits = 26;
            }
            else { // Mozilla/Netscape seems to prefer am3
                BigInteger.prototype.am = am3;
                BigInteger.dbits = 28;
            }

            BigInteger.BI_FP = 52;
            BigInteger.DB = BigInteger.dbits;
            BigInteger.DM = ( 1 << BigInteger.DB )-1;
            BigInteger.DV = ( 1 << BigInteger.DB );
            BigInteger.FV = Math.pow( 2, BigInteger.BI_FP );
            BigInteger.F1 = BigInteger.BI_FP - BigInteger.DB;
            BigInteger.F2 = 2 * BigInteger.DB - BigInteger.BI_FP;
        };


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // Modular reduction using "classic" algorithm
        var Classic = function (m) {
            this.m = m;
            // this.convert = function cConvert(x) MODIFIED BY ATS 2008/11/22
            this.convert = function(x) {
                if( x.s < 0 || x.compareTo(this.m) >= 0 )
                    return x.mod(this.m);
                else
                    return x;
            };
            // this.revert = function (x) { return x; };
            // this.reduce = function (x) { x.divRemTo(this.m,null,x); };
            // this.mulTo = function (xy,r) { x.multiplyTo(y,r); this.reduce(r); };
            // this.sqrTo = function (x,r) { x.squareTo(r); this.reduce(r); };
        };
        Classic.prototype.revert = function (x) { return x; };
        Classic.prototype.reduce = function (x) { x.divRemTo(this.m,null,x); };
        Classic.prototype.mulTo = function (x,y,r) { x.multiplyTo(y,r); this.reduce(r); };
        Classic.prototype.sqrTo = function (x,r) { x.squareTo(r); this.reduce(r); };
        Classic.prototype.toString = function() { return "Classic()"; }



        // Montgomery reduction
        var Montgomery = function (m) {
            this.m = m;
            this.mp = m.invDigit();
            this.mpl = this.mp&0x7fff;
            this.mph = this.mp>>15;
            this.um = (1<<(BigInteger.DB-15))-1;
            this.mt2 = 2*m.t;
        };

        // xR mod m
        Montgomery.prototype.convert = function (x) {
            var r = new BigInteger();
            x.abs().dlShiftTo(this.m.t,r);
            r.divRemTo(this.m,null,r);
            if(x.s < 0 && r.compareTo(BigInteger.ZERO) > 0) this.m.subTo(r,r);
            return r;
        };

        // x/R mod m
        Montgomery.prototype.revert = function (x) {
            var r = new BigInteger();
            x.copyTo(r);
            this.reduce(r);
            return r;
        };

        // x = x/R mod m (HAC 14.32)
        Montgomery.prototype.reduce = function (x) {
            while(x.t <= this.mt2)	// pad x so am has enough room later
                x[x.t++] = 0;
            for(var i = 0; i < this.m.t; ++i) {
                // faster way of calculating u0 = x[i]*mp mod DV
                var j = x[i]&0x7fff;
                var u0 = (j*this.mpl+(((j*this.mph+(x[i]>>15)*this.mpl)&this.um)<<15))&BigInteger.DM;
                // use am to combine the multiply-shift-add into one call
                j = i+this.m.t;
                //trace( "(1)x["+j+"] = " + x[j] );
                x[j] += this.m.am(0,u0,x,i,0,this.m.t);
                //trace( "(2)x["+j+"] = " + x[j] );
                // propagate carry
                while( x[j] >= BigInteger.DV ) {
                    //trace( "(3)x["+j+"] = " + x[j] );
                    x[j] -= BigInteger.DV;
                    //trace( "(4)x["+j+"] = " + x[j] );

                    // FIXED 7 Dec, 2008 http://oka.nu/
                    // This is a countermeasure for ActionScript's bug.  Any
                    // shortcut operator within reference to an object's field
                    // by [] operator which is also with any shortcut operator
                    // causes a false operation.

                    // x[++j]++;
                    j++; x[j]++;

                    //trace( "(5)x["+j+"] = " + x[j] );
                }
            }
            x.clamp();
            x.drShiftTo(this.m.t,x);
            if(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
        };

        // r = "x^2/R mod m"; x != r
        Montgomery.prototype.sqrTo = function (x,r) { x.squareTo(r); this.reduce(r); };

        // r = "xy/R mod m"; x,y != r
        Montgomery.prototype.mulTo = function (x,y,r) { x.multiplyTo(y,r); this.reduce(r); };

        Montgomery.prototype.toString = function() { return "Montgomery()"; }


        ////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        // (public) Constructor
        var BigInteger = function() {
            if ( arguments.length == 0 ) {
                // do nothing.
            } else if ( arguments.length == 1 ) {
                var p0 = arguments[0];
                var t0 = typeof p0;
                if ( "number" == t0 ) {
                    // fromInt() (protected) set from integer value x, -DV <= x < DV
                    if ( ( -1*BigInteger.DV<=p0 ) && ( p0<BigInteger.DV ) ) {
                        this.fromInt(p0);
                    } else {
                        this.fromString( p0.toString(16), 16 );
                    }
                } else if ( "string" == t0 ) {
                    this.fromString(p0,10);
                } else {
                    this.fromByteArray(p0);
                }
            } else if ( arguments.length == 2 ) {
                var p0 = arguments[0];
                var t0 = typeof p0;
                var p1 = arguments[1];
                var t1 = typeof p1;
                if ( "number" == t0 ) {
                    this.fromNumber2(p0,p1);
                } else if ( "string" == t0 ) {
                    this.fromString(p0,p1);
                } else {
                    throw "parameter(1) must be either a number or a string. " + t0;
                }
            } else if ( arguments.length == 3 ) {
                var p0 = arguments[0];
                var t0 = typeof p0;
                var p1 = arguments[1];
                var t1 = typeof p1;
                var p2 = arguments[2];
                var t2 = typeof p2;
                if ( "number" == t0 ) {
                    this.fromNumber1(p0,p1,p2);
                } else {
                    throw "parameter(1) must be a number. " + t0;
                }
            }

            // old version.
            // var BigInteger = function (a,b,c) {
            // if ( a != null ) {
            // 	if ( "number" == typeof a )
            // 		this.fromNumber(a,b,c);
            // 	else if( b == null && "string" != typeof a )
            // 		this.fromString(a,256);
            // 	else
            // 		this.fromString(a,b);
            // }
            // }
        };
        BigInteger.prototype.className = "BigInteger";

        var BI_RC = new Array();
        var digit_conversions = function () {
            // Digit conversions
            var rr,vv;
            rr = "0".charCodeAt(0);
            for(vv = 0; vv <= 9; ++vv) BI_RC[rr++] = vv;
            rr = "a".charCodeAt(0);
            for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
            rr = "A".charCodeAt(0);
            for(vv = 10; vv < 36; ++vv) BI_RC[rr++] = vv;
        };
        digit_conversions();

        BigInteger.intAt= function (s,i) {
            var c = BI_RC[ s.charCodeAt(i) ];
            return ( c == null ) ? -1 : c;
        };

        var BI_RM= "0123456789abcdefghijklmnopqrstuvwxyz";
        BigInteger.int2char= function (n) { return BI_RM.charAt(n); };


        // returns bit length of the integer x
        BigInteger.nbits= function (x) {
            var r = 1, t;
            if ( (t=x>>>16) != 0) { x = t; r += 16; }
            if ( (t=x>>  8) != 0) { x = t; r +=  8; }
            if ( (t=x>>  4) != 0) { x = t; r +=  4; }
            if ( (t=x>>  2) != 0) { x = t; r +=  2; }
            if ( (t=x>>  1) != 0) { x = t; r +=  1; }
            return r;
        };

        // (protected) copy this to r
        BigInteger.prototype.copyTo = function (r) {
            for(var i = this.t-1; i >= 0; --i) r[i] = this[i];
            r.t = this.t;
            r.s = this.s;
        };

        // (protected) set from integer value x, -DV <= x < DV
        BigInteger.prototype.fromInt = function (x) {
            this.t = 1;
            this.s = (x<0)?-1:0;
            if(x > 0) this[0] = x;
            // else if ( x < -1) this[0] = x + DV; // this is probably a bug. modified. 10 DEC,2008
            else if ( x < -1 ) this[0] = x + BigInteger.DV;
            else this.t = 0;
        };

        // (protected) set from string and radix
        BigInteger.prototype.fromString = function ( s, b ) {
            // ElapsedTime.start( "fromString" );
            var k;

            if ( b <= 0  ) throw "bitLength must be larger than 0";
            else if ( b == 2  ) k = 1;
            else if ( b == 4  ) k = 2;
            else if ( b == 8  ) k = 3;
            else if ( b == 16 ) k = 4;
            else if ( b == 32 ) k = 5;
            else if ( b == 256) k = 8; // byte array
            else {
                this.fromRadix(s,b);
                return;
            }

            this.t = 0;
            this.s = 0;

            var i = s.length;
            var mi = false;
            var sh = 0;

            while ( --i >= 0 ) {
                var x = ( k==8 ) ? s[i] & 0xff : BigInteger.intAt( s, i );
                if ( x < 0 ) {
                    if ( s.charAt(i) == "-" ) mi = true;
                    continue;
                }
                mi = false;
                if(sh == 0) {
                    this[ this.t++ ] = x;
                } else if( sh + k > BigInteger.DB ) {
                    this[ this.t-1 ] |= ( x & ( ( 1 << ( BigInteger.DB - sh ) ) - 1 ) ) << sh;
                    this[ this.t   ]  = ( x >>         ( BigInteger.DB - sh ) );
                    this.t++;
                } else {
                    this[ this.t-1 ] |=  x << sh;
                }
                sh += k;
                if(sh >= BigInteger.DB) sh -= BigInteger.DB;
            }
            if ( k == 8 && ( s[0] & 0x80 ) != 0 ) {
                this.s = -1;
                if ( sh > 0 ) this[this.t-1] |= ((1<<(BigInteger.DB-sh))-1)<<sh;
            }
            this.clamp();
            if( mi ) {
                BigInteger.ZERO.subTo( this, this );
            }
            // ElapsedTime.stop();
        };

        // (protected) set from a byte array.
        BigInteger.prototype.fromByteArray = function ( b ) {
            return this.fromString( b, 256 );
        }


        // (protected) clamp off excess high words
        BigInteger.prototype.clamp = function () {
            var c = this.s & BigInteger.DM;
            while ( this.t > 0 && this[this.t-1] == c ) --this.t;
        };

        // (public) return string representation in given radix
        BigInteger.prototype.toString = function (b) {
            if(this.s < 0) return "-"+this.negate().toString(b);
            var k;
            // if ( b== null ) b=this; // ADDED BY ATS 2008/12/07
            if(b == 16) k = 4;
            else if(b == 8) k = 3;
            else if(b == 2) k = 1;
            else if(b == 32) k = 5;
            else if(b == 4) k = 2;
            else return this.toRadix(b);
            var km = (1<<k)-1, d, m = false, r = "", i = this.t;
            var p = BigInteger.DB-(i*BigInteger.DB)%k;
            if(i-- > 0) {
                if(p < BigInteger.DB && (d = this[i]>>p) > 0) { m = true; r = BigInteger.int2char(d); }
                while(i >= 0) {
                    if(p < k) {
                        d = (this[i]&((1<<p)-1))<<(k-p);
                        d |= this[--i]>>(p+=BigInteger.DB-k);
                    }
                    else {
                        d = (this[i]>>(p-=k))&km;
                        if(p <= 0) { p += BigInteger.DB; --i; }
                    }
                    if(d > 0) m = true;
                    if(m) r += BigInteger.int2char(d);
                }
            }
            return m?r:"0";
        };

        // (public) -this
        BigInteger.prototype.negate = function () { var r = new BigInteger(); BigInteger.ZERO.subTo(this,r); return r; };

        // (public) |this|
        BigInteger.prototype.abs = function () { return (this.s<0)?this.negate():this; };

        // (public) return + if this > a, - if this < a, 0 if equal
        BigInteger.prototype.compareTo = function (a) {
            var r = this.s-a.s;
            if(r != 0) return r;
            var i = this.t;
            r = i-a.t;
            if(r != 0) return r;
            while(--i >= 0) if((r=this[i]-a[i]) != 0) return r;
            return 0;
        };


        // (public) return the number of bits in "this"
        BigInteger.prototype.bitLength = function () {
            if ( this.t <= 0 ) return 0;
            return BigInteger.DB * (this.t-1) + BigInteger.nbits( this[ this.t-1 ] ^ ( this.s & BigInteger.DM ) );
        };

        // (protected) r = this << n*DB
        BigInteger.prototype.dlShiftTo = function (n,r) {
            var i;
            for(i = this.t-1; i >= 0; --i) r[i+n] = this[i];
            for(i = n-1; i >= 0; --i) r[i] = 0;
            r.t = this.t+n;
            r.s = this.s;
        };

        // (protected) r = this >> n*DB
        BigInteger.prototype.drShiftTo = function (n,r) {
            for(var i = n; i < this.t; ++i) r[i-n] = this[i];
            r.t = Math.max(this.t-n,0);
            r.s = this.s;
        };

        // (protected) r = this << n
        BigInteger.prototype.lShiftTo = function (n,r) {
            var bs = n % BigInteger.DB;
            var cbs = BigInteger.DB - bs;
            var bm = (1<<cbs)-1;
            var ds = Math.floor( n / BigInteger.DB ), c = (this.s<<bs)&BigInteger.DM, i;
            for(i = this.t-1; i >= 0; --i) {
                r[i+ds+1] = (this[i]>>cbs)|c;
                c = (this[i]&bm)<<bs;
            }
            for(i = ds-1; i >= 0; --i) r[i] = 0;
            r[ds] = c;
            r.t = this.t+ds+1;
            r.s = this.s;
            r.clamp();
        };

        // (protected) r = this >> n
        BigInteger.prototype.rShiftTo = function (n,r) {
            r.s = this.s;
            var ds = Math.floor( n / BigInteger.DB );
            if(ds >= this.t) { r.t = 0; return; }
            var bs = n % BigInteger.DB;
            var cbs = BigInteger.DB - bs;
            var bm = (1<<bs)-1;
            r[0] = this[ds]>>bs;
            for(var i = ds+1; i < this.t; ++i) {
                r[i-ds-1] |= (this[i]&bm)<<cbs;
                r[i-ds] = this[i]>>bs;
            }
            if(bs > 0) r[this.t-ds-1] |= (this.s&bm)<<cbs;
            r.t = this.t-ds;
            r.clamp();
        };

        // (protected) r = this - a
        BigInteger.prototype.subTo = function (a,r) {
            var i = 0, c = 0, m = Math.min( a.t, this.t );
            while(i < m) {
                c += this[i]-a[i];
                r[i++] = c&BigInteger.DM;
                c >>= BigInteger.DB;
            }
            if(a.t < this.t) {
                c -= a.s;
                while(i < this.t) {
                    c += this[i];
                    r[i++] = c&BigInteger.DM;
                    c >>= BigInteger.DB;
                }
                c += this.s;
            }
            else {
                c += this.s;
                while(i < a.t) {
                    c -= a[i];
                    r[i++] = c&BigInteger.DM;
                    c >>= BigInteger.DB;
                }
                c -= a.s;
            }
            r.s = (c<0)?-1:0;
            if(c < -1) r[i++] = BigInteger.DV+c;
            else if(c > 0) r[i++] = c;
            r.t = i;
            r.clamp();
        };

        // (protected) r = this * a, r != this,a (HAC 14.12)
        // "this" should be the larger one if appropriate.
        BigInteger.prototype.multiplyTo = function (a,r) {
            var x = this.abs(), y = a.abs();
            var i = x.t;
            r.t = i+y.t;
            while(--i >= 0) r[i] = 0;
            for(i = 0; i < y.t; ++i) r[i+x.t] = x.am(0,y[i],r,i,0,x.t);
            r.s = 0;
            r.clamp();
            if(this.s != a.s) BigInteger.ZERO.subTo(r,r);
        };

        // (protected) r = this^2, r != this (HAC 14.16)
        // BigInteger.prototype.squareTo = function (r) {
        // 	var x = this.abs();
        // 	var i = r.t = 2*x.t;
        // 	while(--i >= 0) r[i] = 0;
        // 	for(i = 0; i < x.t-1; ++i) {
        // 		var c = x.am(i,x[i],r,2*i,0,1);
        // 		if((r[i+x.t]+=x.am(i+1,2*x[i],r,2*i+1,c,x.t-i-1)) >= BigInteger.DV) {
        // 			r[i+x.t] -= BigInteger.DV;
        // 			r[i+x.t+1] = 1;
        // 		}
        // 	}
        // 	if(r.t > 0) r[r.t-1] += x.am(i,x[i],r,2*i,0,1);
        // 	r.s = 0;
        // 	r.clamp();
        // 	trace( "squareTo() 1: " + x.toString(16) );
        // 	trace( "squareTo() 2: " + r.toString(16) );
        // };
        BigInteger.prototype.squareTo = function (r) {
            var x = this.abs();
            var i = r.t = 2 * x.t;
            while ( --i >= 0 ) {
                r[i] = 0;
            }
            for (i = 0; i < x.t-1; ++i ) {
                var c = x.am( i, x[i], r, 2*i, 0, 1 );
                //trace( "squareTo() 0.0: i=" + i + " r=" + r.toString(16) );
                if ( ( r[i+x.t] += x.am( i+1, 2*x[i], r, 2*i+1, c, x.t-i-1 ) ) >= BigInteger.DV ) {
                    r[ i+x.t   ] -= BigInteger.DV;
                    r[ i+x.t+1 ]  = 1;
                }
                //trace( "squareTo() 0.1: i=" + i + " r=" + r.toString(16) );
            }
            if ( r.t > 0 ) {
                r[r.t-1] += x.am( i, x[i], r, 2*i, 0, 1 );
            }
            r.s = 0;
            r.clamp();
            //trace( "squareTo() 1: " + x.toString(16) );
            //trace( "squareTo() 2: " + r.toString(16) );
        };

        // (protected) divide this by m, quotient and remainder to q, r (HAC 14.20)
        // r != q, this != m.  q or r may be null.
        BigInteger.prototype.divRemTo = function (m,q,r) {
            var pm = m.abs();
            if(pm.t <= 0) return;
            var pt = this.abs();
            if(pt.t < pm.t) {
                if(q != null) q.fromInt(0);
                if(r != null) this.copyTo(r);
                return;
            }
            if(r == null) r = new BigInteger();
            var y = new BigInteger(), ts = this.s, ms = m.s;
            var nsh = BigInteger.DB-BigInteger.nbits(pm[pm.t-1]);	// normalize modulus
            if(nsh > 0) { pm.lShiftTo(nsh,y); pt.lShiftTo(nsh,r); }
            else { pm.copyTo(y); pt.copyTo(r); }
            var ys = y.t;
            var y0 = y[ys-1];
            if(y0 == 0) return;
            var yt = y0*(1<<BigInteger.F1)+((ys>1)?y[ys-2]>>BigInteger.F2:0);
            var d1 = BigInteger.FV/yt, d2 = (1<<BigInteger.F1)/yt, e = 1<<BigInteger.F2;
            var i = r.t, j = i-ys, t = (q==null)?new BigInteger():q;
            y.dlShiftTo(j,t);
            if(r.compareTo(t) >= 0) {
                r[r.t++] = 1;
                r.subTo(t,r);
            }
            BigInteger.ONE.dlShiftTo(ys,t);
            t.subTo(y,y);	// "negative" y so we can replace sub with am later
            while(y.t < ys) y[y.t++] = 0;
            while(--j >= 0) {
                // Estimate quotient digit
                var qd = (r[--i]==y0)?BigInteger.DM:Math.floor(r[i]*d1+(r[i-1]+e)*d2);
                if((r[i]+=y.am(0,qd,r,j,0,ys)) < qd) {	// Try it out
                    y.dlShiftTo(j,t);
                    r.subTo(t,r);
                    while(r[i] < --qd) r.subTo(t,r);
                }
            }
            if(q != null) {
                r.drShiftTo(ys,q);
                if(ts != ms) BigInteger.ZERO.subTo(q,q);
            }
            r.t = ys;
            r.clamp();
            if(nsh > 0) r.rShiftTo(nsh,r);	// Denormalize remainder
            if(ts < 0) BigInteger.ZERO.subTo(r,r);
        };

        // (public) this mod a
        BigInteger.prototype.mod = function (a) {
            var r = new BigInteger();
            this.abs().divRemTo(a,null,r);
            if(this.s < 0 && r.compareTo(BigInteger.ZERO) > 0) a.subTo(r,r);
            return r;
        };

        // (protected) return "-1/this % 2^DB"; useful for Mont. reduction
        // justification:
        //         xy == 1 (mod m)
        //         xy =  1+km
        //   xy(2-xy) = (1+km)(1-km)
        // x[y(2-xy)] = 1-k^2m^2
        // x[y(2-xy)] == 1 (mod m^2)
        // if y is 1/x mod m, then y(2-xy) is 1/x mod m^2
        // should reduce x and y(2-xy) by m^2 at each step to keep size bounded.
        // JS multiply "overflows" differently from C/C++, so care is needed here.
        BigInteger.prototype.invDigit = function () {
            if(this.t < 1) return 0;
            var x = this[0];
            if((x&1) == 0) return 0;
            var y = x&3;		// y == 1/x mod 2^2
            y = (y*(2-(x&0xf)*y))&0xf;	// y == 1/x mod 2^4
            y = (y*(2-(x&0xff)*y))&0xff;	// y == 1/x mod 2^8
            y = (y*(2-(((x&0xffff)*y)&0xffff)))&0xffff;	// y == 1/x mod 2^16
            // last step - calculate inverse mod DV directly;
            // assumes 16 < DB <= 32 and assumes ability to handle 48-bit ints
            y = (y*(2-x*y%BigInteger.DV))%BigInteger.DV;		// y == 1/x mod 2^dbits
            // we really want the negative inverse, and -DV < y < DV
            return (y>0)?BigInteger.DV-y:-y;
        };

        // (protected) true iff this is even
        BigInteger.prototype.isEven = function () { return ((this.t>0)?(this[0]&1):this.s) == 0; };

        // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
        BigInteger.prototype.exp = function (e,z) {
            // trace( "exp() e "+ e + "/z="+z );
            if(e > 0xffffffff || e < 1) return BigInteger.ONE;
            var r = new BigInteger(), r2 = new BigInteger(), g = z.convert(this), i = BigInteger.nbits(e)-1;
            // BigInteger.log( "r="  + r );
            // BigInteger.log( "r2=" + r2);
            // BigInteger.log( "g="  + g );
            // BigInteger.log( "i="  + i );
            g.copyTo(r);
            // BigInteger.log( "g="  + g.toString(16) );
            // BigInteger.log( "r="  + r.toString(16) );
            while(--i >= 0) {
                z.sqrTo(r,r2);
                // trace( "i="+i +" " + r2.toString(16) );
                // if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
                // else { var t = r; r = r2; r2 = t; }
                if ( ( e & ( 1 << i ) ) > 0 ) {
                    z.mulTo(r2,g,r);
                    // trace( "*i="+i +" " + r.toString(16) );
                } else {
                    var t = r; r = r2; r2 = t;
                }
            }
            return z.revert(r);
        };

        // (public) this^e % m, 0 <= e < 2^32
        BigInteger.prototype.modPowInt = function (e,m) {
            var z;
            if(e < 256 || m.isEven()) z = new BigInteger.Classic(m); else z = new BigInteger.Montgomery(m);
            return this.exp(e,z);
        };

        //
        // static methods
        //

        // // return new, unset BigInteger
        // BigInteger.create = function (i) {
        // 	var bi = new BigInteger();
        // 	if ( typeof i == 'number' ) {
        // 		// return bigint initialized to value
        // 		bi.fromInt(i);
        // 	}
        // 	return bi;
        // };
        //
        // // (public) (static) convert a (hex) string to a bignum object
        // BigInteger.parseBigInt = function (str,r) {
        // 	return new BigInteger(str,r);
        // };

        BigInteger.log = function(message){
            // trace( message );
            // alert( message );
            return;
        };

        BigInteger.err = function(message) {
            trace( message );
            // alert( message );
            return;
        };


        // "constants"
        BigInteger.ZERO = new BigInteger(0);
        BigInteger.ONE = new BigInteger(1);


        // initialize
        installAM( BigInteger );

        //////////////////////////////////////////////
        // export
        //////////////////////////////////////////////

        // Inner Classes
        BigInteger.Classic = Classic;
        BigInteger.Montgomery = Montgomery;

        // main class
        __export( packages, "titaniumcore.crypto.BigInteger" , BigInteger );
    }
    initBigInteger1( self );

    /*
     * BigInteger.init2.js
     * A class which is a representation of variable lengthed integer.
     * > Extended JavaScript BN functions, required for RSA private ops.
     *
     * See BigInteger.readme.txt for further information.
     *
     * ACKNOWLEDGMENT
     *
     *     This class is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     *
     *     Several modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Asynchronous Execution Feauture.
     *     - Modified some names of methods for use in Flash ActionScript
     *     - Fixed Some trivial bugs.
     */
    function initBigInteger2( packages ) {
        __unit( "BigInteger.init2.js" );
        __uses( "packages.js" );
        __uses( "BigInteger.init1.js" );
        // __uses( "elapse.js" );

        ///////////////////////////////////////
        // import
        ///////////////////////////////////////
        // var BigInteger = __package( packages, path ).BigInteger;
        var BigInteger = __import( packages, "titaniumcore.crypto.BigInteger" );


        ///////////////////////////////////////
        // implementation
        ///////////////////////////////////////

        // (public)
        BigInteger.prototype.clone = function () { var r = new BigInteger(); this.copyTo(r); return r; };

        // (public) return value as integer
        BigInteger.prototype.intValue = function () {
            if ( this.s < 0 ) {
                if( this.t == 1 ) {
                    return this[0]-BigInteger.DV;
                } else if( this.t == 0 ) {
                    return -1;
                }
            } else if ( this.t == 1 ) {
                return this[0];
            } else if( this.t == 0 ) {
                return 0;
            }
            // assumes 16 < DB < 32
            return ( ( this[1] & ( ( 1 << ( 32 - BigInteger.DB ) ) -1 ) ) << BigInteger.DB ) | this[0];
        };

        // (public) return value as byte
        BigInteger.prototype.byteValue = function () {
            return ( this.t ==0 ) ? this.s : ( this[0] << 24 ) >> 24;
        };

        // (public) return value as short (assumes DB>=16)
        BigInteger.prototype.shortValue = function () {
            return ( this.t==0 ) ? this.s : ( this[0] << 16 ) >> 16;
        };

        // (protected) return x s.t. r^x < DV
        BigInteger.prototype.chunkSize = function (r) {
            return Math.floor( Math.LN2 * BigInteger.DB / Math.log( r ) );
        };

        // (public) 0 if this == 0, 1 if this > 0
        BigInteger.prototype.signum = function () {
            if( this.s < 0 )
                return -1;
            else if ( this.t <= 0 || (this.t == 1 && this[0] <= 0 ) )
                return 0;
            else
                return 1;
        };

        // (protected) convert to radix string
        BigInteger.prototype.toRadix = function (b) {
            if ( b == null ) {
                b = 10;
            }
            if ( this.signum() == 0 || b < 2 || b > 36 ) {
                return "0";
            }
            var cs = this.chunkSize( b );
            var a = Math.pow( b, cs );
            var d = new BigInteger(a), y = new BigInteger(), z = new BigInteger(), r = "";
            this.divRemTo(d,y,z);
            while ( y.signum() > 0 ) {
                r = ( a + z.intValue() ).toString(b).substr(1) + r;
                y.divRemTo( d, y, z );
            }
            return z.intValue().toString(b) + r;
        };

        // (protected) convert from radix string
        BigInteger.prototype.fromRadix = function (s,b) {
            //ElapsedTime.start( "fromRadix" );
            this.fromInt(0);
            if ( b == null ){
                b = 10;
            }
            var cs = this.chunkSize( b );
            var d = Math.pow( b, cs );
            var mi = false;
            var j = 0;
            var w = 0;

            for ( var i = 0; i < s.length; ++i ) {
                var x = BigInteger.intAt( s, i );
                if( x < 0 ) {
                    if ( s.charAt(i) == "-" && this.signum() == 0 ) {
                        mi = true;
                    }
                    continue;
                }
                w = b * w + x;
                if ( ++j >= cs ) {
                    this.dMultiply( d );
                    this.dAddOffset( w, 0 );
                    j = 0;
                    w = 0;
                }
            }
            if( j > 0 ) {
                this.dMultiply( Math.pow( b, j ) );
                this.dAddOffset( w, 0 );
            }
            if ( mi ) {
                BigInteger.ZERO.subTo( this, this );
            }
            // ElapsedTime.stop(  );
        };

        var _ctr=0;

        /* 2008/11/24 MODIFIED
         // (protected) alternate constructor
         BigInteger.prototype.fromNumber = function (a,b,c) {
         if ( "number" == typeof b ) {
         // new BigInteger(int,int,RNG)
         var et = ElapsedTime.create();
         et.start( "fromNumber1" );
         if( a < 2 ) {
         this.fromInt( 1 );
         } else {
         this.fromNumber( a, c );

         if( ! this.testBit( a-1 ) )  // force MSB set
         this.bitwiseTo( BigInteger.ONE.shiftLeft( a - 1 ), BigInteger.op_or, this );

         if( this.isEven() )
         this.dAddOffset( 1,0 ); // force odd

         var et2= ElapsedTime.create();
         et2.start( "fromNumber1.loop" );
         while( ! this.isProbablePrime( b ) ) {
         this.dAddOffset( 2, 0 );
         if( this.bitLength() > a ) {
         this.subTo( BigInteger.ONE.shiftLeft(a-1), this );
         }
         }
         et2.stop();
         }
         et.stop();
         } else {
         // new BigInteger(int,RNG)
         var et = ElapsedTime.create();
         et.start( "fromNumber2" );
         var x = new Array(), t = a & 7;
         x.length = (a>>3)+1;
         b.nextBytes( x );
         if ( t > 0 )
         x[0] &= ((1<<t)-1);
         else
         x[0] = 0;
         this.fromString( x, 256 );
         et.stop();
         }
         };
         */
        /*
         // (protected) alternate constructor
         BigInteger.prototype.fromNumber = function (a,b,c) {
         if ( "number" == typeof b ) {
         this.fromNumber1( a,b,c );
         } else {
         this.fromNumber2( a,b );
         }
         };
         BigInteger.prototype.fromNumber1 = function( a, b, c ) {
         // new BigInteger(int,int,SecureRandom)
         var et = ElapsedTime.create();
         et.start( "fromNumber1" );
         if( a < 2 ) {
         this.fromInt( 1 );
         } else {
         this.fromNumber2( a, c );

         if( ! this.testBit( a-1 ) )  // force MSB set
         this.bitwiseTo( BigInteger.ONE.shiftLeft( a - 1 ), BigInteger.op_or, this );

         if( this.isEven() )
         this.dAddOffset( 1,0 ); // force odd

         var et2= ElapsedTime.create();
         et2.start( "fromNumber1.loop" );
         while( ! this.isProbablePrime( b ) ) {
         this.dAddOffset( 2, 0 );
         if( this.bitLength() > a ) {
         this.subTo( BigInteger.ONE.shiftLeft(a-1), this );
         }
         }
         et2.stop();
         }
         et.stop();
         }

         BigInteger.prototype.fromNumber2 = function( a, b ) {
         // new BigInteger(int,SecureRandom)
         var et = ElapsedTime.create();
         et.start( "fromNumber2" );
         var x = new Array(), t = a & 7;
         x.length = (a>>3)+1;
         b.nextBytes( x );
         if ( t > 0 )
         x[0] &= ((1<<t)-1);
         else
         x[0] = 0;
         this.fromString( x, 256 );
         et.stop();
         };
         */

        BigInteger.prototype.fromNumber1 = function( bitLength, certainty, rnd ) {
            // new BigInteger(int,int,SecureRandom)
            var et = ElapsedTime.create();
            et.start( "fromNumber1" );
            if( bitLength < 2 ) {
                this.fromInt( 1 );
            } else {
                this.fromNumber2( bitLength, rnd );

                if( ! this.testBit( bitLength-1 ) ) {  // force MSB set
                    this.bitwiseTo( BigInteger.ONE.shiftLeft( bitLength - 1 ), BigInteger.op_or, this );
                }

                if( this.isEven() ) {
                    this.dAddOffset( 1,0 ); // force odd
                }

                var et2= ElapsedTime.create();
                et2.start( "fromNumber1.loop" );
                while( ! this.isProbablePrime( certainty ) ) {
                    this.dAddOffset( 2, 0 );
                    if( this.bitLength() > bitLength ) {
                        this.subTo( BigInteger.ONE.shiftLeft( bitLength - 1 ), this );
                    }
                }
                et2.stop();
            }
            et.stop();
        }

        BigInteger.prototype.fromNumber2 = function( bitLength, rnd ) {
            // new BigInteger(int,SecureRandom)
            var et = ElapsedTime.create();
            et.start( "fromNumber2" );
            var x = new Array();
            var t = bitLength & 7;
            x.length = ( bitLength >> 3 ) + 1;
            rnd.nextBytes( x );
            if ( t > 0 )
                x[0] &= ( ( 1<<t ) -1 );
            else
                x[0] = 0;
            this.fromString( x, 256 );
            et.stop();
        };


        // (public) convert to bigendian byte array
        BigInteger.prototype.toByteArray = function () {
            var i = this.t;
            var r = new Array();
            r[0] = this.s;
            var p = BigInteger.DB - ( i * BigInteger.DB ) % 8;
            var d;
            var k = 0;
            if ( i-- > 0 ) {
                if ( p < BigInteger.DB && ( d = this[i] >> p ) != ( this.s & BigInteger.DM ) >> p ) {
                    r[ k++ ] = d | ( this.s << ( BigInteger.DB - p ) );
                }
                while ( i >= 0 ) {
                    if ( p < 8 ) {
                        d = ( this[i] & ( ( 1 << p ) - 1 ) ) << ( 8 - p );
                        d |= this[--i] >> ( p += BigInteger.DB - 8 );
                    } else {
                        d = ( this[i] >> ( p-=8 ) ) & 0xff;
                        if ( p <= 0 ) {
                            p += BigInteger.DB;
                            --i;
                        }
                    }
                    if ( ( d & 0x80 ) != 0 ) {
                        d |= -256;
                    }
                    if ( k == 0 && ( this.s&0x80 ) != ( d&0x80 ) ){
                        ++k;
                    }
                    if ( k > 0 || d != this.s) {
                        r[k++] = d;
                    }
                }
            }
            // ADDED JAN 6,2009 ATSUSHI OKA
            for ( var idx=0; idx<r.length; idx++ ) {
                r[idx] = 0xff & r[idx];
            }
            // <<<
            return r;
        };

        BigInteger.prototype.equals = function (a) { return(this.compareTo(a)==0); };
        BigInteger.prototype.min = function (a) { return(this.compareTo(a)<0)?this:a; };
        BigInteger.prototype.max = function (a) { return(this.compareTo(a)>0)?this:a; };

        // (protected) r = this op a (bitwise)
        BigInteger.prototype.bitwiseTo = function (a,op,r) {
            var i, f, m = Math.min( a.t, this.t );
            for(i = 0; i < m; ++i) r[i] = op(this[i],a[i]);
            if(a.t < this.t) {
                f = a.s&BigInteger.DM;
                for(i = m; i < this.t; ++i) r[i] = op(this[i],f);
                r.t = this.t;
            }
            else {
                f = this.s&BigInteger.DM;
                for(i = m; i < a.t; ++i) r[i] = op(f,a[i]);
                r.t = a.t;
            }
            r.s = op(this.s,a.s);
            r.clamp();
        };

        // (public) this & a
        BigInteger.op_and = function (x,y) { return x & y; };
        // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript
        // BigInteger.prototype.and = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_and,r); return r; };
        BigInteger.prototype.ope_and = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_and,r); return r; };
        BigInteger.prototype[ "and" ] = BigInteger.prototype.ope_and;
        // <<<

        // (public) this | a
        BigInteger.op_or = function (x,y) { return x|y; };
        // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript >>>
        // BigInteger.prototype.or = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_or,r); return r; };
        BigInteger.prototype.ope_or = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_or,r); return r; };
        BigInteger.prototype[ "or" ] = BigInteger.prototype.ope_or;
        // <<<

        // (public) this ^ a
        // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript >>>
        BigInteger.op_xor = function (x,y) { return x^y; };
        // BigInteger.prototype.xor = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_xor,r); return r; };
        BigInteger.prototype.ope_xor = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_xor,r); return r; };
        BigInteger.prototype[ "xor" ] = BigInteger.prototype.ope_xor;
        // <<<

        // (public) this & ~a
        // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript >>>
        BigInteger.op_andnot = function (x,y) { return x&~y; };
        // BigInteger.prototype.andNot = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_andnot,r); return r; };
        BigInteger.prototype.ope_andNot = function (a) { var r = new BigInteger(); this.bitwiseTo(a,BigInteger.op_andnot,r); return r; };
        BigInteger.prototype[ "andNot" ] = BigInteger.prototype.ope_andNot;

        // (public) ~this
        // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript >>>
        // BigInteger.prototype.not = function () {
        //   var r = new BigInteger();
        //   for(var i = 0; i < this.t; ++i) r[i] = BigInteger.DM&~this[i];
        //   r.t = this.t;
        //   r.s = ~this.s;
        //   return r;
        // };
        BigInteger.prototype.ope_not = function () {
            var r = new BigInteger();
            for(var i = 0; i < this.t; ++i) r[i] = BigInteger.DM&~this[i];
            r.t = this.t;
            r.s = ~this.s;
            return r;
        };
        BigInteger.prototype[ "not" ] = BigInteger.prototype.ope_not;
        // <<<

        // (public) this << n
        BigInteger.prototype.shiftLeft = function (n) {
            var r = new BigInteger();
            if(n < 0) this.rShiftTo(-n,r); else this.lShiftTo(n,r);
            return r;
        };

        // (public) this >> n
        BigInteger.prototype.shiftRight = function (n) {
            var r = new BigInteger();
            if(n < 0) this.lShiftTo(-n,r); else this.rShiftTo(n,r);
            return r;
        };

        // (private)return index of lowest 1-bit in x, x < 2^31
        BigInteger.lbit = function (x) {
            if(x == 0) return -1;
            var r = 0;
            if((x&0xffff) == 0) { x >>= 16; r += 16; }
            if((x&0xff) == 0) { x >>= 8; r += 8; }
            if((x&0xf) == 0) { x >>= 4; r += 4; }
            if((x&3) == 0) { x >>= 2; r += 2; }
            if((x&1) == 0) ++r;
            return r;
        };

        // (public) returns index of lowest 1-bit (or -1 if none)
        BigInteger.prototype.getLowestSetBit = function () {
            for(var i = 0; i < this.t; ++i)
                if(this[i] != 0) return i * BigInteger.DB + BigInteger.lbit( this[i] );
            if(this.s < 0) return this.t * BigInteger.DB;
            return -1;
        };

        // (private) return number of 1 bits in x
        BigInteger.cbit = function (x) {
            var r = 0;
            while(x != 0) { x &= x-1; ++r; }
            return r;
        };

        // (public) return number of set bits
        BigInteger.prototype.bitCount = function () {
            var r = 0, x = this.s&BigInteger.DM;
            for(var i = 0; i < this.t; ++i) r += BigInteger.cbit(this[i]^x);
            return r;
        };

        // (public) true iff nth bit is set
        BigInteger.prototype.testBit = function (n) {
            var j = Math.floor(n/BigInteger.DB);
            if(j >= this.t) return(this.s!=0);
            return((this[j]&(1<<(n%BigInteger.DB)))!=0);
        };

        // (protected) this op (1<<n)
        BigInteger.prototype.changeBit = function (n,op) {
            var r = BigInteger.ONE.shiftLeft(n);
            this.bitwiseTo(r,op,r);
            return r;
        };

        // (public) this | (1<<n)
        //BigInteger.prototype.setBit = function (n) { return this.changeBit( n, op_or ); }; // is this supposed to be with the prefix JSBN ?? ATS 2008/11/22
        BigInteger.prototype.setBit = function (n) { return this.changeBit( n, BigInteger.op_or ); }; // FIXED 12 DEC,2008 Ats adding suffix on it

        // (public) this & ~(1<<n)
        // BigInteger.prototype.clearBit = function (n) { return this.changeBit( n, op_andnot ); }; // is this supposed to be with the prefix JSBN ?? ATS 2008/11/22
        BigInteger.prototype.clearBit = function (n) { return this.changeBit( n, BigInteger.op_andnot ); }; // FIXED 12 DEC,2008 Ats adding suffix on it

        // (public) this ^ (1<<n)
        //BigInteger.prototype.flipBit = function (n) { return this.changeBit( n, op_xor ); };// is this supposed to be with the prefix JSBN ?? ATS 2008/11/22
        BigInteger.prototype.flipBit = function (n) { return this.changeBit( n, BigInteger.op_xor ); }; // FIXED 12 DEC,2008 Ats adding suffix on it

        // (protected) r = this + a
        BigInteger.prototype.addTo = function (a,r) {
            var i = 0, c = 0, m = Math.min(a.t,this.t);
            while(i < m) {
                c += this[i]+a[i];
                r[i++] = c&BigInteger.DM;
                c >>= BigInteger.DB;
            }
            if(a.t < this.t) {
                c += a.s;
                while(i < this.t) {
                    c += this[i];
                    r[i++] = c&BigInteger.DM;
                    c >>= BigInteger.DB;
                }
                c += this.s;
            }
            else {
                c += this.s;
                while(i < a.t) {
                    c += a[i];
                    r[i++] = c&BigInteger.DM;
                    c >>= BigInteger.DB;
                }
                c += a.s;
            }
            r.s = (c<0)?-1:0;
            if(c > 0) r[i++] = c;
            else if(c < -1) r[i++] = BigInteger.DV+c;
            r.t = i;
            r.clamp();
        };

        // (public) this + a
        // BigInteger.prototype.add = function (a) { var r = new BigInteger(); this.addTo(a,r); return r; };
        BigInteger.prototype.ope_add = function (a) { var r = new BigInteger(); this.addTo(a,r); return r; };
        BigInteger.prototype[ "add" ] = BigInteger.prototype.ope_add;

        // (public) this - a
        // BigInteger.prototype.subtract = function (a) { var r = new BigInteger(); this.subTo(a,r); return r; };
        BigInteger.prototype.ope_subtract = function (a) { var r = new BigInteger(); this.subTo(a,r); return r; };
        BigInteger.prototype[ "subtract" ] = BigInteger.prototype.ope_subtract;

        // (public) this * a
        // BigInteger.prototype.multiply = function (a) { var r = new BigInteger(); this.multiplyTo(a,r); return r; };
        BigInteger.prototype.ope_multiply = function (a) { var r = new BigInteger(); this.multiplyTo(a,r); return r; };
        BigInteger.prototype[ "multiply" ] = BigInteger.prototype.ope_multiply;

        // (public) this / a
        // BigInteger.prototype.divide = function (a) { var r = new BigInteger(); this.divRemTo(a,r,null); return r; };
        BigInteger.prototype.ope_divide = function (a) { var r = new BigInteger(); this.divRemTo(a,r,null); return r; };
        BigInteger.prototype[ "divide" ] = BigInteger.prototype.ope_divide;

        // (public) this % a
        // BigInteger.prototype.remainder = function (a) { var r = new BigInteger(); this.divRemTo(a,null,r); return r; };
        BigInteger.prototype.ope_remainder = function (a) { var r = new BigInteger(); this.divRemTo(a,null,r); return r; };
        BigInteger.prototype[ "remainder" ] = BigInteger.prototype.ope_remainder;

        // (public) [this/a,this%a]
        // BigInteger.prototype.divideAndRemainder = function (a)
        BigInteger.prototype.ope_divideAndRemainder = function (a) {
            var q = new BigInteger(), r = new BigInteger();
            this.divRemTo(a,q,r);
            return new Array(q,r);
        };
        BigInteger.prototype[ "divideAndRemainder" ] = BigInteger.prototype.ope_divideAndRemainder;

        // (protected) this *= n, this >= 0, 1 < n < DV
        BigInteger.prototype.dMultiply = function (n) {
            this[this.t] = this.am(0,n-1,this,0,0,this.t);
            ++this.t;
            this.clamp();
        };

        // (protected) this += n << w words, this >= 0
        BigInteger.prototype.dAddOffset = function (n,w) {
            while(this.t <= w) this[this.t++] = 0;
            this[w] += n;
            while(this[w] >= BigInteger.DV) {
                this[w] -= BigInteger.DV;
                if(++w >= this.t) this[this.t++] = 0;
                ++this[w];
            }
        };

        // A "null" reducer
        var NullExp = function () {
            this.convert = function (x) { return x; };
            this.revert = function (x) { return x; };
            this.mulTo = function (x,y,r) { x.multiplyTo(y,r); };
            this.sqrTo = function (x,r) { x.squareTo(r); };
        };


        // (public) this^e
        BigInteger.prototype.ope_pow = function (e) { return this.exp( e, new BigInteger.NullExp() ); };
        BigInteger.prototype["pow"] = BigInteger.prototype.ope_pow;

        // (protected) r = lower n words of "this * a", a.t <= n
        // "this" should be the larger one if appropriate.
        BigInteger.prototype.multiplyLowerTo = function (a,n,r) {
            var i = Math.min(this.t+a.t,n);
            r.s = 0; // assumes a,this >= 0
            r.t = i;
            while(i > 0) r[--i] = 0;
            var j;
            for(j = r.t-this.t; i < j; ++i) r[i+this.t] = this.am(0,a[i],r,i,0,this.t);
            for(j = Math.min(a.t,n); i < j; ++i) this.am(0,a[i],r,i,0,n-i);
            r.clamp();
        };

        // (protected) r = "this * a" without lower n words, n > 0
        // "this" should be the larger one if appropriate.
        BigInteger.prototype.multiplyUpperTo = function (a,n,r) {
            --n;
            var i = r.t = this.t+a.t-n;
            r.s = 0; // assumes a,this >= 0
            while(--i >= 0) r[i] = 0;
            for(i = Math.max(n-this.t,0); i < a.t; ++i)
                r[this.t+i-n] = this.am(n-i,a[i],r,0,0,this.t+i-n);
            r.clamp();
            r.drShiftTo(1,r);
        };

        // Barrett modular reduction
        var Barrett = function (m) {
            // setup Barrett
            this.r2 = new BigInteger();
            this.q3 = new BigInteger();
            BigInteger.ONE.dlShiftTo(2*m.t,this.r2);
            this.mu = this.r2.divide(m);
            this.m = m;

            this.concert = function (x) {
                if(x.s < 0 || x.t > 2*this.m.t) return x.mod(this.m);
                else if(x.compareTo(this.m) < 0) return x;
                else { var r = new BigInteger(); x.copyTo(r); this.reduce(r); return r; }
            };

            this.revert = function (x) { return x; };

            // x = x mod m (HAC 14.42)
            this.reduce = function (x) {
                x.drShiftTo(this.m.t-1,this.r2);
                if(x.t > this.m.t+1) { x.t = this.m.t+1; x.clamp(); }
                this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);
                this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);
                while(x.compareTo(this.r2) < 0) x.dAddOffset(1,this.m.t+1);
                x.subTo(this.r2,x);
                while(x.compareTo(this.m) >= 0) x.subTo(this.m,x);
            };

            // r = x^2 mod m; x != r
            this.sqrTo = function (x,r) { x.squareTo(r); this.reduce(r); };

            // r = x*y mod m; x,y != r
            this.mulTo = function (x,y,r) { x.multiplyTo(y,r); this.reduce(r); };
        };

        // *** publish ***
        BigInteger.Barrett = Barrett;

        /*
         // (public) this^e % m (HAC 14.85)
         BigInteger.prototype.modPow = function (e,m) {
         var i = e.bitLength(), k, r = new BigInteger(1), z;
         if(i <= 0) return r;
         else if(i < 18) k = 1;
         else if(i < 48) k = 3;
         else if(i < 144) k = 4;
         else if(i < 768) k = 5;
         else k = 6;
         if(i < 8)
         z = new BigInteger.Classic(m);
         else if(m.isEven())
         z = new BigInteger.Barrett(m);
         else
         z = new BigInteger.Montgomery(m);

         // precomputation
         var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
         g[1] = z.convert(this);
         if(k > 1) {
         var g2 = new BigInteger();
         z.sqrTo(g[1],g2);
         while(n <= km) {
         g[n] = new BigInteger();
         z.mulTo(g2,g[n-2],g[n]);
         n += 2;
         }
         }

         var j = e.t-1, w, is1 = true, r2 = new BigInteger(), t;
         i = BigInteger.nbits(e[j])-1;
         while(j >= 0) {
         if(i >= k1) w = (e[j]>>(i-k1))&km;
         else {
         w = (e[j]&((1<<(i+1))-1))<<(k1-i);
         if(j > 0) w |= e[j-1]>>(BigInteger.DB+i-k1);
         }

         n = k;
         while((w&1) == 0) { w >>= 1; --n; }
         if((i -= n) < 0) { i += BigInteger.DB; --j; }
         if(is1) {	// ret == 1, don't bother squaring or multiplying it
         g[w].copyTo(r);
         is1 = false;
         }
         else {
         while(n > 1) { z.sqrTo(r,r2); z.sqrTo(r2,r); n -= 2; }
         if(n > 0) z.sqrTo(r,r2); else { t = r; r = r2; r2 = t; }
         z.mulTo(r2,g[w],r);
         }

         while(j >= 0 && (e[j]&(1<<i)) == 0) {
         z.sqrTo(r,r2); t = r; r = r2; r2 = t;
         if(--i < 0) { i = BigInteger.DB-1; --j; }
         }
         }
         return z.revert(r);
         };
         */

        BigInteger.prototype.modPow = function (e,m) {
            var et = ElapsedTime .create();

            et.start( "modPow" );

            var i = e.bitLength(), k, r = new BigInteger(1), z;
            if(i <= 0) return r;
            else if(i < 18) k = 1;
            else if(i < 48) k = 3;
            else if(i < 144) k = 4;
            else if(i < 768) k = 5;
            else k = 6;
            if(i < 8) {
                // log( "modPow.Classic" );
                z = new BigInteger.Classic(m);
            } else if(m.isEven()) {
                // log( "modPow.Barrett" );
                z = new BigInteger.Barrett(m);
            } else {
                // log( "modPow.Montgomery" );
                z = new BigInteger.Montgomery(m);
            }

            // precomputation
            var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
            g[1] = z.convert(this);
            if(k > 1) {
                var g2 = new BigInteger();
                z.sqrTo(g[1],g2);
                while(n <= km) {
                    g[n] = new BigInteger();
                    z.mulTo(g2,g[n-2],g[n]);
                    n += 2;
                }
            }


            var et1 = ElapsedTime .create();
            var et2 = ElapsedTime .create();
            var et3 = ElapsedTime .create();
            var et4 = ElapsedTime .create();
            var j = e.t-1, w, is1 = true, r2 = new BigInteger(), t;
            i = BigInteger.nbits(e[j])-1;

            while(j >= 0) {
                et1.start( "modPow1" );
                if ( i >= k1) {
                    w = ( e[j] >> ( i - k1 ) ) & km;
                } else {
                    w = ( e[j] & ( ( 1 << (i + 1 ) ) - 1 ) ) << ( k1 -i );
                    if ( j > 0 ) w |= e[j-1] >> ( BigInteger.DB + i - k1 );
                }

                n = k;
                while((w&1) == 0) {
                    w >>= 1; --n;
                }

                if ( (i -= n) < 0) {
                    i += BigInteger.DB;
                    --j;
                }
                et1.stop();

                et2.start( "modPow2" );
                et2.stop();

                et3.start( "modPow3" );
                if( is1 ) {	// ret == 1, don't bother squaring or multiplying it
                    g[w].copyTo(r);
                    is1 = false;
                } else {
                    while(n > 1) {
                        z.sqrTo(r,r2);
                        z.sqrTo(r2,r);
                        n -= 2;
                    }
                    if(n > 0){
                        z.sqrTo(r,r2);
                    } else {
                        t = r;
                        r = r2;
                        r2 = t;
                    }
                    z.mulTo( r2, g[w], r );
                }
                et3.stop()

                et4.start( "modPow4" );
                while ( j >= 0 && ( e[j] & ( 1 << i ) ) == 0 ) {
                    z.sqrTo(r,r2);
                    t = r;
                    r = r2;
                    r2 = t;
                    if(--i < 0) {
                        i = BigInteger.DB-1;
                        --j;
                    }
                }
                et4.stop()
            }

            et.stop();
            return z.revert(r);
        };

        // (public) gcd(this,a) (HAC 14.54)
        BigInteger.prototype.gcd = function (a) {
            var x = (this.s<0)?this.negate():this.clone();
            var y = (a.s<0)?a.negate():a.clone();
            if(x.compareTo(y) < 0) { var t = x; x = y; y = t; }
            var i = x.getLowestSetBit(), g = y.getLowestSetBit();
            if(g < 0) return x;
            if(i < g) g = i;
            if(g > 0) {
                x.rShiftTo(g,x);
                y.rShiftTo(g,y);
            }
            while(x.signum() > 0) {
                if((i = x.getLowestSetBit()) > 0) x.rShiftTo(i,x);
                if((i = y.getLowestSetBit()) > 0) y.rShiftTo(i,y);
                if(x.compareTo(y) >= 0) {
                    x.subTo(y,x);
                    x.rShiftTo(1,x);
                }
                else {
                    y.subTo(x,y);
                    y.rShiftTo(1,y);
                }
            }
            if(g > 0) y.lShiftTo(g,y);
            return y;
        };

        // (protected) this % n, n < 2^26
        BigInteger.prototype.modInt = function (n) {
            if(n <= 0) return 0;
            var d = BigInteger.DV % n, r = (this.s<0)?n-1:0;
            if(this.t > 0)
                if(d == 0) r = this[0]%n;
                else for(var i = this.t-1; i >= 0; --i) r = (d*r+this[i])%n;
            return r;
        };

        // (public) 1/this % m (HAC 14.61)
        BigInteger.prototype.modInverse = function (m) {
            var ac = m.isEven();
            if((this.isEven() && ac) || m.signum() == 0) return BigInteger.ZERO;
            var u = m.clone(), v = this.clone();
            var a = new BigInteger(1), b = new BigInteger(0), c = new BigInteger(0), d = new BigInteger(1);
            while(u.signum() != 0) {
                while(u.isEven()) {
                    u.rShiftTo(1,u);
                    if(ac) {
                        if(!a.isEven() || !b.isEven()) { a.addTo(this,a); b.subTo(m,b); }
                        a.rShiftTo(1,a);
                    }
                    else if(!b.isEven()) b.subTo(m,b);
                    b.rShiftTo(1,b);
                }
                while(v.isEven()) {
                    v.rShiftTo(1,v);
                    if(ac) {
                        if(!c.isEven() || !d.isEven()) { c.addTo(this,c); d.subTo(m,d); }
                        c.rShiftTo(1,c);
                    }
                    else if(!d.isEven()) d.subTo(m,d);
                    d.rShiftTo(1,d);
                }
                if(u.compareTo(v) >= 0) {
                    u.subTo(v,u);
                    if(ac) a.subTo(c,a);
                    b.subTo(d,b);
                }
                else {
                    v.subTo(u,v);
                    if(ac) c.subTo(a,c);
                    d.subTo(b,d);
                }
            }
            if(v.compareTo( BigInteger.ONE ) != 0) return BigInteger.ZERO;
            if(d.compareTo(m) >= 0) return d.subtract(m);
            if(d.signum() < 0) d.addTo(m,d); else return d;
            // MODIFIED BY ATS 2008/11/22 FOR COMPATIBILITY TO Flash ActionScript
            // if(d.signum() < 0) return d.add(m); else return d;
            if(d.signum() < 0) return d.ope_add(m); else return d;
        };

        // packages.lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
        // packages.lplim = (1<<26)/packages.lowprimes[packages.lowprimes.length-1];
        var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
        var lplim = (1<<26)/lowprimes[lowprimes.length-1];
        BigInteger.lowprimes = lowprimes;
        BigInteger.lplim = lplim;

        // (public) test primality with certainty >= 1-.5^t
        BigInteger.prototype.isProbablePrime = function (t) {
            var et1 = ElapsedTime.create();
            et1.start("isProbablePrime");

            var i, x = this.abs();
            if( x.t == 1 && x[0] <= lowprimes[ lowprimes.length-1 ] ) {
                for ( i = 0; i < lowprimes.length; ++i )
                    if ( x[0] == lowprimes[i] ) return true;
                return false;
            }

            if ( x.isEven() )
                return false;

            i = 1;
            while ( i < lowprimes.length ) {
                var m = lowprimes[i];
                var j = i+1;
                while( j < lowprimes.length && m < lplim ) {
                    m *= lowprimes[j++];
                }

                m = x.modInt(m);
                while( i < j ) {
                    if( m % lowprimes[i++] == 0 )
                        return false;
                }
            }
            // return x.millerRabin(t);
            var et2 = ElapsedTime.create();
            et2.start("isProbablePrime.millerRabin");
            var result = x.millerRabin(t);
            et2.stop();
            et1.stop();
            return result;
        };

        // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
        BigInteger.prototype.millerRabin = function ( t ) {
            var n1 = this.subtract( BigInteger.ONE );
            var k = n1.getLowestSetBit();
            if ( k <= 0)
                return false;

            var r = n1.shiftRight(k);
            t = (t+1) >> 1;

            if ( t > lowprimes.length )
                t = lowprimes.length;

            var a = new BigInteger();
            for ( var i = 0; i < t; ++i ) {
                a.fromInt( lowprimes[i] );
                var y = a.modPow( r,this );
                if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
                    var j = 1;
                    while ( j++ < k && y.compareTo( n1 ) != 0 ) {
                        y = y.modPowInt( 2, this );
                        if ( y.compareTo( BigInteger.ONE ) == 0 )
                            return false;
                    }
                    if ( y.compareTo( n1 ) != 0 )
                        return false;
                }
            }
            return true;
        };

        ///////////////////////////////////////////////
        // export
        ///////////////////////////////////////////////

        // exporting inner class
        BigInteger.NullExp = NullExp;

        // __package( packages, path ).BigInteger.NullExp = NullExp;



        // BigInteger interfaces not implemented in jsbn:

        // BigInteger(int signum, byte[] magnitude)
        // double doubleValue()
        // float floatValue()
        // int hashCode()
        // long longValue()
        // static BigInteger valueOf(long val)

    }
    initBigInteger2( self );

    /*
     * BigInteger.init3.js
     * A class which is a representation of variable lengthed integer.
     * Functions for Asynchronous Excecution
     *
     * See BigInteger.readme.txt for further information.
     *
     * ACKNOWLEDGMENT
     *
     *     This class is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     *
     *     Several modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Asynchronous Execution Feauture.
     *     - Modified some names of methods for use in Flash ActionScript
     *     - Fixed Some trivial bugs.
     */
    function initBigInteger3( packages ) {
        __unit( "BigInteger.init3.js" );
        __uses( "packages.js" );
        // __uses( "nonstructured.js" );  // See ... (1)
        __uses( "BigInteger.init1.js" );
        __uses( "BigInteger.init2.js" );

        // (1) nonstructured.js
        // This file relies on nonstructured.js
        // See http://oka.nu/lib/nonstructured/nonstructured.readme.txt

        ///////////////////////////////////////
        // import
        ////////////////////////////////////////
        // var BigInteger = __package( packages,path ).BigInteger;
        var BigInteger = __import( packages, "titaniumcore.crypto.BigInteger" );

        var lowprimes  = BigInteger.lowprimes;
        var lplim      = BigInteger.lplim;


        ///////////////////////////////////////
        // implementation
        ////////////////////////////////////////

        BigInteger.prototype.stepping_fromNumber1 = function( bitLength, certainty, rnd ) {
            var self=this;
            BigInteger.log("stepping_fromNumber1");

            /*
             // ver1
             return function() {
             BigInteger.log("stepping_fromNumber1.2");
             // new BigInteger(int,int,RNG)
             var et = ElapsedTime.create();
             et.start( "fromNumber1" );
             if( bitLength < 2 ) {
             self.fromInt( 1 );
             } else {
             self.fromNumber2( bitLength, rnd );

             if( ! self.testBit( bitLength-1 ) )  // force MSB set
             self.bitwiseTo( BigInteger.ONE.shiftLeft( bitLength - 1 ), BigInteger.op_or, self );

             if( self.isEven() )
             self.dAddOffset( 1,0 ); // force odd

             var et2= ElapsedTime.create();
             et2.start( "fromNumber1.loop" );
             while( ! self.isProbablePrime( certainty ) ) {
             self.dAddOffset( 2, 0 );
             if( self.bitLength() > bitLength ) {
             self.subTo( BigInteger.ONE.shiftLeft(bitLength-1), self );
             }
             }
             et2.stop();
             }
             et.stop();
             return BREAK;
             };
             */

            var NULL_CHECKER = {
                toString : function() {
                    return "*** FAILED TO RETRIEVE RESULT ***";
                }
            };

            // ver2
            return function() {
                BigInteger.log( "stepping_fromNumber1.1" );
                // new BigInteger(int,int,RNG)
                if( bitLength < 2 ) {
                    self.fromInt( 1 );
                    return BREAK;
                } else {
                    self.fromNumber2( bitLength, rnd );

                    if( ! self.testBit( bitLength-1 ) )  // force MSB set
                        self.bitwiseTo( BigInteger.ONE.shiftLeft( bitLength - 1 ), BigInteger.op_or, self );

                    if( self.isEven() )
                        self.dAddOffset( 1,0 ); // force odd

                    BigInteger.log( "stepping_fromNumber1.2" );
                    return [
                        // // ver1>>
                        // function() {
                        // 	BigInteger.log("stepping_fromNumber1.2.1");
                        // 	var et = ElapsedTime.create();
                        // 	et.start("stepping_fromNumber1.2.1");
                        // 	if ( self.isProbablePrime( certainty )  ) {
                        // 		et.stop();
                        // 		return EXIT;
                        // 	} else {
                        // 		et.stop();
                        // 		return BREAK;
                        // 	}
                        // },
                        // // ver1<<

                        // ver2 >>
                        function(scope,param,subparam) {
                            subparam.result = NULL_CHECKER;
                            BigInteger.log( "stepping_fromNumber1.2.1.1: calling stepping_isProbablePrime" );
                            return self.stepping_isProbablePrime( certainty ).BREAK();
                        },
                        function(scope,param,subparam) {
                            BigInteger.log( "stepping_fromNumber1.2.1.2: returned stepping_isProbablePrime:" + subparam.result );
                            if ( subparam.result == null || subparam.result == NULL_CHECKER ) {
                                BigInteger.err( "stepping_fromNumber1.2.1.2: returned stepping_isProbablePrime: subparam.result == WARNING NULL " + subparam.result );
                            }
                            var result = subparam.result;
                            if ( result ) {
                                return EXIT;
                            } else {
                                return BREAK;
                            }
                        },
                        // ver2 <<

                        function() {
                            BigInteger.log("stepping_fromNumber1.2.2");
                            self.dAddOffset( 2, 0 );
                            if( self.bitLength() > bitLength ) {
                                self.subTo( BigInteger.ONE.shiftLeft(bitLength-1), self );
                            }
                            return BREAK;
                        },
                        AGAIN
                    ].BREAK();
                }
            };
        }

        // (public) test primality with certainty >= 1-.5^t
        /* ver1
         BigInteger.prototype.stepping_isProbablePrime = function (t) {
         BigInteger.log( "stepping_isProbablePrime:create" );
         var self = this;
         return function(scope,param,subparam) {
         BigInteger.log("stepping_isProbablePrime:called:" + param.result );

         var et1 = ElapsedTime.create();
         et1.start( "stepping_isProbablePrime" );

         var i, x = self.abs();
         if( x.t == 1 && x[0] <= lowprimes[ lowprimes.length-1 ] ) {
         for ( i = 0; i < lowprimes.length; ++i )
         if ( x[0] == lowprimes[i] ) {
         //return true;
         param.result = true;
         return BREAK;
         }
         // return false;
         param.result = false;
         return BREAK;
         }

         if ( x.isEven() ) {
         // return false;
         param.result = false;
         return BREAK;
         }

         i = 1;
         while ( i < lowprimes.length ) {
         var m = lowprimes[i];
         var j = i+1;
         while( j < lowprimes.length && m < lplim ) {
         m *= lowprimes[j++];
         }

         m = x.modInt(m);
         while( i < j ) {
         if( m % lowprimes[i++] == 0 ) {
         // return false;
         param.result = false;
         return BREAK;
         }
         }
         }

         // return x.millerRabin(t);
         var et2 = ElapsedTime.create();
         BigInteger.log("isProbablePrime:calling:"  );
         et2.start("isProbablePrime.millerRabin");
         var result = x.millerRabin(t);
         et2.stop();
         et1.stop();
         param.result = result;
         return BREAK;
         };
         };
         */

        // ver2>>
        BigInteger.prototype.stepping_isProbablePrime = function (t) {
            BigInteger.log( "stepping_isProbablePrime:create" );
            var self = this;
            var x = self.abs();
            var et1 = ElapsedTime.create();
            var et2 = ElapsedTime.create();
            return [
                function(scope,param,subparam) {
                    BigInteger.log("stepping_isProbablePrime No.1: " );
                    // if ( param.result == null ) {
                    // 	BigInteger.err("stepping_isProbablePrime No.1: WARNING param.result=null / param="+param );
                    // }

                    et1.start( "stepping_isProbablePrime" );

                    var i;
                    if( x.t == 1 && x[0] <= lowprimes[ lowprimes.length-1 ] ) {
                        for ( i = 0; i < lowprimes.length; ++i )
                            if ( x[0] == lowprimes[i] ) {
                                BigInteger.log( "stepping_isProbablePrime.1 EXIT" );
                                //return true;
                                param.result = true;
                                return EXIT;
                            }
                        BigInteger.log( "stepping_isProbablePrime.2 EXIT" );
                        // return false;
                        param.result = false;
                        return EXIT;
                    }

                    if ( x.isEven() ) {
                        BigInteger.log( "stepping_isProbablePrime.3 EXIT" );
                        // return false;
                        param.result = false;
                        return EXIT;
                    }

                    i = 1;
                    while ( i < lowprimes.length ) {
                        var m = lowprimes[i];
                        var j = i+1;
                        while( j < lowprimes.length && m < lplim ) {
                            m *= lowprimes[j++];
                        }

                        m = x.modInt(m);
                        while( i < j ) {
                            if( m % lowprimes[i++] == 0 ) {
                                BigInteger.log( "stepping_isProbablePrime:4 EXIT" );
                                // return false;
                                param.result = false;
                                return EXIT;
                            }
                        }
                    }

                    BigInteger.log( "stepping_isProbablePrime:5 BREAK" );
                    return BREAK;
                },

                // // ver1>>
                // function(scope,param,subparam) {
                // 	BigInteger.log("stepping_isProbablePrime No.2:called:" + param.result );
                // 	// return x.millerRabin(t);
                // 	et2.start("isProbablePrime.millerRabin");
                // 	var result = x.millerRabin(t);
                // 	et2.stop();
                // 	et1.stop();
                // 	param.result = result;
                // 	return BREAK;
                // },
                // // ver1<<

                // ver2>>
                function(scope,param,subparam) {
                    BigInteger.log( "stepping_isProbablePrime No.2: calling millerRabin : subparam.result=" + subparam.result );
                    et2.start("isProbablePrime.millerRabin");
                    subparam.result=null;
                    return x.stepping_millerRabin(t).BREAK();
                },
                function(scope,param,subparam) {
                    BigInteger.log( "stepping_isProbablePrime No.3: returning millerRabin : subparam.result=" + subparam.result );
                    et2.stop();
                    et1.stop();
                    param.result = subparam.result;
                    BigInteger.log( "stepping_isProbablePrime No.3: param.result=" + param.result );
                    return BREAK;
                },
                // ver2<<
                EXIT
            ].NAME("stepping_isProbablePrime");
        };
        // ver2<<



        // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
        BigInteger.prototype.stepping_millerRabin = function ( t ) {
            BigInteger.log( "stepping_millerRabin" );
            var self=this;

            // VER1>>
            /*
             return function( score, param, subparam ) {
             var n1 = self.subtract( BigInteger.ONE );
             var k = n1.getLowestSetBit();
             if ( k <= 0) {
             // return false;
             param.result = false;
             return BREAK;
             }

             var r = n1.shiftRight(k);
             t = (t+1) >> 1;

             if ( t > lowprimes.length )
             t = lowprimes.length;

             var a = new BigInteger();
             for ( var i = 0; i < t; ++i ) {
             a.fromInt( lowprimes[i] );
             var y = a.modPow( r,self );
             if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
             var j = 1;
             while ( j++ < k && y.compareTo( n1 ) != 0 ) {
             y = y.modPowInt( 2, self );
             if ( y.compareTo( BigInteger.ONE ) == 0 ) {
             // return false;
             param.result = false;
             return BREAK;
             }
             }
             if ( y.compareTo( n1 ) != 0 ) {
             // return false;
             param.result = false;
             return BREAK;
             }
             }
             }
             // return true;
             param.result = true;
             return BREAK;
             };
             */
            // VER1<<

            // VER2>>

            // LOOP1
            var n1;
            var k;
            var r;
            var a;

            // LOOP2
            var i=0;
            var y;
            return [
                function( scope, param, subparam ) {
                    BigInteger.log( "stepping_millerRabin:No1" );
                    n1 = self.subtract( BigInteger.ONE );
                    k = n1.getLowestSetBit();
                    if ( k <= 0) {
                        // return false;
                        param.result = false;
                        //return BREAK;
                        return EXIT;
                    }

                    r = n1.shiftRight(k);
                    t = (t+1) >> 1;

                    if ( t > lowprimes.length )
                        t = lowprimes.length;

                    a = new BigInteger();

                    return BREAK;
                },

                // // ver1
                // function( scope, param, subparam ) {
                // 	for ( var i = 0; i < t; ++i ) {
                // 		a.fromInt( lowprimes[i] );
                //
                // 		var y = a.modPow( r,self );
                // 		if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
                // 			var j = 1;
                // 			while ( j++ < k && y.compareTo( n1 ) != 0 ) {
                // 				y = y.modPowInt( 2, self );
                // 				if ( y.compareTo( BigInteger.ONE ) == 0 ) {
                // 					// return false;
                // 					param.result = false;
                // 					// return BREAK;
                // 					return EXIT;
                // 				}
                // 			}
                // 			if ( y.compareTo( n1 ) != 0 ) {
                // 				// return false;
                // 				param.result = false;
                // 				// return BREAK;
                // 				return EXIT;
                // 			}
                // 		}
                // 	}
                // 	return BREAK;
                // },
                // // ver1

                // // ver2
                // function( scope, param, subparam ) {
                // 	for ( var i = 0; i < t; ++i ) {
                // 		a.fromInt( lowprimes[i] );
                //
                // 		var y = a.modPow( r,self );
                // 		if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
                // 			var j = 1;
                // 			while ( j++ < k && y.compareTo( n1 ) != 0 ) {
                // 				y = y.modPowInt( 2, self );
                // 				if ( y.compareTo( BigInteger.ONE ) == 0 ) {
                // 					// return false;
                // 					param.result = false;
                // 					// return BREAK;
                // 					// return EXIT;
                // 					return LABEL("LOOP1").EXIT();
                // 				}
                // 			}
                // 			if ( y.compareTo( n1 ) != 0 ) {
                // 				// return false;
                // 				param.result = false;
                // 				// return BREAK;
                // 				// return EXIT;
                // 				return LABEL("LOOP1").EXIT();
                // 			}
                // 		}
                // 	}
                // 	// return BREAK;
                // 	return LABEL("LOOP1").BREAK();
                // },
                // // ver2

                // ver3
                // function( scope, param, subparam ) {
                // for ( var i = 0; i < t; ++i ) {
                [
                    function() {
                        BigInteger.log( "stepping_millerRabin:No2.1" );
                        if ( i < t ) {
                            BigInteger.log( "stepping_millerRabin:No2.1.1" );
                            return BREAK;
                        } else {
                            BigInteger.log( "stepping_millerRabin:No2.1.2" );
                            return EXIT;
                        }
                    },
                    function() {
                        BigInteger.log( "stepping_millerRabin:No2.2" );
                        a.fromInt( lowprimes[i] );
                        return BREAK;
                    },
                    // // ver1>>
                    // function() {
                    // 	/*var*/ y = a.modPow( r,self );
                    // 	return BREAK;
                    // },
                    // // ver1<<
                    // ver2>>>
                    function() {
                        BigInteger.log( "stepping_millerRabin:No2.3 : calling stepping_modPow()")
                        return a.stepping_modPow(r,self).BREAK();
                    },
                    function(scope,param,subparam) {
                        y = subparam.result;
                        BigInteger.log( "stepping_millerRabin:No2.4 : returned from stepping_modPow() result=" + y)
                        return BREAK;
                    },
                    // ver2<<<

                    function (scope,param,subparam) {
                        BigInteger.log( "stepping_millerRabin:No2.5 " );
                        if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
                            BigInteger.log( "stepping_millerRabin:No2.5.1 " );
                            var j = 1;
                            while ( j++ < k && y.compareTo( n1 ) != 0 ) {
                                BigInteger.log( "stepping_millerRabin:No2.5.2 j=" + j );
                                y = y.modPowInt( 2, self );
                                if ( y.compareTo( BigInteger.ONE ) == 0 ) {
                                    BigInteger.log( "stepping_millerRabin:No2.5.3 " );
                                    // return false;
                                    param.result = false;
                                    // return BREAK;
                                    // return EXIT;
                                    return LABEL("LOOP1").EXIT();
                                }
                            }
                            if ( y.compareTo( n1 ) != 0 ) {
                                // return false;
                                param.result = false;
                                // return BREAK;
                                // return EXIT;
                                BigInteger.log( "stepping_millerRabin:No2.5.4 " + param );
                                return LABEL("LOOP1").EXIT();
                            }
                            BigInteger.log( "stepping_millerRabin:No2.5.5 " );
                        }
                        BigInteger.log( "stepping_millerRabin:No2.5.2 " );
                        return BREAK;
                    },
                    function () {
                        BigInteger.log( "stepping_millerRabin:No2.6" );
                        ++i;
                        return BREAK;
                    },
                    AGAIN
                ],
                // }
                // return BREAK;
                // return LABEL("LOOP1").BREAK();
                //},
                //ver3

                function ( scope, param, subparam ) {
                    // return true;
                    param.result = true;
                    BigInteger.log( "stepping_millerRabin:No3 : param.result=" + param.result );
                    // BigInteger.log( "stepping_millerRabin:No3" );
                    // trace( "stepping_millerRabin:No3 : param.result=" + param.result );
                    // return BREAK;
                    return EXIT;
                },
                AGAIN
            ].IDENTIFY("LOOP1");
            // VER2 <<
        };


        // // ver1
        // BigInteger.prototype.stepping_modPow = function (e,m) {
        // 	var self=this;
        // 	return function( scope, param, subparam ) {
        // 		var et = ElapsedTime .create();
        //
        // 		et.start( "modPow" );
        //
        // 		var i = e.bitLength(), k, r = new BigInteger(1), z;
        // 		if ( i <= 0 ){
        // 			// return r;
        // 			param.result = r;
        // 			return BREAK;
        // 		}
        // 		else if(i < 18) k = 1;
        // 		else if(i < 48) k = 3;
        // 		else if(i < 144) k = 4;
        // 		else if(i < 768) k = 5;
        // 		else k = 6;
        // 		if(i < 8) {
        // 			// BigInteger.log( "modPow.Classic" );
        // 			z = new BigInteger.Classic(m);
        // 		} else if(m.isEven()) {
        // 			// BigInteger.log( "modPow.Barrett" );
        // 			z = new BigInteger.Barrett(m);
        // 		} else {
        // 			// BigInteger.log( "modPow.Montgomery" );
        // 			z = new BigInteger.Montgomery(m);
        // 		}
        //
        // 		// precomputation
        // 		var g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
        // 		g[1] = z.convert(self);
        // 		if ( k > 1 ) {
        // 			var g2 = new BigInteger();
        // 			z.sqrTo(g[1],g2);
        // 			while(n <= km) {
        // 				g[n] = new BigInteger();
        // 				z.mulTo(g2,g[n-2],g[n]);
        // 				n += 2;
        // 			}
        // 		}
        //
        //
        // 		var et1 = ElapsedTime .create();
        // 		var et2 = ElapsedTime .create();
        // 		var et3 = ElapsedTime .create();
        // 		var et4 = ElapsedTime .create();
        // 		var j = e.t-1, w, is1 = true, r2 = new BigInteger(), t;
        // 		i = BigInteger.nbits(e[j])-1;
        //
        // 		while(j >= 0) {
        // 			et1.start( "modPow1" );
        // 			if ( i >= k1) {
        // 				w = ( e[j] >> ( i - k1 ) ) & km;
        // 			} else {
        // 				w = ( e[j] & ( ( 1 << (i + 1 ) ) - 1 ) ) << ( k1 -i );
        // 				if ( j > 0 ) w |= e[j-1] >> ( BigInteger.DB + i - k1 );
        // 			}
        //
        // 			n = k;
        // 			while((w&1) == 0) {
        // 				w >>= 1; --n;
        // 			}
        //
        // 			if ( (i -= n) < 0) {
        // 				i += BigInteger.DB;
        // 				--j;
        // 			}
        // 			et1.stop();
        //
        // 			et2.start( "modPow2" );
        // 			et2.stop();
        //
        // 			et3.start( "modPow3" );
        // 			if( is1 ) {	// ret == 1, don't bother squaring or multiplying it
        // 				g[w].copyTo(r);
        // 				is1 = false;
        // 			} else {
        // 				while(n > 1) {
        // 					z.sqrTo(r,r2);
        // 					z.sqrTo(r2,r);
        // 					n -= 2;
        // 				}
        // 				if(n > 0){
        // 					z.sqrTo(r,r2);
        // 				} else {
        // 					t = r;
        // 					r = r2;
        // 					r2 = t;
        // 				}
        // 				z.mulTo( r2, g[w], r );
        // 			}
        // 			et3.stop()
        //
        // 			et4.start( "modPow4" );
        // 			while ( j >= 0 && ( e[j] & ( 1 << i ) ) == 0 ) {
        // 				z.sqrTo(r,r2);
        // 				t = r;
        // 				r = r2;
        // 				r2 = t;
        // 				if(--i < 0) {
        // 					i = BigInteger.DB-1;
        // 					--j;
        // 				}
        // 			}
        // 			et4.stop()
        // 		}
        //
        // 		et.stop();
        // 		// return z.revert(r);
        // 		param.result = z.revert(r);
        // 		return BREAK;
        // 	};
        // };
        // // ver1

        // ver2
        BigInteger.prototype.stepping_modPow = function (e,m) {
            var et = ElapsedTime .create();
            var et1 = ElapsedTime .create();
            var et2 = ElapsedTime .create();
            var et3 = ElapsedTime .create();
            var et4 = ElapsedTime .create();
            var self=this;

            var i,k,r,z;
            var g;
            var j,w,is1,r2,t;
            return [
                function( scope, param, subparam ) {
                    BigInteger.log("stepping_modPow 1:" );
                    et.start( "modPow" );

                    // var i = e.bitLength(), k, r = new BigInteger(1), z;
                    i = e.bitLength(); r = new BigInteger(1);

                    if ( i <= 0 ){
                        // return r;
                        param.result = r;
                        // return BREAK;
                        return EXIT;
                    }
                    else if(i < 18) k = 1;
                    else if(i < 48) k = 3;
                    else if(i < 144) k = 4;
                    else if(i < 768) k = 5;
                    else k = 6;
                    if(i < 8) {
                        // BigInteger.log( "modPow.Classic" );
                        z = new BigInteger.Classic(m);
                    } else if(m.isEven()) {
                        // BigInteger.log( "modPow.Barrett" );
                        z = new BigInteger.Barrett(m);
                    } else {
                        // BigInteger.log( "modPow.Montgomery" );
                        z = new BigInteger.Montgomery(m);
                    }

                    // precomputation
                    /*var*/ g = new Array(), n = 3, k1 = k-1, km = (1<<k)-1;
                    g[1] = z.convert(self);
                    if ( k > 1 ) {
                        var g2 = new BigInteger();
                        z.sqrTo(g[1],g2);
                        while(n <= km) {
                            g[n] = new BigInteger();
                            z.mulTo(g2,g[n-2],g[n]);
                            n += 2;
                        }
                    }


                    // /*var*/ j = e.t-1, w, is1 = true, r2 = new BigInteger(), t;
                    j = e.t-1; is1 = true; r2 = new BigInteger();

                    i = BigInteger.nbits(e[j])-1;

                    //
                    return BREAK;
                },
                function( scope, param, subparam ) {
                    BigInteger.log("stepping_modPow 2: j="+j );
                    // while(j >= 0) {
                    if ( j >= 0 ) {
                        et1.start( "modPow1" );
                        if ( i >= k1) {
                            w = ( e[j] >> ( i - k1 ) ) & km;
                        } else {
                            w = ( e[j] & ( ( 1 << (i + 1 ) ) - 1 ) ) << ( k1 -i );
                            if ( j > 0 ) w |= e[j-1] >> ( BigInteger.DB + i - k1 );
                        }

                        n = k;
                        while((w&1) == 0) {
                            w >>= 1; --n;
                        }

                        if ( (i -= n) < 0) {
                            i += BigInteger.DB;
                            --j;
                        }
                        et1.stop();

                        et2.start( "modPow2" );
                        et2.stop();

                        et3.start( "modPow3" );
                        if( is1 ) {	// ret == 1, don't bother squaring or multiplying it
                            g[w].copyTo(r);
                            is1 = false;
                        } else {
                            while(n > 1) {
                                z.sqrTo(r,r2);
                                z.sqrTo(r2,r);
                                n -= 2;
                            }
                            if(n > 0){
                                z.sqrTo(r,r2);
                            } else {
                                t = r;
                                r = r2;
                                r2 = t;
                            }
                            z.mulTo( r2, g[w], r );
                        }
                        et3.stop()

                        et4.start( "modPow4" );
                        while ( j >= 0 && ( e[j] & ( 1 << i ) ) == 0 ) {
                            z.sqrTo(r,r2);
                            t = r;
                            r = r2;
                            r2 = t;
                            if(--i < 0) {
                                i = BigInteger.DB-1;
                                --j;
                            }
                        }
                        et4.stop();
                        return CONTINUE;
                    } else {
                        return BREAK;
                    }
                    // }
                    // return BREAK;
                },
                function(scope,param,subparam) {
                    et.stop();
                    // return z.revert(r);
                    param.result = z.revert(r);
                    BigInteger.log("stepping_modPow 3:result=" + param.result );
                    //return BREAK;
                    return EXIT;
                },
                AGAIN
            ];
        };
        // ver2<<


        // // (protected) true if probably prime (HAC 4.24, Miller-Rabin)
        // BigInteger.prototype.millerRabin = function ( t ) {
        // 	BigInteger.log( "millerRabin" );
        // 	var n1 = this.subtract( BigInteger.ONE );
        // 	var k = n1.getLowestSetBit();
        // 	if ( k <= 0)
        // 		return false;
        //
        // 	var r = n1.shiftRight(k);
        // 	t = (t+1) >> 1;
        //
        // 	if ( t > lowprimes.length )
        // 		t = lowprimes.length;
        //
        // 	var a = new BigInteger();
        // 	for ( var i = 0; i < t; ++i ) {
        // 		a.fromInt( lowprimes[i] );
        // 		var y = a.modPow( r,this );
        // 		if( y.compareTo( BigInteger.ONE ) != 0 && y.compareTo( n1 ) != 0 ) {
        // 			var j = 1;
        // 			while ( j++ < k && y.compareTo( n1 ) != 0 ) {
        // 				y = y.modPowInt( 2, this );
        // 				if ( y.compareTo( BigInteger.ONE ) == 0 )
        // 					return false;
        // 			}
        // 			if ( y.compareTo( n1 ) != 0 )
        // 				return false;
        // 		}
        // 	}
        // 	return true;
        // };

        // (protected) this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79)
        BigInteger.prototype.exp = function (e,z) {
            // trace( "exp() e "+ e + "/z="+z );
            if(e > 0xffffffff || e < 1) return BigInteger.ONE;
            var r = new BigInteger(), r2 = new BigInteger(), g = z.convert(this), i = BigInteger.nbits(e)-1;
            // BigInteger.log( "r="  + r );
            // BigInteger.log( "r2=" + r2);
            // BigInteger.log( "g="  + g );
            // BigInteger.log( "i="  + i );
            g.copyTo(r);
            // BigInteger.log( "g="  + g.toString(16) );
            // BigInteger.log( "r="  + r.toString(16) );
            while(--i >= 0) {
                z.sqrTo(r,r2);
                // trace( "i="+i +" " + r2.toString(16) );
                // if((e&(1<<i)) > 0) z.mulTo(r2,g,r);
                // else { var t = r; r = r2; r2 = t; }
                if ( ( e & ( 1 << i ) ) > 0 ) {
                    z.mulTo(r2,g,r);
                    // trace( "*i="+i +" " + r.toString(16) );
                } else {
                    var t = r; r = r2; r2 = t;
                }
            }
            return z.revert(r);
        };

        // (public) this^e % m, 0 <= e < 2^32
        BigInteger.prototype.modPowInt = function (e,m) {
            var z;
            if(e < 256 || m.isEven()) z = new BigInteger.Classic(m); else z = new BigInteger.Montgomery(m);
            return this.exp(e,z);
        };



    }
    initBigInteger3( self );

    /*
     * RSA.init1.js
     * An implementation of RSA public-key cryptography
     * Methods for RSA public key operation.
     *
     * See RSA.readme.txt for further information.
     *
     *
     * ACKNOWLEDGMENT
     *
     *     This library is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     * MODIFICATION
     *
     *     Some modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Object-Oriented Interface.
     *     - Added Asynchronous Execution Feauture.
     */
    function initRSA1( packages ) {
        __unit( "RSA.init1.js" );
        __uses( "packages.js" );
        // __uses( "SecureRandom.js" );
        __uses( "BigInteger.init1.js" );
        __uses( "isarray.js" );

        /////////////////////////////////////////////////////////////////////
        // import
        /////////////////////////////////////////////////////////////////////
        var BigInteger = __import( packages, "titaniumcore.crypto.BigInteger" );
        // var SecureRandom = __import( packages, "titaniumcore.crypto.SecureRandom" );

        /////////////////////////////////////
        // implementation
        /////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // class RSA
        /////////////////////////////////////////////////////////////////////

        var none = function(m){
            return m;
        };

        // "empty" RSA key constructor
        var RSA = function () {
            this.n = null;
            this.e = 0;
            this.d = null;
            this.p = null;
            this.q = null;
            this.dmp1 = null;
            this.dmq1 = null;
            this.coeff = null;
            this.ksize = 0;
            this.tolerantlyGenerate=true;
            this.preprocessPublic = none;
            this.preprocessPrivate = none;
            this.keyFormat = RSA.defaultKeyFormat;
            this.messageFormat = RSA.defaultMessageFormat;
        }
        RSA.prototype.className = "RSA";

        RSA.prototype.toString = function (r) {
            if ( r == null ) r = 16;
            var rsaKey =this;
            var result=""
                + "n="    + ( rsaKey.n     == null ? "" : rsaKey.n    .toString(r) + "(" + this.n.bitLength() + ")" ) + "\n"
                + "e="    + ( rsaKey.e     == null ? "" : rsaKey.e    .toString(r) ) +"\n"
                + "d="    + ( rsaKey.d     == null ? "" : rsaKey.d    .toString(r) + "(" + this.d.bitLength() + ")" ) + "\n"
                + "p="    + ( rsaKey.p     == null ? "" : rsaKey.p    .toString(r) ) +"\n"
                + "q="    + ( rsaKey.q     == null ? "" : rsaKey.q    .toString(r) ) +"\n"
                + "dmp1=" + ( rsaKey.dmp1  == null ? "" : rsaKey.dmp1 .toString(r) ) +"\n"
                + "dmq1=" + ( rsaKey.dmq1  == null ? "" : rsaKey.dmq1 .toString(r) ) +"\n"
                + "coeff="+ ( rsaKey.coeff == null ? "" : rsaKey.coeff.toString(r) ) +"\n"
            return result;
        };

        RSA.defaultKeyFormat= null;
        RSA.installKeyFormat= function( keyFormat ){
            RSA.defaultKeyFormat  = keyFormat;
        };

        RSA.defaultMessageFormat= null;
        RSA.installMessageFormat= function( messageFormat ){
            RSA.defaultMessageFormat  = messageFormat;
        };

        // (private)
        function makeGetterSetter(name){
            return function() {
                if ( arguments.length == 0 ) {
                    return this[name];
                } else {
                    var value = arguments[0];
                    var type = typeof value;
                    if ( value == null ) {
                        throw "parameter " + name + " cannot be null.";
                    } else if ( type == "object" && value.className == "BigInteger" ) {
                        this[name] = value;
                    } else if ( type == "object" && value.isArray ) {
                        this[name] = new BigInteger(value);
                    } else if ( type == "string" ) {
                        this[name] = new BigInteger( value, 16 );
                    } else if ( type == "number" ) {
                        this[name] = new BigInteger( value );
                    } else {
                        throw "parameter " + name + " must be a BigInteger object or a hex string or a number object.";
                    }

                    return this;
                }
            };
        }

        // (private)
        function makeGetterSetter2(name){
            return function() {
                if ( arguments.length == 0 ) {
                    return this[name];
                } else {
                    var value = arguments[0];
                    var type = typeof value;
                    if ( value == null ) {
                        throw "parameter " + name + " cannot be null.";
                    } else if ( type == "object" && value.className == "BigInteger" ) {
                        this[name] = value.intValue();
                    } else if ( type == "object" && value.isArray ) {
                        this[name] = new BigInteger(value).intValue();
                    } else if ( type == "string" ) {
                        this[name] = parseInt( value, 16 );
                    } else if ( type == "number" ) {
                        this[name] = value;
                    } else {
                        throw "parameter " + name + " must be a BigInteger object or a hex string or a number object.";
                    }

                    return this;
                }
            };
        }

        RSA.prototype._n = makeGetterSetter( "n" );
        RSA.prototype._e = makeGetterSetter2( "e" );
        RSA.prototype._d = makeGetterSetter( "d" );
        RSA.prototype._p = makeGetterSetter( "p" );
        RSA.prototype._q = makeGetterSetter( "q" );
        RSA.prototype._dmp1 = makeGetterSetter( "dmp1" );
        RSA.prototype._dmq1 = makeGetterSetter( "dmq1" );
        RSA.prototype._coeff = makeGetterSetter( "coeff" );
        RSA.prototype._ksize = makeGetterSetter2( "ksize" );


        // // Set the public key fields N and e from hex strings
        // RSA.prototype.setPublic = function (N,E) {
        // 	if(N != null && E != null && N.length > 0 && E.length > 0) {
        // 		this.n = new BigInteger(N,16);
        // 		this.e = parseInt(E,16);
        // 	}
        // 	else
        // 		alert("Invalid public key");
        // };
        //
        // // Perform raw public operation on "x": return x^e (mod n)
        // RSA.prototype.doPublic = function (x) {
        // 	return x.modPowInt(this.e, this.n);
        // };

        /*
         * publicKey(n,e)
         * Set a public key to the object.  Returns current value as an array
         * when no parameter is specified. The type of each parameters are
         * automatically converted to proper type.
         */
        RSA.prototype.publicKey = function (n,e,ksize) {
            if ( arguments.length == 0 ) {
                return { n:this.n, e:this.e, ksize:this.ksize };
            } else {
                this._n(n);
                this._e(e);
                this._ksize( ksize );
            }
        };

        /*
         * processPublic(m)
         * encrypt( when it is used as cipher ) /  decrypt ( when it is used as
         * signing ) message.  Parameter m specifies a BigInteger object to
         * encrypt/decrypt.  Returns an encrypted/decrypted BigInteger value.
         */
        RSA.prototype.processPublic = function (m) {
            m = this.preprocessPublic(m);
            return m.modPowInt(this.e, this.n);
        };

        RSA.prototype.publicEncrypt = function(m) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.publicEncrypt( this, m );
        };
        RSA.prototype.publicDecrypt = function(m) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.publicDecrypt( this, m );
        };
        RSA.prototype.publicEncryptMaxSize = function() {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.publicEncryptMaxSize( this );
        };

        /*
         * Set a public key as a binary representation string.
         */
        RSA.prototype.publicKeyBytes = function() {
            if ( this.keyFormat==null ) {
                throw "Error. No key format is installed.";
            }
            if ( arguments.length==0 ) {
                if ( this.ksize == null || this.ksize == 0 ) {
                    throw "key size is not set.";
                }
                return this.keyFormat.encodePublicKey( this.n, this.e, this.ksize );
            } else {
                var key = this.keyFormat.decodePublicKey( arguments[0] );
                this.publicKey( key.n, key.e, key.ksize );
                return this;
            }
        };

        /////////////////////////////////////////////////////////////////////

        RSA.log = function(message) {
            // trace(message);
        };

        RSA.err = function(message) {
            trace(message);
        };

        /////////////////////////////////////////////////////////////////////
        // export
        /////////////////////////////////////////////////////////////////////
        __export( packages, "titaniumcore.crypto.RSA" ,RSA );
    };
    initRSA1( self );

    /*
     * RSA.init2.js
     * An implementation of RSA public-key cryptography
     * Methods for RSA private key operation and RSA key generation
     *
     * See RSA.readme.txt for further information.
     *
     *
     * ACKNOWLEDGMENT
     *
     *     This library is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     * MODIFICATION
     *
     *     Some modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Object-Oriented Interface.
     *     - Added Asynchronous Execution Feauture.
     */
    function initRSA2( packages ) {
        __unit( "RSA.init2.js" );
        __uses( "packages.js" );
        __uses( "SecureRandom.js" );
        __uses( "BigInteger.init1.js" );
        __uses( "BigInteger.init2.js" );
        __uses( "RSA.init1.js" );
        __uses( "elapse.js" );

        ///////////////////////////////////////////
        // import
        ///////////////////////////////////////////
        // var RSA = __package( packages, id ).RSA;
        // var BigInteger = __package( packages, id ).BigInteger;
        // var SecureRandom = __package( packages, id ).SecureRandom;
        var RSA = __import( packages, "titaniumcore.crypto.RSA" );
        var BigInteger = __import( packages, "titaniumcore.crypto.BigInteger" );
        var SecureRandom = __import( packages, "titaniumcore.crypto.SecureRandom" );

        ///////////////////////////////////////////
        // implementation
        ///////////////////////////////////////////

        // // Set the private key fields N, e, and d from hex strings
        // RSA.prototype.setPrivate = function (N,E,D) {
        // 	if(N != null && E != null && N.length > 0 && E.length > 0) {
        // 		this.n = new BigInteger(N,16);
        // 		this.e = parseInt(E,16);
        // 		this.d = new BigInteger(D,16);
        // 	}
        // 	else
        // 		alert("Invalid private key");
        // };
        //
        //
        // // Set the private key fields N, e, d and CRT params from hex strings
        // RSA.prototype.setPrivateEx = function (N,E,D,P,Q,DP,DQ,C) {
        // 	if(N != null && E != null && N.length > 0 && E.length > 0) {
        // 		this.n = new BigInteger(N,16);
        // 		this.e = parseInt(E,16);
        // 		this.d = new BigInteger(D,16);
        // 		this.p = new BigInteger(P,16);
        // 		this.q = new BigInteger(Q,16);
        // 		this.dmp1 = new BigInteger(DP,16);
        // 		this.dmq1 = new BigInteger(DQ,16);
        // 		this.coeff = new BigInteger(C,16);
        // 	}
        // 	else alert("Invalid private key");
        // };

        /*
         * privateKey(n,e,d)
         * Set a private key to the object.  Returns current value as an array
         * when no parameter is specified. The type of each parameters are
         * automatically converted to proper type.
         */
        RSA.prototype.privateKey = function (n,e,d,ksize) {
            if ( arguments.length == 0 ) {
                return { n:this.n, e:this.e, d:this.d, ksize:this.ksize };
            } else {
                this._n(n);
                this._e(e);
                this._d(d);
                this._ksize(ksize);
            }
        };

        /*
         * set(n,e,d,p,q,dmp1,dmq1,coeff)
         * Set all parameters related RSA key to the object.  Returns current
         * value as an array when no parameter is specified. The type of each
         * parameters are automatically converted to proper type.
         */
        RSA.prototype.key = function (n,e,d,p,q,dmp1,dmq1,coeff) {
            if ( arguments.length == 0 ) {
                return { n:this.n, e:this.e, d:this.d, p:this.p, q:this.q, dmp1:this.dmp1, dmq1:this.dmq1, coeff:this.coeff };
            } else {
                this._n(n);
                this._e(e);
                this._d(d);
                this._p(p);
                this._q(q);
                this._dmp1(dmp1);
                this._dmq1(dmq1);
                this._coeff(coeff);
            }
        }

        // Added Jan15,2009
        // (protected)
        RSA.prototype.splitBitLength = function( bitlen ) {
            if ( this.tolerantlyGenerate ) {
                var qs = bitlen >>1;
                // One more bit for "a problem that length of composite number is not enough if unlucky."
                // ex) you need 4digis. so you split into 2 digits and multiply them.
                // 2digits x 2digits = 3digits~4digits ... 10x10 = 100  99*99=9801
                return [ bitlen-qs + 1, qs + 1 ];
            } else {
                trace( "strict1" );
                var qs = bitlen >>1;
                return [ bitlen-qs, qs ];
            }
        };
        // (protected)
        RSA.prototype.isProperBitLength = function( bi, bitlen ) {
            if ( this.tolerantlyGenerate ) {
                // // and probably this check is not necessary.
                // return ( bitlen + 1 ) <= bi.bitLength();
                return true;
            } else {
                trace( "strict2" );
                return bitlen == bi.bitLength();
            }
        };

        // Generate a new random private key B bits long, using public expt E
        RSA.prototype.generate = function (B,E) {
            var rng = new SecureRandom();
            // Modified Jan15,2009 >>
            // var qs = B>>1;
            var qs = this.splitBitLength( B );
            // <<

            // Modified Jan 4,2009
            // this.e = parseInt(E,16);
            // var ee = new BigInteger( E, 16 );
            // Modified Jan 5,2009
            //if ( typeof E == "string" ) {
            //	this.e = parseInt(E,16);
            //} else if ( typeof E == "number" ) {
            //	this.e = e;
            //} else {
            //	throw "E must be a number object or a hex string. ";
            //}
            this._e(E);
            var ee = new BigInteger( this.e );

            for(;;) {
                var et1= ElapsedTime.create();
                for(;;) {
                    et1.start("generateLoop1");
                    // Modified Jan15,2009 >>
                    // this.p = new BigInteger( B-qs, 1, rng );
                    this.p = new BigInteger( qs[0], 1, rng );
                    // <<

                    et1.stop();
                    if ( this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10) )
                        break;
                }

                var et2= ElapsedTime.create();
                for(;;) {
                    et2.start("generateLoop2");
                    // Modified Jan15,2009 >>
                    // this.q = new BigInteger( qs, 1, rng );
                    this.q = new BigInteger( qs[1], 1, rng );
                    // <<
                    et2.stop();
                    if ( this.q.subtract( BigInteger.ONE ).gcd( ee ).compareTo( BigInteger.ONE ) == 0 && this.q.isProbablePrime(10) )
                        break;
                }

                // MODIFIED 15 Jan,2009 Ats >>>
                // if ( this.p.compareTo(this.q) <= 0 ) {
                //     var t = this.p;
                //     this.p = this.q;
                //     this.q = t;
                // }
                var cc = this.p.compareTo(this.q);
                if ( cc == 0 ) {
                    // see the comment RSA.init3.js
                    continue;
                } else if ( cc < 0 ) {
                    var t = this.p;
                    this.p = this.q;
                    this.q = t;
                }
                // <<

                var p1 = this.p.subtract( BigInteger.ONE );
                var q1 = this.q.subtract( BigInteger.ONE );
                var phi = p1.multiply( q1 );

                if ( phi.gcd(ee).compareTo( BigInteger.ONE ) == 0 ) {
                    this.n = this.p.multiply( this.q );
                    // ADDED 15 Jan,2009 Ats >>>
                    if ( ! this.isProperBitLength( this.n, B ) ) {
                        continue;
                    }
                    // <<
                    this.d = ee.modInverse( phi );
                    this.dmp1 = this.d.mod(p1);
                    this.dmq1 = this.d.mod(q1);
                    this.coeff = this.q.modInverse(this.p);
                    break;
                }
            }
            this._ksize(B);
        };

        /*
         * processPrivate(m)
         * encrypt( when it is used as cipher ) /  decrypt ( when it is used as
         * signing ) message.  Parameter m specifies a BigInteger object to
         * encrypt/decrypt.  Returns an encrypted/decrypted BigInteger value.
         */
        RSA.prototype.processPrivate = function (m) {
            m = this.preprocessPrivate(m);
            if ( this.p == null || this.q == null ) {
                return m.modPow(this.d, this.n);
            } else {
                // TODO: re-calculate any missing CRT params
                var p1 = m.mod(this.p).modPow(this.dmp1, this.p);
                var q1 = m.mod(this.q).modPow(this.dmq1, this.q);

                while(p1.compareTo(q1) < 0) {
                    p1 = p1.ope_add(this.p);
                }
                return p1.subtract(q1).multiply(this.coeff).mod(this.p).multiply(this.q).ope_add(q1);
            }
        };

        RSA.prototype.privateEncrypt = function(m) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.privateEncrypt( this, m );
        };
        RSA.prototype.privateDecrypt = function(m) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.privateDecrypt( this, m );
        };
        RSA.prototype.privateEncryptMaxSize = function() {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.privateEncryptMaxSize( this );
        };

        /*
         * Set a private key as a binary representation string.
         */
        RSA.prototype.privateKeyBytes = function() {
            if ( this.keyFormat==null ) {
                throw "Error. No key format is installed.";
            }
            if ( arguments.length==0 ) {
                if ( this.ksize == null || this.ksize == 0 ) {
                    throw "key size is not set.";
                }
                return this.keyFormat.encodePrivateKey( this.n, this.e, this.d, this.ksize );
            } else {
                var key = this.keyFormat.decodePrivateKey( arguments[0] );
                this.privateKey( key.n, key.e, key.d, key.ksize );
                return this;
            }
        };

    };
    initRSA2( self );

    /*
     * RSA.init3.js
     * An implementation of RSA public-key cryptography
     * Methods for Asynchronous processing.
     *
     * See RSA.readme.txt for further information.
     *
     *
     * ACKNOWLEDGMENT
     *
     *     This library is originally written by Tom Wu
     *
     *     Copyright (c) 2005  Tom Wu
     *     All Rights Reserved.
     *     http://www-cs-students.stanford.edu/~tjw/jsbn/
     *
     * MODIFICATION
     *
     *     Some modifications are applied by Atsushi Oka
     *
     *     Atsushi Oka
     *     http://oka.nu/
     *
     *     - Packaged
     *     - Added Object-Oriented Interface.
     *     - Added Asynchronous Execution Feauture.
     */
    function initRSA3( packages ) {
        __unit( "RSA.init3.js" );
        __uses( "packages.js" );
        __uses( "SecureRandom.js" );
        __uses( "BigInteger.init1.js" );
        __uses( "BigInteger.init2.js" );
        __uses( "nonstructured.js" ); // See ... (1)
        __uses( "BigInteger.init3.js" );
        __uses( "RSA.init1.js" );
        __uses( "RSA.init2.js" );

        // (1) nonstructured.js
        // This file relies on nonstructured.js
        // See http://oka.nu/lib/nonstructured/nonstructured.readme.txt

        ///////////////////////////////////////////
        // import
        ///////////////////////////////////////////
        // var RSA = __package( packages, id ).RSA;
        // var BigInteger = __package( packages, id ).BigInteger;
        // var SecureRandom = __package( packages, id ).SecureRandom;
        var RSA = __import( packages, "titaniumcore.crypto.RSA" );
        var BigInteger = __import( packages, "titaniumcore.crypto.BigInteger" );
        var SecureRandom = __import( packages, "titaniumcore.crypto.SecureRandom" );

        ///////////////////////////////////////////
        // implementation
        ///////////////////////////////////////////

        RSA.prototype.generateAsync = function(keylen,exp,progress,result,done) {
            var self=this;
            var generator = this.stepping_generate( keylen, exp );
            var _result = function() {
                result( self );
                return BREAK;
            };
            return ( [ generator, _result, EXIT ] ).ready().frequency(1).timeout(1).progress(progress).done(done).go();
        };

        RSA.prototype.processPublicAsync = function(message,progress,result,done){
            var closure= this.stepping_processPublic(message);
            var receiver = function(scope,param,subparam) {
                result( subparam.result.toByteArray() );
                return BREAK;
            };
            return ( [ closure, receiver, EXIT ] ).ready().frequency(1).timeout(1).progress(progress).done(done).go();
        };

        RSA.prototype.processPrivateAsync = function(message,progress,result,done){
            var closure= this.stepping_processPrivate(message);
            var receiver = function(scope,param,subparam) {
                result( subparam.result.toByteArray() );
                return BREAK;
            };
            return ( [ closure, receiver, EXIT ] ).ready().frequency(1).timeout(1).progress(progress).done(done).go();
        };

        RSA.prototype.privateEncryptAsync = function(message,progress,result,done) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.privateEncryptAsync( this, message,progress,result,done );
        };

        RSA.prototype.privateDecryptAsync = function(message,progress,result, done) {
            if ( this.messageFormat==null ) {
                throw "Error. No message format is installed.";
            }
            return this.messageFormat.privateDecryptAsync( this, message,progress,result,done );
        };


        ///////////////////////////////////////////
        // implementation
        ///////////////////////////////////////////

        // Generate a new random private key B bits long, using public expt E
        RSA.prototype.stepping_generate = function (B,E) {
            var self=this;

            //var rng = new SecureRandom(); // MODIFIED 2008/12/07
            var rng;

            // var qs = B>>1;
            var qs = this.splitBitLength( B );

            // Modified Jan 4,2009
            // self.e = parseInt(E,16);
            // var ee = new BigInteger(E,16);

            // Modified Jan 5,2009
            //if ( typeof E == "string" ) {
            //	self.e = parseInt(E,16);
            //} else if ( typeof E == "number" ) {
            //	self.e = e;
            //} else {
            //	throw "E must be a number object or a hex string. ";
            //}
            self._e(E);
            var ee = new BigInteger(self.e);

            var p1;
            var q1;
            var phi;

            var et1 = ElapsedTime.create();
            var et2 = ElapsedTime.create();
            var et3 = ElapsedTime.create();
            return [
                function() {
                    RSA.log("RSAEngine:0.0");
                    et1.start("Step1");
                    return BREAK;
                },
                // // Step1.ver1
                // function () {
                //// 	self.p = new BigInteger( B-qs, 1, rng );
                // 	self.p = new BigInteger( qs[0], 1, rng );
                // 	if ( self.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && self.p.isProbablePrime(10) )
                // 		return BREAK;
                // 	return CONTINUE;
                // },

                // Step1.ver2
                [
                    function () {
                        RSA.log("RSAEngine:1.1");
                        self.p = new BigInteger();
                        rng = new SecureRandom();
                        return BREAK;
                    },
                    function () {
                        RSA.log("RSAEngine:1.2");
                        // return self.p.stepping_fromNumber1( B-qs, 1, rng ).BREAK();
                        return self.p.stepping_fromNumber1( qs[0], 1, rng ).BREAK();
                    },
                    // // Step1.3 ver1
                    // function () {
                    // 	RSA.log("RSAEngine:1.3");
                    // 	if ( self.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && self.p.isProbablePrime(10) )
                    // 		return EXIT;
                    // 	else
                    // 		return AGAIN;
                    // }

                    // // Step1.3 ver2
                    // function () {
                    // 	RSA.log("RSAEngine:1.3.1");
                    // 	if ( self.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 )
                    // 		return BREAK;
                    // 	else
                    // 		return AGAIN;
                    // },
                    // function () {
                    // 	RSA.log("RSAEngine:1.3.2");
                    // 	if ( self.p.isProbablePrime(10) ) {
                    // 		RSA.log("RSAEngine:1.3.2=>EXIT");
                    // 		return EXIT;
                    // 	} else {
                    // 		RSA.log("RSAEngine:1.3.2=>AGAIN");
                    // 		return AGAIN;
                    // 	}
                    // },

                    // Step1.3 ver3
                    function () {
                        RSA.log("RSAEngine:1.3.1");
                        if ( self.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 )
                            return BREAK;
                        else
                            return AGAIN;
                    },
                    function () {
                        RSA.log("RSAEngine:1.3.2 : calling stepping_isProbablePrime");
                        return self.p.stepping_isProbablePrime(10).BREAK();
                    },
                    function (scope,param,subparam) {
                        RSA.log("RSAEngine:1.3.3 : returned stepping_isProbablePrime" + subparam.result );
                        if ( subparam.result ) {
                            RSA.log("RSAEngine:1.3.3=>EXIT");
                            return EXIT;
                        } else {
                            RSA.log("RSAEngine:1.3.3=>AGAIN");
                            return AGAIN;
                        }
                    },
                    EXIT
                ].NAME("stepping_generate.Step1"),
                function() {
                    et1.stop();
                    RSA.log("RSAEngine:1.4");
                    return BREAK;
                },
                function() {
                    RSA.log("RSAEngine:2.0");
                    et2.start("Step2");
                    return BREAK;
                },
                // // Step2.ver1
                // function() {
                //// 	self.q = new BigInteger( qs, 1, rng );
                // 	self.q = new BigInteger( qs[1], 1, rng );
                // 	if ( self.q.subtract( BigInteger.ONE ).gcd( ee ).compareTo( BigInteger.ONE ) == 0 && self.q.isProbablePrime(10) )
                // 		return BREAK;
                // 	return CONTINUE;
                // },

                // Step2.ver2
                [
                    function() {
                        RSA.log("RSAEngine:2.1");
                        self.q = new BigInteger();
                        return BREAK;
                    },
                    function () {
                        RSA.log("RSAEngine:2.2");
                        // return self.q.stepping_fromNumber1( qs, 1, rng ).BREAK();
                        return self.q.stepping_fromNumber1( qs[1], 1, rng ).BREAK();
                    },
                    // // Step2.3 ver1 >>
                    // function () {
                    // 	RSA.log("RSAEngine:2.3");
                    // 	if ( self.q.subtract( BigInteger.ONE ).gcd( ee ).compareTo( BigInteger.ONE ) == 0 && self.q.isProbablePrime(10) )
                    // 		return EXIT;
                    // 	else
                    // 		return AGAIN;
                    // }
                    // <<

                    // // Step2.3 ver2>>>
                    // function () {
                    // 	RSA.log("RSAEngine:2.3.1");
                    // 	if ( self.q.subtract( BigInteger.ONE ).gcd( ee ).compareTo( BigInteger.ONE ) == 0 )
                    // 		return BREAK;
                    // 	else
                    // 		return AGAIN;
                    // },
                    // function () {
                    // 	RSA.log("RSAEngine:2.3.2");
                    // 	if ( self.q.isProbablePrime(10) ) {
                    // 		RSA.log("RSAEngine:2.3.2=>EXIT");
                    // 		return EXIT;
                    // 	} else {
                    // 		RSA.log("RSAEngine:2.3.2=>AGAIN");
                    // 		return AGAIN;
                    // 	}
                    // },
                    //<<<
                    // Step2.3 ver2>>>
                    function () {
                        RSA.log("RSAEngine:2.3.1");
                        if ( self.q.subtract( BigInteger.ONE ).gcd( ee ).compareTo( BigInteger.ONE ) == 0 )
                            return BREAK;
                        else
                            return AGAIN;
                    },
                    function() {
                        RSA.log("RSAEngine:2.3.2");
                        return self.q.stepping_isProbablePrime(10).BREAK();
                    },
                    function(scope,param,subparam) {
                        RSA.log( "RSAEngine:2.3.3:subparam.result="+subparam.result );
                        if ( subparam.result ) {
                            RSA.log("RSAEngine:2.3.3=>EXIT");
                            return EXIT;
                        } else {
                            RSA.log("RSAEngine:2.3.3=>AGAIN");
                            return AGAIN;
                        }
                    },
                    // <<<
                    EXIT
                ].NAME("stepping_generate.Step2"),
                function() {
                    et2.stop();
                    RSA.log("RSAEngine:2.3");
                    return BREAK;
                },
                function() {
                    if ( self.p.compareTo(self.q) <= 0 ) {
                        var t = self.p;
                        self.p = self.q;
                        self.q = t;
                    }
                    return BREAK;
                },
                function() {
                    RSA.log("RSAEngine:3.1");
                    RSA.log( "p=" + self.p.toString(16) );
                    RSA.log( "q=" + self.q.toString(16) );
                    et3.start("Step3");
                    return BREAK;
                },
                // //Step3.2 ver1
                // function() {
                // 	RSA.log("RSAEngine:3.2");
                // 	var p1 = self.p.subtract( BigInteger.ONE );
                // 	var q1 = self.q.subtract( BigInteger.ONE );
                // 	var phi = p1.multiply( q1 );
                // 	RSA.log("RSAEngine:3.3");
                // 	if ( phi.gcd(ee).compareTo( BigInteger.ONE ) == 0 ) {
                // 		RSA.log("RSAEngine:3.3.1");
                // 		self.n = self.p.multiply( self.q );
                // 		// ADDED 2008/12/1 >>>
                // 		if ( self.n.bitLength() != B ) {
                // 			RSA.log("RSAEngine:3.3.2.1:AGAIN bitLength="+self.n.bitLength() + " B=" + B );
                // 			return AGAIN;
                // 		}
                // 		RSA.log("RSAEngine:3.3.2.2");
                // 		// ADDED 2008/12/1 <<<
                // 		var et4 =ElapsedTime.create();
                // 		et4.start("modInverse1");
                // 		self.d = ee.modInverse( phi );
                // 		et4.stop();
                // 		et4.start("modInverse2");
                // 		self.dmp1 = self.d.mod(p1);
                // 		self.dmq1 = self.d.mod(q1);
                // 		et4.stop();
                // 		et4.start("modInverse3");
                // 		self.coeff = self.q.modInverse(self.p);
                // 		et4.stop();
                // 		return BREAK;
                // 	}
                // 	RSA.log("RSAEngine:3.4");
                // 	return AGAIN;
                // },

                // // Step3.2 ver2 >>>
                function() {
                    RSA.log("RSAEngine:3.2");
                    /* var */ p1 = self.p.subtract( BigInteger.ONE );
                    /* var */ q1 = self.q.subtract( BigInteger.ONE );
                    /* var */ phi = p1.multiply( q1 );
                    if ( phi.gcd(ee).compareTo( BigInteger.ONE ) == 0 ) {
                        RSA.log("RSAEngine:3.2=>BREAK");
                        return BREAK;
                    } else {
                        RSA.log("RSAEngine:3.2=>AGAIN");
                        return AGAIN;
                    }
                },
                function() {
                    RSA.log("RSAEngine:3.2.sub");
                    // ADDED 11Dec,2008 Ats >>>
                    // When p and q in a RSA key have the same value, the RSA
                    // key cannot encrypt/decrypt messages correctly.
                    // Check if they have the same value and if so regenerate these value again.
                    // Though rarely do p and q conflict when key length is large enough.
                    // <<<
                    if ( self.p.compareTo( self.q ) ==0 ) {
                        RSA.log("RSAEngine:3.2.sub +++ P & Q ARE EQUAL !!!");
                        return AGAIN;
                    }
                    self.n = self.p.multiply( self.q );
                    // ADDED 2008/12/1 >>>
                    // if ( self.n.bitLength() != B ) {
                    // if ( self.n.bitLength() < B ) { // modified 2009/1/13
                    if ( ! self.isProperBitLength( self.n, B ) ) { // modified 2009/1/15
                        RSA.log("RSAEngine:3.3.2.1:AGAIN bitLength="+self.n.bitLength() + " B=" + B );
                        return AGAIN;
                    }
                    // ADDED 2008/12/1 <<<
                    return BREAK;
                },
                function() {
                    RSA.log("RSAEngine:3.3.1");

                    var et4 =ElapsedTime.create();

                    RSA.log("RSAEngine:3.3.1(1)");
                    et4.start("modInverse1");
                    self.d = ee.modInverse( phi );
                    et4.stop();
                    RSA.log("RSAEngine:3.3.2(2)");

                    self._ksize(B); // added Jan15,2009
                    return BREAK;
                },
                function() {
                    RSA.log("RSAEngine:3.3.2");

                    var et4 =ElapsedTime.create();
                    et4.start("modInverse2");
                    self.dmp1 = self.d.mod(p1);
                    self.dmq1 = self.d.mod(q1);
                    et4.stop();

                    return BREAK;
                },
                function() {
                    RSA.log("RSAEngine:3.3.3");

                    var et4 =ElapsedTime.create();
                    et4.start("modInverse3");
                    self.coeff = self.q.modInverse(self.p);
                    et4.stop();

                    return BREAK;
                },

                function() {
                    et3.stop();
                    RSA.log("RSAEngine:3.5");
                    return BREAK;
                },
                // <<<
                EXIT
            ].NAME("stepping_generate");
        };

        ///////////////////////////////////////////

        RSA.prototype.stepping_processPublic = function(m){
            return m.stepping_modPow( new BigInteger(this.e), this.n);
        };

        RSA.prototype.stepping_processPrivate = function(m){
            return m.stepping_modPow( this.d, this.n );
        };


    };
    initRSA3( self );

    /*
     * RSAKeyFormat.js
     * See RSAKeyFormat.readme.txt for further information.
     *
     * Copyright(c) 2009 Atsushi Oka [ http://oka.nu/ ]
     * This script file is distributed under the LGPL
     */
    function initRSAKeyFormat( packageRoot ) {
        __unit( "RSAKeyFormat.js" );
        __uses( "packages.js" );
        __uses( "BigInteger.init1.js" );
        __uses( "binary.js" );
        __uses( "SOAEP.js" );

        var BigInteger = __import( packageRoot, "titaniumcore.crypto.BigInteger" );
        var SOAEP = __import( packageRoot, "titaniumcore.crypto.SOAEP" );

        var createReader = function(value) {
            var idx=0;
            return {
                read_block : function() {
                    var size = ba2i( value.slice(idx,idx+4) );
                    idx+=4;
                    if ( value.length<idx+size ) throw "Array Index Out of Bounds Exception("+(idx+size )+")";
                    var data = value.slice( idx, idx + size );
                    idx+=size;
                    return data;
                },
                read : function () {
                    var size = ba2i( value.slice(idx,idx+4) );
                    idx+=4;
                    return size;
                }
            };
        };

        function check(a){
            if ( a.className == "BigInteger" ) {
                return a;
            } else {
                return new BigInteger(a);
            }
        }

        function encodePadding( value ){
            return SOAEP.create().encode( value );
        }

        function decodePadding( value ){
            return SOAEP.create().decode( value );
        }

        function pack(s) {
            var result = "";
            for ( var i=0; i<s.length; i++ ) {
                var c = s.charAt( i );
                if ( c==" " || c=="\t" || c=="\r" || c=="\n" ) {
                } else {
                    result += c;
                }
            }
            return result;
        }
        function base64check( input ){
            if ( typeof input == "string" ) {
                return base64x_decode( pack(  input  ) );
            } else {
                return input;
            }
        }

        function encodePublicKey( n, e, ksize ) {
            var bn = check(n).toByteArray();
            var be = check(e).toByteArray();

            var arr = [];
            arr = arr.concat( i2ba( ksize ) );
            arr = arr.concat( i2ba( bn.length ) );
            arr = arr.concat( bn );
            arr = arr.concat( i2ba( be.length ) );
            arr = arr.concat( be );

            arr = encodePadding( arr );

            return arr;
        }

        function encodePrivateKey( n, e, d, ksize ) {
            var bn = check(n).toByteArray();
            var be = check(e).toByteArray();
            var bd = check(d).toByteArray();

            var arr = [];
            arr = arr.concat( i2ba( ksize ) );
            arr = arr.concat( i2ba(bn.length) );
            arr = arr.concat( bn );
            arr = arr.concat( i2ba(be.length) );
            arr = arr.concat( be );
            arr = arr.concat( i2ba(bd.length) );
            arr = arr.concat( bd );

            arr = encodePadding( arr );

            return arr;
        }

        function decodePublicKey( value ) {
            value = base64check(value);
            value = decodePadding( value );
            var reader = createReader( value );
            var ksize = reader.read();
            var n = reader.read_block();
            var e = reader.read_block();

            return { ksize:ksize, n:n, e:e };
        }
        function decodePrivateKey( value ) {
            value = base64check(value);
            value = decodePadding( value );
            var reader = createReader(value);
            var ksize = reader.read();
            var n= reader.read_block();
            var e= reader.read_block();
            var d= reader.read_block();
            return { ksize:ksize, n:n, e:e, d:d };
        }

        function RSAKeyFormat(){
        }

        RSAKeyFormat.encodePublicKey  = encodePublicKey;
        RSAKeyFormat.encodePrivateKey = encodePrivateKey;
        RSAKeyFormat.decodePublicKey  = decodePublicKey;
        RSAKeyFormat.decodePrivateKey = decodePrivateKey;

        __export( packageRoot, "titaniumcore.crypto.RSAKeyFormat", RSAKeyFormat );
    };
    initRSAKeyFormat( self );

    return self.titaniumcore.crypto;
}));