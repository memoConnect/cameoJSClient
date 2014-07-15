'use strict';

/**
 * @ngdoc directive
 * @name cmUi.directive:cmAvatar
 * @description
 * Shows the avatar of an identity.
 * It can also be used for an identity avatar placeholder.
 *
 * @restrict E
 * @requires cmIdentityModel
 *
 * @example
     <example module="cmDemo">
         <file name="style.css">
             cm-avatar {display:inline-block;vertical-align:top;width:100px;height:100px}
             cm-avatar img{width:100%;height:100%}
         </file>
         <file name="script.js">
             angular
             .module('cmDemo', ['cmUi'])
             .controller('Ctrl', function ($scope){

                 var simple_cmFileModel = {
                    state:'cached',
                    base64Url:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTMwOUMxNTBFQkU5MTFFM0FDOTJEQjIzQjBFNjk1Q0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTMwOUMxNEZFQkU5MTFFM0FDOTJEQjIzQjBFNjk1Q0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjJFODlGRDk2RUE0MTExRTNCQkQ5OThEODZBQTJFNkU5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjJFODlGRDk3RUE0MTExRTNCQkQ5OThEODZBQTJFNkU5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+As8xUwAABIRJREFUeNrEV1trXFUYXecyczKTTDKZZKZpmWZSR3shsUotVdFCFFEppdIKivrshT6UPlRfvIDQ/2AfqlYQFKFCxFIURCkWQZoKvaaWprG5dBLTmenkMvdzXHufyWQOmVsJJns4cy57n72+b+1vffs7ivrLpTEAAR5FrE3TeMR1/kWw9s2n8i+5DsBJFevUagJbPEzTgrlmwIoCM1+EtZiFJnotSz6rZlhTTcxXNOmE6ZhHXTFoLo2QW8fJ3VGcfawPG3lt5grLgGJMNg9LPFOVhrgWAQNuEcOKvF4JLCacz2Cwx48LT21FjAZ8OZXAS10+oFC0+3m2EvPYG+zAq5sCsDL5xsA08pVgOz7sC0oWrZLXZWDhVajNwK97HsGnt6fx0fkRTGQL9oBUGmZygUo3cWxHGOfIxj4aZGVyzXCNSYIfj/Yg4PPCytvs6eV+TvLuVlvSn0/FKXMNR3u7kSE9xsBmFGjpkUgQAz6PHPNDfI5mq441t2iYoF+tjIliEfMFe31f2+jHiZFJqthjAy8FysMtLnn+bHsYv5HOQ6EOef9mT6fDhx//TWHo9gyUVkM4BFNMkKb3hgstjMicaZXjAQzUfd0+ef8kAU+IJVuiWtpH688nF+WA98Jd+JaBVWfl0OLSYBHMTHOd4/M4xHdGn9lO4912MNJzizFjdHjJXFC+FWEfdE0qZZkrTnTqbgLpYmPl7icbN55/FJG2FmxixB5/fAtO09AtHjful943F7IS4OyuKFo1G8anq2Ul2FSLa1r5xuZuSVUzrZe0/j04AIW0ukqT3WTUjlMNIKjudePM0zvwXGdr+Z17pF0EqHBStbVmSQqOElh5gOzjFkRVaPnwyISkfTAcwJXBfrwYaHOMv0zqxZorXGc7qnnTSdr6eTTT/qJXXbS6V6xZRTsc7sYnkRD2dvmqvncqlpTeKmU5cS28muKwvla7Q9ntGvoTLkZ67oWdjr6DJRVUa9/N3MfVWAJKSY42MGmOMUJnRBJx63WBOzj2AJPItnZvzc1lOLWIgEvHQx6bkTHO/dbFUSk3QbNwVKIoDKgi6fuKFr1fCv16wENPROvkKRG9Gr5mEvJz3h4ux5GbUygw3apiKUsaX9YxB3x8fYJpMr/qLW+b18CxvhD66PE300lMM+FUgjpytWroyDLI9jBHX1vIrBrcS28PbPAjLXOE7gB17k7sEFbdpRb7z13DyfHZVYOfpqc/jZVSa91CoAQuEvrbw6PYf+EWLs+l606e5Ts5c2VZcJE72uvDt5YDqmEFIsA5GO0enJm8h52/X8c7V+7gUqq6AQYlmGI2+nl2DjFKbZbK+GIyjt1/3ODGZEIVG4+10jCFdXWCZ3/NskUUAaQflNnL1OnBkB/PMg1GmRIV/sYJ9j0D6IORKQ5RuZwaFsR4XksHzKpFUrI+sKNuogFiJxLW04sNVIFgMCaqEKEEw1VmTOQFuVXXLsySelNRIrYxMRODRO49pHBaeCW/C/ic8lErvxOaqAb1B41UdQlMW11Jrjak+f9pfuHxP+vx0fafAAMAUiCx0ClOvYEAAAAASUVORK5CYII='
                 };

                 var simple_cmIdentityModel = {
                    displayName: 'meoper',
                    on: function(){},
                    isAppOwner: false,
                    getAvatar: function(){
                        return simple_cmFileModel
                    },
                    getDisplayName: function(){
                        return this.displayName;
                    }
                 };

                 // simple cmIdentityModels
                 $scope.simple_cmIdentityModel_1 = angular.extend({}, simple_cmIdentityModel);
                 $scope.simple_cmIdentityModel_2 = angular.extend({}, simple_cmIdentityModel, {isAppOwner:true});

             });
         </file>
         <file name="index.html">
             <div ng-controller="Ctrl">
                 <h2>unknown / default avatar</h2>
                 <cm-avatar cm-view="unknown"></cm-avatar>

                 <h2>cmIdentity avatar</h2>
                 <cm-avatar cm-data="simple_cmIdentityModel_1"></cm-avatar>
                 {{simple_cmIdentityModel_1}}

                 <h2>cmIdentity appOwner hide attribute</h2>
                 <cm-avatar cm-data="simple_cmIdentityModel_2" cm-view="hide-owner"></cm-avatar>
                 {{simple_cmIdentityModel_2}}
             </div>
         </file>
     </example>
 */

angular.module('cmUi').directive('cmAvatar',[
    'cmUtil',
    'cmFilesAdapter',
    function (cmUtil, cmFilesAdapter){

        var avatarMocks = {
            none: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAqACoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9hKKKuaFHZy6tCt+8kdqW+dkHP/6qAKdFep2GneF7i8+w28VlNNjO0AuTxn73/wBeuO+IvhOHwvqkf2dm8i4Usqk5KEdRn05oA52iiigAooooA9E+GXhuHR9IbWLkrvkRmUnpFGOp+px+X41yfjbxU3ivV/NClIIhsiU9cep9zXX2/wAPUbwov/EwvhI1vu4m/cjIzjb/AHe1ecUAFFFFABRRRQBpL4u1JNJ+wi7k+ykbdnGcemeuPbOKzaKKACiiigD/2Q=='
        };

        return {
            restrict: 'E',
            scope: {
                identity: "=cmData"
            },
            template: '<img >',

            link: function(scope, element, attrs){

                function showBlobAsImage(file){
                    if(file['url'] == undefined) {
                        cmFilesAdapter.getBlobUrl(file.blob).then(function(objUrl){
                            file.url = objUrl;
                            element.find('img').attr('src', file.url.src);
                        });
                    } else {
                        element.find('img').attr('src', file.url.src);
                    }
                }

                function refresh(){
                    // hide the complete avatar
                    if(attrs.cmView == 'hide-owner' && scope.identity.isAppOwner){
                        element.css('display','none');
                    } else {
                        // get avatar image from model
                        var file = scope.identity.getAvatar();
                        if(typeof file.on == 'function' && file.state != 'cached'){
                            file.on('file:cached', function(){
                                showBlobAsImage(file);
                            });
                        } else if(file.state == 'cached') {
                            showBlobAsImage(file);
                        }
                    }
                }

                // is unknown avatar for add reciepients or choose avatar
                if(attrs.cmView == 'unknown'){
                    element.find('img').attr('src', avatarMocks.none );
                    //element.css({'background-image': 'url(' + avatarMocks.none +')'});
                } else {
                    scope.$watch('identity',function(){
                        if(typeof scope.identity == 'object' && cmUtil.objLen(scope.identity) > 0){
                            if(scope.identity.state.is('new') || scope.identity.avatarId == undefined) {
                                scope.identity.on('update:finished',function() {
                                    refresh();
                                });
                            } else {
                                refresh();
                            }
                        }
                    });
                }
            }
        }
    }
]);