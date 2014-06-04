'use strict';

/**
 * @ngdoc directive
 * @name cmAvatar
 * @description
 * Shows the avatar of an identity.
 * It can also be used for an identity avatar placeholder.
 *
 * @restrict E
 * @requires cmIdentityModel
 *
 * @example
 <doc:example>
    <doc:source >
        <script>
            function Ctrl1($scope) {
                $scope.identity = new cmIdentityModel(...);
            }
        </script>
        <div ng-controller="Ctrl1">
            <cm-avatar cm-data="identity"></cm-avatar>
            <cm-avatar cm-data="identity" cm-view="hide-owner"></cm-avatar>
            <cm-avatar cm-view="unknown"></cm-avatar>
            <cm-avatar cm-data="identity" cm-with-name="true"></cm-avatar>
        </div>
    </doc:source>
 </doc:example>
 */

angular.module('cmUi').directive('cmAvatar',[
    function (){

        var avatarMocks = {
            none: 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAeAB4AAD/4QA6RXhpZgAATU0AKgAAAAgAA1EQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAAqACoDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9hKKKuaFHZy6tCt+8kdqW+dkHP/6qAKdFep2GneF7i8+w28VlNNjO0AuTxn73/wBeuO+IvhOHwvqkf2dm8i4Usqk5KEdRn05oA52iiigAooooA9E+GXhuHR9IbWLkrvkRmUnpFGOp+px+X41yfjbxU3ivV/NClIIhsiU9cep9zXX2/wAPUbwov/EwvhI1vu4m/cjIzjb/AHe1ecUAFFFFABRRRQBpL4u1JNJ+wi7k+ykbdnGcemeuPbOKzaKKACiiigD/2Q=='
        };

        return {
            restrict: 'E',
            template: '<img >',

            link: function(scope, element, attrs){

                function showBlobAsImage(file){
                    if(file['base64Url'] == undefined) {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            file.base64Url = e.target.result;
                            //element.css({'background-image': 'url('+ e.target.result +')'});
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
]);