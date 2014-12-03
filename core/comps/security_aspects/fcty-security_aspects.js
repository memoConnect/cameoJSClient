'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspects',[
    'cmObject',
    'cmLogger',
    '$q',
    function (cmObject, cmLogger, $q){
        /**
         * Generic security aspect
         * @param {Object} [config] contains id, dependencies, value and a function check() that checks if the security aspect applies, returning its value. 
         * Negative values indicate that the aspect lowers the overall security when present, aspects with positive value will improve the security.  the check function should return 0 if it does not apply.
         * An aspect only applies if all its dependencies apply. 
         */
        function SecurityAspect(config){

            cmObject.addEventHandlingTo(this)

            //The id determines the message id for the translations of name and description.
            this.id             = config.id             || 'DEFAULT';
            //Name:         'SECURITY_ASPECT.CONVERSATION.DEFAULT.NAME'
            //Description:  'SECURITY_ASPECT.CONVERSATION.DEFAULT.DESCRIPTION'
            this.value          = config.value          || 0;
            this.dependencies   = config.dependencies   || [];  //Array of aspect ids
            this.languagePrefix = config.languagePrefix || ''

            this.description    = this.languagePrefix+'.'+this.id+'.DESCRIPTION'
            this.name           = this.languagePrefix+'.'+this.id+'.NAME'
            this.toggleLabel    = this.languagePrefix+'.'+this.id+'.TOGGLE'

            this.template       = config.template       || '{{"'+this.description+'"|cmTranslate}}'

            /**
             * Function to check if the aspect applies to the target.
             * @param  {*}      target to evaluate against.
             * @return {Number}        returns true id the aspects applies, false otherwise
             */
            this.check = config.check || function(target){
                return false
            };

            this.isToggleAble = (config.toggleCheck && config.toggleCall) ? true : false;

            /**
             * Function to check the requirements for toggleCall. (Meant to be overwritten!)
             * When .toggle() is called, toggleCall() will only be called if .toggleCheck() retruns truthly.
             * @param   {*}         target  The target the aspect should apply to.
             * @returns {Boolean}           Returns wheter requirements are met.
             */            
            this.toggleCheck = config.toggleCheck || function(target){
                return false
            };

            /**
             * Function change the target in a way the aspect does nit longer apply.
             * When .toggle() is called, toggleCall() will only be called if .toggleCheck() retruns truthly.
             * @param   {*}         target  The target the aspect should apply to.
             */            
            this.toggleCall = config.toggleCall || function(target){
                return false
            };

            //cmSecurityAspects is listening to this event:
            this.toggle = function(){
                this.trigger('toggle')
            };
        }

        /**
         * Security aspect management
         */
        
        function cmSecurityAspects(config){
            config = config || {};

            var self = this;

            cmObject.addEventHandlingTo(this);

            // Array of SecurityAspect instances
            this.aspects = [];
            // Object all aspects should apply to
            this.target = undefined;
            this.applyingAspects = null

            this.countForDigest = 0;

            this.languagePrefix = config.languagePrefix;


            /**
             * Function to set the target all aspects should evaluate against
             * @param {*} target 
             */
            this.setTarget = function(target){
                //cmLogger.debug('cmSecurityAspects.setTarget');

                this.target = target;
                return this;
            };

            /**
             * Function to add a new SecurityAspect instance to the list
             * @param {Object}  config contains the configuration data for security aspect, see above
             * @return {self}   returns self for chaining
             */
            this.addAspect = function(config){
                //cmLogger.debug('cmSecurityAspects.addAspect');

                config.languagePrefix = config.languagePrefix || this.languagePrefix

                var aspect = new SecurityAspect(config);

                aspect.on('toggle', function(){
                    if(aspect.toggleCheck(self.target))
                        aspect.toggleCall(self.target)
                });

                this.aspects.push(aspect);
                return this;
            };

            this.reset = function(){
                this.applyingAspects    = null
            }

            this.refresh = function(){
                //cmLogger.debug('cmSecurityAspects.refresh');

                this.countForDigest++;

                this.reset()

                var failed_aspects = []

                function calculate(applying_aspects){
                    applying_aspects = applying_aspects || [];

                    var candidates =    self.aspects.filter(function(aspect){
                                            return  (
                                                        // Only add aspects not already assumed to apply:
                                                        applying_aspects.indexOf(aspect) == -1
                                                        // Only add aspects that still can apply:
                                                        && failed_aspects.indexOf(aspect) == -1
                                                        // check if all dependencies are among the applying aspects:
                                                        && aspect.dependencies.every(function(dependency_id){
                                                            return applying_aspects.some(function(applying_aspect){
                                                                 return applying_aspect.id == dependency_id
                                                            })
                                                        })
                                                    )
                                        })

                    var additional_aspects = []

                    return $q.all(
                                candidates.map(function(aspect){
                                    return  $q.when(aspect.check(self.target))
                                            .then(function(result){
                                                result === true
                                                    ?   additional_aspects.push(aspect)
                                                    :   failed_aspects.push(aspect)
                                            })
                                            .finally(function(){
                                                return $q.when()
                                            })

                                })
                            ).then(function(){
                                return  additional_aspects.length == 0
                                        ?   $q.when(applying_aspects)
                                        :   calculate( applying_aspects.concat(additional_aspects) );
                            })

                }

                return  calculate()
                        .then(function(applying_aspects){
                            self.applyingAspects = applying_aspects
                            self.trigger('refresh')
                            $q.when(applying_aspects)
                        })

            }

            /**
             * Function to calculate applying aspects if needed, i.e. cached is empty
             * @return {[type]} [description]
             */
            this.get = function(){
                return  this.applyingAspects == null
                        ?   this.refresh()
                        :   $q.when(this.applyingAspects)
            }


            /**
             * Function to get all applying security aspects
             * @package {Array}  [applying_aspects = []]    Array of already applying aspects, used to resolve dependencies
             * @return  {Array}                             Array of all applying aspects
             */
            this.getApplyingAspects = function(applying_aspects){
                if(this.applyingAspects == null)
                    cmLogger.warn('cmSecurityAspects: no applying aspects found, you probably forgot to call .refresh().')

                return  this.applyingAspects 
            }

            /**
             * Function to get all security aspects that evaluate positively against the target
             * @return {Array}              Array of aspects
             */
            this.getPositiveAspects = function(){
                return this.getApplyingAspects().filter(function(aspect){ return aspect.value > 0 });
            };

            /**
             * Function to get all security aspects that evaluate positively against the target
             * @return {Array}              Array of aspects
             */           
            this.getNegativeAspects = function(){
                return this.getApplyingAspects().filter(function(aspect){ return aspect.value < 0 });
            };

            /**
            * Function to get all security aspects that evaluate neutrally (value == 0) against the target
            * @return {Array}              Array of aspects
            */           
            this.getNeutralAspects = function(){
                return this.getApplyingAspects().filter(function(aspect){ return aspect.value === 0 });
            };

            /**
             * Function to get all security aspects that do not apply to the target
             * @return {Array}              Array of aspects
             */
            this.getNonApplyingAspects = function(){                
                return this.aspects.filter(function(aspect){ return self.getApplyingAspects().indexOf(aspect) == -1 });
            };

            /**
             * Function to check wether an aspect with given id applies
             * @param  {string} id  Aspect id
             * @return {boolean}    true iff the aspect applies
             */
            this.applies = function(id){
                return !!this.getApplyingAspects().filter(function(aspect){ return aspect.id == id })[0]
            }
        }


        return cmSecurityAspects
    }
]);