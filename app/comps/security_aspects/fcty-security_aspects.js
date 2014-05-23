'use strict';

angular.module('cmSecurityAspects')
.factory('cmSecurityAspects',[
    
    //no dependencies

    function (){

        /**
         * Generic security aspect
         * @param {Object} [config] contains id, dependencies, value and a function check() that checks if the security aspect applies, returning its value. 
         * Negative values indicate that the aspect lowers the overall security when present, aspects with positive value will improve the security.  the check function should return 0 if it does not apply.
         * An aspect only applies if all its dependencies apply. 
         */
        function SecurityAspect(config){
            //The id determines the message id for the translations of name and description.
            this.id             = config.id             ||'DEFAULT'
            //Name:         'SECURITY_ASPECT.CONVERSATION.DEFAULT.NAME'
            //Description:  'SECURITY_ASPECT.CONVERSATION.DEFAULT.DESCRIPTION'
            this.value          = config.value          || 0
            this.dependencies   = config.dependencies   || []  //Array of aspect ids


            /**
             * Function to check if the aspect applis to the target.
             * @param  {*}      target to evaluate against.
             * @return {Number}        value of the aspect or 0 if it does not apply at all
             */
            this.check = config.check || function(target){
                return 0
            }
        }

        /**
         * Security aspect management
         */
        
        function cmSecurityAspects(){
            // Array of SecurityAspect instances
            this.aspects = []

            /**
             * Function to add a new SecurityAspect instance to the list
             * @param {Object}  config contains the configuration data for security aspect, see above
             * @return {self}   returns self for chaining
             */
            this.add = function(config){
                this.aspects.push(new SecurityAspect(config))
                return this
            }

            /**
             * Function to filter aspects by id
             * @param  {Array}     List of aspect ids
             * @return {Array}     Array of aspects with matching ids
             */
            this.getAspectsById = function(ids){

                ids = typeof ids == "String" ? [ids] : ids

                return this.aspects.filter(function(aspect){
                    return ids.indexOf(aspect.id) != -1
                })
            }

            /**
             * Function to filter security aspects by their evaluation against a target
             * @param   {*}         target              Object the aspects will evaluate against.
             * @param   {Number}    [polarization = 1]  determines which aspects should be returned (-1 for those who apply with a negative value, 0 for those that do not apply and 1 for those that apply with a positive value)             
             * @return  {Array}                         Array of all not applying or positivly/negative evaluating aspects
             */
            
            this.evaluate = function(target, polarization){
                var matching_aspects = []


                     matching_aspects = this.aspects.filter(function(aspect){
                        var result  =      aspect.dependency.every(function(dependency){ matching_aspects.indexOf(dependency) != -1 })
                                        && aspect.check(target)
      
                        return  polarization == 0
                                ?   result == 0
                                :   result * polarization > 0
                        
                    })
            }

            /**
             * Function to get all aspects that evaluate positively against the target
             * @param  {*}          target to evaluate against
             * @return {Array}       Array of aspects
             */
            this.getPositiveAspects = function(target){
                return this.evaluate(target, 1)
            }

            /**
             * Function to get all aspects that evaluate positively against the target
             * @param  {*}          target to evaluate against
             * @return {Array}       Array of aspects
             */           

            this.getNegativeAspects = function(target){
                return this.evaluate(target, -1)
            }

            /**
             * Function to get all aspects that evaluate positively against the target
             * @param  {*}          target to evaluate against
             * @return {Array}       Array of aspects
             */
            this.getNotApllyingAspects = function(target){
                return this.evaluate(target, 0)
            }

            /**
             * Function to get all aspects that evaluate positively against the target
             * @param  {*}          target to evaluate against
             * @return {Array}       Array of aspects
             */
            this.getApllyingAspects = function(target){
                return this.evaluate(target,1).concat(this.evaluate(target, -1))
            }
        }

        return cmSecurityAspects
    }
])