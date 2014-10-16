'use strict';

angular.module('core/widgets/cameo/wdgt-terms.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
angular.module('core/widgets/contact/wdgt-contact-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
angular.module('core/widgets/contact/wdgt-contact-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
angular.module('core/widgets/contact/wdgt-contact-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
angular.module('core/widgets/contact/wdgt-contact-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
angular.module('core/widgets/contact/wdgt-contact-request-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
angular.module('core/widgets/contact/wdgt-contact-search.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
angular.module('core/widgets/conversation/wdgt-conversation-recipients.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
angular.module('core/widgets/conversation/wdgt-conversation-security.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
angular.module('core/widgets/conversation/wdgt-conversation.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
angular.module('core/widgets/login/wdgt-login.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
angular.module('core/widgets/registration/wdgt-registration.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
angular.module('core/widgets/security/wdgt-authentication.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
angular.module('core/widgets/settings/identity/key/wdgt-identity-key-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
angular.module('core/widgets/settings/identity/key/wdgt-identity-key-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
angular.module('core/widgets/settings/identity/key/wdgt-identity-key-import.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
angular.module('core/widgets/settings/identity/key/wdgt-identity-key-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
angular.module('core/widgets/settings/identity/wdgt-identity-create.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
angular.module('core/widgets/settings/identity/wdgt-identity-edit.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
angular.module('core/widgets/settings/identity/wdgt-identity-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
angular.module('core/widgets/settings/wdgt-about-us.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
angular.module('core/widgets/settings/wdgt-notify.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
angular.module('core/widgets/settings/wdgt-settings-about-us.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
angular.module('core/widgets/settings/wdgt-settings-account.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
angular.module('core/widgets/settings/wdgt-settings-app.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
angular.module('core/widgets/settings/wdgt-settings-list.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
angular.module('core/widgets/settings/wdgt-settings-notify.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
angular.module('core/widgets/start/wdgt-keyinfo.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('core/widgets/start/wdgt-quickstart.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('core/widgets/start/wdgt-welcome.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
angular.module('core/widgets/systemcheck/wdgt-systemcheck.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
angular.module('core/widgets/talks/wdgt-talks.html', []).run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/cameo/wdgt-terms.html',
'<article class="terms"><p>{{\'TERMS.PARAGRAPH_1\'|cmTranslate}}</p><p>{{\'TERMS.PARAGRAPH_2\'|cmTranslate}}</p></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-create.html',
'<h2 class="border-bottom"><i class="fa cm-new-contact"></i> {{\'CONTACTS.HEADING.CREATE\'|cmTranslate}}</h2><article class="content mb15" ng-if="canReadLocalContacts()"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'CONTACTS.INFO.IMPORT_POSSIBLE\' | cmParse"></span></cm-info-bubble></article><cm-contact-create></cm-contact-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-edit.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'CONTACT.HEADLINE\'|cmTranslate}}</h2><cm-contact-edit cm-contact-id="contactId"></cm-contact-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-import.html',
'<h2 class="border-bottom"><i class="fa cm-mobile"></i> {{\'CONTACTS.HEADING.IMPORT\'|cmTranslate}}</h2><cm-contact-import></cm-contact-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-list.html',
'<cm-contact-list></cm-contact-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-request-list.html',
'<h2 class="border-bottom no-margin-bottom"><i class="fa cm-contacts"></i> {{\'CONTACTS.HEADING.REQUESTS\'|cmTranslate}}</h2><cm-request-list></cm-request-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/contact/wdgt-contact-search.html',
'<cm-search></cm-search>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-recipients.html',
'<cm-recipients cm-data="conversation"></cm-recipients>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation-security.html',
'<h2><i class="fa cm-lock"></i> {{\'SECURITY_ASPECT.HEADLINE\' | cmTranslate}}</h2><cm-security-settings cm-data="conversation" ng-if="conversation"></cm-security-settings>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/conversation/wdgt-conversation.html',
'<cm-conversation cm-data="conversation" ng-if="conversation"></cm-conversation>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/login/wdgt-login.html',
'<section class="theme-b dtb"><div class="dtbr"><div class="head"><div class="rhino"><img src="gfx/rhino-bubble.png" /></div><div class="logo tac"><cm-logo class="fa-2x cm-ci-color"></cm-logo></div><div class="bg-transparent"></div></div></div><div class="dtbr"><hr class="margin-small mt1"><cm-login></cm-login><hr class="margin-small"><article class="item tac" ng-click="goTo(\'/registration\')" data-qa="register-btn"><span class="body"> {{\'REGISTER.LINK\'|cmTranslate}}</span><span class="icon-list"><i class="fa cm-right position-exception"></i></span></article><hr class="margin-small"><article class="cm-login-text"> {{\'CAMEO.DESCRIBE\'|cmTranslate}}</article><article class="version"> {{\'CAMEO.VERSION\'|cmTranslate}}: {{cmVersion.version}}</article></div></section>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/registration/wdgt-registration.html',
'<form name="registrationForm" class="form-horizontal" role="form" autocomplete="off" novalidate><article class="content small-text mt5 tac"> {{\'REGISTER.TITLE.MANDATORY_INFO\' | cmTranslate}}</article><hr class="margin-small"><h2 ng-click="toogleLoginInfo()"><i class="fa cm-key"></i> {{\'REGISTER.TITLE.HEAD_LOGIN\' | cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showLoginInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.LOGIN_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><cm-cameo-id ng-model="formData.cameoId" form-name="registrationForm" cm-tabindex="1" placeholder="REGISTER.PLACEHOLDER.USERNAME"></cm-cameo-id></article><hr class="margin-small"><cm-password ng-model="formData.password" cm-tabindex="2"></cm-password><hr class="margin-small"><h2 ng-click="toogleUserInfo()"><i class="fa cm-person"></i> {{\'REGISTER.TITLE.HEAD_IDENTITY\'|cmTranslate}}<i class="fa cm-info"></i></h2><article class="content" ng-show="showUserInfo"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'REGISTER.INFO.USER_INFORMATION\'|cmParse"></span></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.DISPLAYNAME\'|cmTranslate}}</label><div class="cm-input-ctn" data-qa="form-input" cm-input-watcher><input tabindex="4" data-qa="input-displayName" type="text" id="displayName" name="displayName" ng-model="formData.displayName" /></div></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.EMAIL\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="5" data-qa="input-email" type="text" id="email" name="email" ng-model="formData.email" ng-class="{\'cm-input-error\':registrationForm.email.$invalid}" cm-validate-email cm-adaptive-change /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.email.$dirty && registrationForm.email.$invalid, \'cm-checkbox-right\':!(registrationForm.email.$dirty && registrationForm.email.$invalid) }" ng-show="formData.email" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.email.$dirty && registrationForm.email.$invalid" data-qa="register-info-invalid-mail"><div ng-show="registrationForm.email.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_EMAIL\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><label>{{\'REGISTER.PLACEHOLDER.PHONENUMBER\'|cmTranslate}}</label><div class="cm-input-ctn" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" data-qa="form-input" cm-input-watcher><input tabindex="6" data-qa="input-phone" type="text" id="phone" name="phone" ng-model="formData.phone" cm-validate-phone cm-adaptive-change ng-minlength="6" ng-class="{\'cm-input-error\':registrationForm.phone.$invalid}" /><i class="fa cm-input-addon" ng-class="{ \'cm-checkbox-wrong\':registrationForm.phone.$dirty && registrationForm.phone.$invalid, \'cm-checkbox-right\':!(registrationForm.phone.$dirty && registrationForm.phone.$invalid) }" ng-show="formData.phone" data-qa="icon-phone-correct"></i></div><cm-info-bubble class="cm-alert" ng-show="registrationForm.phone.$dirty && registrationForm.phone.$invalid" data-qa="register-info-invalid-phonenumber"><div ng-show="registrationForm.phone.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.INVALID_PHONENUMBER\'|cmTranslate}}</div></cm-info-bubble></article><hr class="margin-small"><article class="content"><div class="cm-clear-bg terms-link" data-qa="form-input"> {{\'REGISTER.LABEL.TERMS_ACCEPT\'|cmTranslate}}&nbsp;<a href="#/terms" data-qa="link-terms" class="classic-link">{{\'REGISTER.LABEL.TERMS\'|cmTranslate}}</a><input data-qa="checkbox-agb" type="checkbox" id="agbCheckboxInput" name="agb" ng-model="formData.agb" class="ng-hide" required /><i id="agbCheckbox" data-qa="icon-checkbox-agb" class="fa cm-ci-color ml15" ng-class="{ \'cm-checkbox\':registrationForm.agb.$invalid, \'cm-checkbox-right\':!registrationForm.agb.$invalid }" ng-click="acceptTerms()"></i></div><cm-info-bubble class="cm-alert" nose-x="55%" ng-show="registrationForm.phone.dirty && registrationForm.agb.$invalid" data-qa="register-info-terms"><div ng-show="registrationForm.agb.$invalid"><i class="fa cm-info"></i>{{\'REGISTER.INFO.TERMS\'|cmTranslate}}</div></cm-info-bubble></article></form><cm-footer><button id="registerUserButton" class="cm-btn-black" ng-click="createUser()" data-qa="btn-createUser"><span ng-show="!showLoader"> {{\'REGISTER.LABEL.SUBMIT\'|cmTranslate}}</span><i class="fa cm-right" ng-show="!showLoader"></i><cm-loader ng-show="showLoader" cm-color="ci-color"></cm-loader></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/security/wdgt-authentication.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{ [ BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE", BASE+"PAGE_HEADLINE" ][step] | cmTranslate}}</h2><article class="content"><div class= "authentication-status"><i class= "fa cm-key-request" ng-class="{\'active\': step > 0}"></i><i class= "fa cm-key-response" ng-class="{\'active\': step > 1}"></i><i class= "fa cm-handshake" ng-class="{\'active\': step > 2}"></i></div><div class="space-for-loader"><cm-loader cm-halt="waiting" type="balls"></cm-loader></div><cm-info-bubble class="cm-alert" ng-show="ERROR"><div><i class="fa cm-attention"></i> {{BASE+"ERROR."+ERROR |cmTranslate}}</div></cm-info-bubble></article><hr/><article class="content"><h3> {{ [ BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE", BASE+"HEADLINE" ][step] | cmTranslate}}</h3><cm-info-bubble nose-x = "40%"> {{ [ BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION", BASE+"EXPLANATION" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}<br/><br/><strong> {{ [ BASE+"START.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"WAIT.INSTRUCTIONS", BASE+"DONE.INSTRUCTIONS" ] [step] | cmTranslate }}</strong></cm-info-bubble></article><hr/><article ng-if="step > 0 && step <3" class="content"><div class="transaction-secret" ng-if="transactionSecret" data-qa="transaction-secret-value"> {{transactionSecret || \'...\'}}</div><ng-loader ng-if = "!transactionSecret"></ng-loader></article><article class="content"><strong> {{ [ BASE+"START.NOTE", BASE+"WAIT.NOTE", BASE+"WAIT.NOTE", BASE+"DONE.NOTE" ][step] | cmTranslate:{\'identity\': toIdentity.getDisplayName()} }}</strong></article><br/><article ng-if="step != 3 && !!getTimeout()" class="content"><cm-timeout cm-data = "getTimeout()"> {{BASE+"TIMEOUT" | cmTranslate: {\'timeout\' : cmTimeout } }}</cm-timeout></article><cm-footer ng-if="step == 0"><button ng-click = "done()" class = "cm-btn-grey dib w50" data-qa = "btn-cancel-authentication" > {{BASE+"START.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button><button ng-click = "startAuthenticationRequest()" class = "cm-btn-grey dib w50" data-qa = "btn-start-authentication" ><span ng-if = "!ERROR"> {{BASE+"START.START_BUTTON"|cmTranslate}}</span><span ng-if = "ERROR"> {{BASE+"START.RETRY_BUTTON"|cmTranslate}}</span><i class="fa cm-handshake"></i></button></cm-footer><cm-footer ng-if = "step > 0 && step < 3" cm-rubber-space><button ng-click = "cancel()" class = "cm-btn-grey" data-qa = "btn-cancel-authentication" > {{BASE+"WAIT.CANCEL_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer><cm-footer ng-if = "step == 3" cm-rubber-space><button ng-click = "done()" class = "cm-btn-grey" data-qa = "btn-start-authentication" > {{BASE+"SUCCESSFUL.DONE_BUTTON"|cmTranslate}}<i class="fa cm-checkbox-wrong"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-create.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-create class="theme-a"></cm-identity-key-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-edit.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.DETAIL\'|cmTranslate}}</h2><cm-identity-key-edit></cm-identity-key-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-import.html',
'<h2 class="border-bottom"><i class="fa cm-import-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.IMPORT.HEADER\'|cmTranslate}}</h2><cm-identity-key-import></cm-identity-key-import>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/key/wdgt-identity-key-list.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'SETTINGS.PAGES.IDENTITY.KEYS.HEADER\'|cmTranslate}}</h2><cm-identity-key-list></cm-identity-key-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-create.html',
'<h2 class="border-bottom"><i class="fa cm-avatar-add"></i> {{\'SETTINGS.PAGES.IDENTITY.CREATE.HEADER\'|cmTranslate}}</h2><cm-identity-create></cm-identity-create>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-edit.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.LABEL.IDENTITY\'|cmTranslate}}</h2><cm-identity-edit></cm-identity-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/identity/wdgt-identity-list.html',
'<h2 class="border-bottom"><i class="fa cm-avatar"></i> {{\'IDENTITY.OVERVIEW.HEADER\'|cmTranslate}}</h2><article class="content mb15"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'IDENTITY.OVERVIEW.INFO_TEXT\' | cmParse"></span></cm-info-bubble></article><cm-identity-list cm-identities="identities"></cm-identity-list>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-notify.html',
'<h2 class="border-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\'|cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-about-us.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-bubble-glyph"></i> {{\'SETTINGS.PAGES.ABOUT_US.TITLE\'|cmTranslate}}</h2><article class="about-us content tac"><i class="fa cm-rhino-bubble-glyph"></i><br /> {{version}}<br /> {{\'SETTINGS.PAGES.ABOUT_US.TEXT\'|cmTranslate}}</article><hr><h4 ng-bind-html="\'DRTV.IMPRINT.HEADLINE\'| cmParse" class="content"></h4><article ng-bind-html="\'DRTV.IMPRINT.CONTENT\'| cmParse" class="content"></article><hr><h3 class="content"> {{\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.TITLE\'|cmTranslate}}&nbsp; (<cm-time-converter cm-timestamp="\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.DATE\'|cmTranslate" cm-special-type="date-seperator"></cm-time-converter>)</h3><ul class="no-border"><li ng-repeat="lib in (\'SETTINGS.PAGES.ABOUT_US.3RD_PARTY.LIBRARIES\'|cmTranslate).split(\';\')"><span class="item text" ng-bind-html="lib|cmParse"></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-account.html',
'<h2 class="border-bottom"><i class="fa cm-person"></i> {{\'SETTINGS.ACCOUNT\'|cmTranslate}}</h2><cm-account-edit></cm-account-edit>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-app.html',
'<h2 class="no-margin-bottom"><i class="fa cm-fix"></i> {{\'SETTINGS.APP\' | cmTranslate}}</h2><ul><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.LANGUAGE\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-language-select></div></section></span></li><li ng-click="handleBooleans(\'convertEmoji\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.EMOJI_CONVERT\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.convertEmoji,\'cm-radio-1\':settings.convertEmoji}"></i></section></span></li><li ng-click="handleBooleans(\'sendOnReturn\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SEND_ON_RETURN\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.sendOnReturn, \'cm-radio-1\':settings.sendOnReturn}"></i></section></span></li><li ng-click="handleBooleans(\'skipKeyInfo\')"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.SKIP_KEY_INFO\' | cmTranslate}}</span></span><section class="icon-list"><i class="fa" ng-class="{\'cm-radio-0\':!settings.skipKeyInfo, \'cm-radio-1\':settings.skipKeyInfo}" data-qa="checkbox-skip-keyinfo"></i></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.DATE_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-date-format-select></div></section></span></li><li><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.APP.TIME_FORMAT\' | cmTranslate}}</span></span><section class="icon-list"><div class="cm-select-ctn" cm-time-format-select></div></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-list.html',
'<h2 class="no-margin-bottom"><i class="fa cm-settings"></i> {{\'SETTINGS.LABEL\' | cmTranslate}}</h2><ul><li ng-repeat="page in Object.keys(overview)" ng-click="goToSettingsPage($event, page, overview[page].disabled, overview[page])" ng-class="{\'is-disabled\':overview[page].disabled}" data-qa="{{overview[page][\'data-qa\']}}"><span class="item clearfix"><span class="title"><i class="fa" ng-class="overview[page].icon"></i><span>{{overview[page].i18n|cmTranslate}}</span></span><section class="icon-list"><i class="fa cm-right"></i></section></span></li><li ng-click="logout()"><span class="item clearfix"><i class="fa cm-logout icon-left"></i><span>{{\'MENU.LOGOUT\'|cmTranslate}}</span></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/settings/wdgt-settings-notify.html',
'<h2 class="no-margin-bottom"><i class="fa cm-bell"></i> {{\'SETTINGS.NOTIFY\' | cmTranslate}}</h2><ul><li ng-click="handlePushNotifications()" ng-class="{\'is-disabled\':!isApp()}"><span class="item clearfix"><span class="title"><span>{{\'SETTINGS.PAGES.NOTIFY.PUSH_NOTIFICATIONS\' | cmTranslate}}</span> {{changePushNotifications}}</span><section class="icon-list"><i ng-show="!changePushNotifications" class="fa" ng-class="{ \'cm-radio-0\':!settings.pushNotifications, \'cm-radio-1\':settings.pushNotifications }"></i><cm-loader ng-show="changePushNotifications" class="in-icon-list"></cm-loader></section></span></li></ul>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-keyinfo.html',
'<h2 class="border-bottom"><i class="fa cm-key"></i> {{\'IDENTITY.LABEL.KEYMANAGEMENT\'|cmTranslate}}</h2><article class="content"><cm-info-bubble nose-x="50%"><span ng-bind-html="\'SETTINGS.PAGES.IDENTITY.KEYS.NO_LOCALKEYS_ON_THIS_DEVICE\' | cmParse"></span></cm-info-bubble></article><ul class="border-top border-bottom mt15"><li ng-click="toggleSkipKeyInfo()"><span class="item disabled"> {{\'START.KEYINFO.SKIP_CHECKBOX_TEXT\' | cmTranslate}}</span><div class="short-links"><input id="skipKeyInfoInput" data-qa="checkbox-skip-key-info-input" name="skip" type="checkbox" class="ng-hide" /><i id="skipKeyInfoIcon" data-qa="checkbox-skip-key-info-icon" class="fa cm-grey" ng-class="{ \'cm-checkbox\':!skipKeyInfo, \'cm-checkbox-right\':skipKeyInfo }"></i></div></li><li ng-click="goTo(\'/talks\')" data-qa="btn-skip-keygen"><span class="item"> {{\'START.KEYINFO.SKIP_TEXT\' | cmTranslate}}</span><div class="short-links"><i class="fa cm-right"></i></div></li><li class="no-border"><span class="item" ng-click="toggleKeySize()"> {{\'IDENTITY.KEYS.GENERATE.START.KEY_LENGTH.BUTTON_LABEL\'|cmTranslate}} <strong>2048 (default)</strong></span><div class="short-links" ng-click="toggleKeySize()" data-qa="btn-toggle-keysize"><i class="fa" ng-class="{\'cm-down\':!showKeySize,\'cm-up\':showKeySize}"></i></div><ul class="cm-submenu" ng-show="showKeySize"><li ng-click="chooseKeySize(\'2048\')" data-qa="checkbox-keysize-2048"><span class="item">2048</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 2048,\'cm-checkbox-right\':keySize == 2048}"></i></div></li><li ng-click="chooseKeySize(\'4096\')" data-qa="checkbox-keysize-4096"><span class="item">4096</span><div class="short-links"><i class="fa" ng-class="{\'cm-checkbox\':keySize != 4096,\'cm-checkbox-right\':keySize == 4096}"></i></div></li></ul></li></ul><cm-footer><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'SETTINGS.PAGES.IDENTITY.KEYS.CREATE.HEADER\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-quickstart.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.QUICKSTART.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.QUICKSTART.SUB_TEXT\' | cmParse" class="cm-bold content"></article><hr /><h4 class="content"><i class=\'fa cm-key\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_1\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_1\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-contact\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_2\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_2\' | cmParse" class="content"></article><hr /><h4 class="content"><i class=\'fa cm-new-talk\'></i>&nbsp; {{\'START.QUICKSTART.HEADLINE_3\'|cmTranslate}}</h4><article ng-bind-html="\'START.QUICKSTART.TEXT_3\' | cmParse" class="content"></article><hr /><article ng-bind-html="\'START.QUICKSTART.TEXT_4\' | cmParse" class="content"></article><cm-footer ng-if="startRoute"><button ng-click="generateKey()" class="cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/start/wdgt-welcome.html',
'<h2 class="border-bottom"><i class="fa cm-rhino-positive"></i> {{\'START.WELCOME.HEADLINE\'|cmTranslate}}</h2><article ng-bind-html="\'START.WELCOME.TEXT_1\' | cmParse" class="content"></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_2\' | cmParse" class="content"></h3><article class="welcome-beta-info content"><cm-info-bubble nose-x="55%"><span ng-bind-html="\'START.WELCOME.TEXT_3\' | cmParse"></span></cm-info-bubble></article><hr/><h3 ng-bind-html="\'START.WELCOME.TEXT_4\' | cmParse" class="content"></h3><article ng-bind-html="\'START.WELCOME.TEXT_5\' | cmParse" class="content"></article><cm-footer><button ng-click="goTo(\'/start/quickstart\')" class="cm-btn cm-btn-grey" data-qa="btn-next-step"> {{\'START.BTNS.NEXT\' | cmTranslate}}<i class="fa cm-right"></i></button></cm-footer>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/systemcheck/wdgt-systemcheck.html',
'<h2>{{\'SYSTEMCHECK.HEADLINE\'|cmTranslate}}</h2><h3 class="content" ng-class="{\'cm-green\':clientVersionCheck,\'cm-orange\':!clientVersionCheck}">{{\'SYSTEMCHECK.CLIENTVERSION.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':clientVersionCheck,\'cm-checkbox-wrong\':!clientVersionCheck}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_ERROR\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version} "></section><section ng-if="clientVersionCheck" ng-bind-html="\'SYSTEMCHECK.CLIENTVERSION.TEXT_OK\'| cmParse:{\'translate\':true} | cmTranslate:{\'version\':version}"></section><section class="tac mt15" ng-if="(!clientVersionCheck && $scope.isApp && $scope.storeLink != \'\')"><a href="{{storeLink}}"><img class="storeIcon" ng-src="{{icon}}" /></a></section></cm-info-bubble></article><hr /><h3 class="content" ng-class="{\'cm-green\':localStorage,\'cm-orange\':!localStorage}">{{\'SYSTEMCHECK.LOCALSTORAGE.HEADLINE\'|cmTranslate}} <i class="fa" ng-class="{\'cm-checker\':localStorage,\'cm-checkbox-wrong\':!localStorage}"></i></h3><article class="content"><cm-info-bubble nose-x="15%"><section ng-if="!localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_ERROR\'|cmParse"></section><section ng-if="localStorage" ng-bind-html="\'SYSTEMCHECK.LOCALSTORAGE.TEXT_OK\'|cmParse"></section></cm-info-bubble></article>');
}]);
.run([
'$templateCache', function($templateCache) {
$templateCache.put('core/widgets/talks/wdgt-talks.html',
'<cm-loader ng-show="conversations.state.is(\'initial-loading\')" class="fullscreen"></cm-loader><ul><li ng-show="!conversations.length && !conversations.state.is(\'loading\')" class="empty-list"><i class="fa cm-info"></i> {{\'TALKS.LIST_EMPTY\'|cmTranslate}}</li><li ng-repeat="conversation in conversations | orderBy:\'timeOfLastUpdate\':true | cmSearch:\'talks\':search" ng-click="goto(\'/conversation/\'+conversation.id)" data-qa="conversation-list-element"><cm-conversation-tag cm-data="conversation" cm-rubber-space></cm-conversation-tag></li></ul><cm-footer ng-if="moreTalksAvailable()"><button class="cm-btn-grey" ng-click="loadMoreTalks()" data-qa="load-more-btn"> {{\'TALKS.MORE\'|cmTranslate}}</button></cm-footer>');
}]);
angular.module('cmWidgets',[
    'cmCore',
    'cmPhonegap'
,'core/widgets/cameo/wdgt-terms.html','core/widgets/contact/wdgt-contact-create.html','core/widgets/contact/wdgt-contact-edit.html','core/widgets/contact/wdgt-contact-import.html','core/widgets/contact/wdgt-contact-list.html','core/widgets/contact/wdgt-contact-request-list.html','core/widgets/contact/wdgt-contact-search.html','core/widgets/conversation/wdgt-conversation-recipients.html','core/widgets/conversation/wdgt-conversation-security.html','core/widgets/conversation/wdgt-conversation.html','core/widgets/login/wdgt-login.html','core/widgets/registration/wdgt-registration.html','core/widgets/security/wdgt-authentication.html','core/widgets/settings/identity/key/wdgt-identity-key-create.html','core/widgets/settings/identity/key/wdgt-identity-key-edit.html','core/widgets/settings/identity/key/wdgt-identity-key-import.html','core/widgets/settings/identity/key/wdgt-identity-key-list.html','core/widgets/settings/identity/wdgt-identity-create.html','core/widgets/settings/identity/wdgt-identity-edit.html','core/widgets/settings/identity/wdgt-identity-list.html','core/widgets/settings/wdgt-about-us.html','core/widgets/settings/wdgt-notify.html','core/widgets/settings/wdgt-settings-about-us.html','core/widgets/settings/wdgt-settings-account.html','core/widgets/settings/wdgt-settings-app.html','core/widgets/settings/wdgt-settings-list.html','core/widgets/settings/wdgt-settings-notify.html','core/widgets/start/wdgt-keyinfo.html','core/widgets/start/wdgt-quickstart.html','core/widgets/start/wdgt-welcome.html','core/widgets/systemcheck/wdgt-systemcheck.html','core/widgets/talks/wdgt-talks.html'])
.directive('cmWidgetTerms', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/cameo/wdgt-terms.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactCreate', [
    'cmLocalContacts',
    function(cmLocalContacts){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-create.html',
            controller: function($scope){
                $scope.canReadLocalContacts = function(){
                    return cmLocalContacts.canRead();
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactEdit', [
    function(){
        return {
            restrict: 'E',
            scope: {
                contactId: '=cmContactId'
            },
            templateUrl: 'widgets/contact/wdgt-contact-edit.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */

//Todo: Widget should not access $roueParams


.directive('cmWidgetContactImport', [
    function( ){
        return {
            restrict: 'E',
            scope: true,
            templateUrl: 'widgets/contact/wdgt-contact-import.html'
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetContactList
 * @description
 * Lists contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactRequestList', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-request-list.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSearch
 * @description
 * Search contacts.
 *
 * @restrict AE
 */


.directive('cmWidgetContactSearch', [

    //no dependencies

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/contact/wdgt-contact-search.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                //nothing to do here yet
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationRecipients', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-recipients.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversationSecurity', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation-security.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversation
 * @description
 * Display Conversation and provides functionality.
 *
 * @restrict AE
 */


.directive('cmWidgetConversation', [

    function () {
        return {
            restrict: 'AE',
            templateUrl: 'widgets/conversation/wdgt-conversation.html',
            scope: true,

            controller: function ($scope, $element, $attrs) {
                $scope.$watch($attrs.cmData, function(conversation){
                    if(conversation)
                       $scope.conversation = conversation                    
                })
            }
        }
    }
])
.directive('cmWidgetLogin',[
    'cmVersion',
    'cmSystemCheck',
    function(cmVersion, cmSystemCheck) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/login/wdgt-login.html',

            controller: function ($scope) {
                cmSystemCheck.run(true);

                $scope.cmVersion = cmVersion;

                var app = angular.element(document.querySelector('#cm-app')),
                    frame = angular.element(document.querySelector('.view-frame'));

                app.addClass('full-height');
                frame.addClass('full-height');

                $scope.$on('$destroy', function () {
                    app.removeClass('full-height');
                    frame.removeClass('full-height');
                });
            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])
.directive('cmWidgetRegistration', [
    'cmAuth', 'cmUserModel', 'cmUtil', 'cmLogger', 'cmTransferScopeData',
    'cmNotify', 'cmSystemCheck', 'cmLoader',
    '$rootScope', '$location', '$q',
    function (cmAuth, cmUserModel, cmUtil, cmLogger, cmTransferScopeData,
              cmNotify, cmSystemCheck, cmLoader,
              $rootScope, $location, $q) {
        return {
            restrict: 'AE',
            scope: true,
            templateUrl: 'widgets/registration/wdgt-registration.html',

            controller: function ($scope) {

                cmSystemCheck.run(true);

                var loader = new cmLoader($scope);

                $scope.showLoginInfo = false;
                $scope.showUserInfo = false;

                $scope.toogleLoginInfo = function(){
                    if($scope.showLoginInfo){
                        $scope.showLoginInfo = false;
                    } else {
                        $scope.showLoginInfo = true;
                    }
                };

                $scope.toogleUserInfo = function(){
                    if($scope.showUserInfo){
                        $scope.showUserInfo = false;
                    } else {
                        $scope.showUserInfo = true;
                    }
                };

                $scope.formData = {
                    cameoId: '',
                    password: '',
                    email: '',
                    phone: '',
                    displayName: ''
                };

                $scope.handleGuest = false;

                /**
                 * Toogle Function for AGB Check
                 */
                $scope.acceptTerms = function () {
                    $scope.formData.agb = !$scope.formData.agb ? true : false;
                };

                /**
                 * validate Registration Form
                 * @returns {*}
                 */
                $scope.validateForm = function () {
                    var deferred = $q.defer(),
                        reservationCheck = false;

                    var data = {
                        loginName: null,
                        password: null,
                        email: null,
                        phone: null,
                        displayName: null,
                        reservationSecret: null
                    };

                    // check loginName aka cameoId
                    if ($scope.registrationForm.cameoId.$valid == false) {
                        if ($scope.registrationForm.cameoId.$viewValue == undefined
                            || $scope.registrationForm.cameoId.$viewValue.toString() == ''
                        ) {
                            $rootScope.$broadcast('cm-login-name:invalid');
                        }
                    } else {
                        data.loginName = $scope.registrationForm.cameoId.$viewValue;
                    }

                    // check password
                    if ($scope.formData.password == ''
                        || $scope.formData.password == 'none'
                        || $scope.formData.password == undefined) {
                        $rootScope.$broadcast('cm-password:empty');
                    } else {
                        data.password = $scope.formData.password;
                    }

                    // check email
                    if ($scope.registrationForm.email.$valid == false) {
                    } else {
                        if ($scope.registrationForm.email.$viewValue != '') {
                            data.email = $scope.registrationForm.email.$viewValue;
                        }
                    }

                    // check phone
                    if ($scope.registrationForm.phone.$valid == false) {
                    } else {
                        if ($scope.registrationForm.phone.$viewValue != '') {
                            // 'phoneNumber' is for BE call
                            data.phoneNumber = $scope.registrationForm.phone.$viewValue;
                        }
                    }

                    // check name
                    if ($scope.registrationForm.displayName.$viewValue != '') {
                        data.displayName = $scope.registrationForm.displayName.$viewValue;
                    }

                    // check agb
                    if ($scope.registrationForm.agb.$valid == false) {
                        $scope.registrationForm.phone.dirty = true;
                        $scope.registrationForm.agb.$invalid = true;
                    }

                    // check reservation secret - index for correct login name
                    if (data.loginName != null && cmUtil.objLen($scope.reservationSecrets) > 0) {
                        if (!(data.loginName in $scope.reservationSecrets)) {
                            cmNotify.warn('REGISTRATION.WARN.RESERVATIONSECRET_MISSING');
                        } else {
                            data.reservationSecret = $scope.reservationSecrets[data.loginName];
                            reservationCheck = true;
                        }
                    }

                    if ($scope.registrationForm.$valid !== false && reservationCheck == true) {
                        deferred.resolve(data);
                    } else {
                        deferred.reject();
                    }

                    return deferred.promise;
                };

                /**
                 * Form Validation and Apicall to create user
                 */
                $scope.createUser = function () {
                    if (loader.isIdle())
                        return false;

                    loader.start();

                    function sendCreateUserRequest(data) {
                        cmAuth.createUser(data).then(
                            function (accountData) {

                                cmUserModel.doLogin($scope.formData.cameoId, $scope.formData.password, accountData).then(
                                    function () {
                                        if ($scope.handleGuest !== false) {
                                            //$location.path('/purl/'+$rootScope.pendingPurl);
                                            $rootScope.goto('/start/welcome');
                                        } else {
                                            cmUserModel.comesFromRegistration = true;
                                            $rootScope.goto("/start/welcome");
                                        }
                                    },
                                    function () {
                                        $scope.spinner('stop');
                                    }
                                );
                                return true;
                            },
                            function (response) {
                                loader.stop();

                                if (typeof response == 'object' && 'data' in response && typeof response.data == 'object') {
                                    if ('error' in response.data && response.data.error == 'invalid reservation secret') {
                                        $rootScope.$broadcast('registration:checkAccountName');
                                    }
                                } else {
                                    cmNotify.warn('REGISTER.WARN.REGISTRATION_FAILED');
                                }
                            }
                        );
                    }


                    $scope.validateForm().then(
                        function (data) {
                            clearTransferScopeData();

                            sendCreateUserRequest(data);
                        },
                        function () {
                            loader.stop();
                        }
                    );
                };

                $rootScope.$on('registration:createUser', function () {
                    $scope.createUser();
                });

                /**
                 * Guest Handling
                 */
                if (cmUserModel.isGuest() !== false) {
                    $scope.handleGuest = true;
                }

                // transfer data between routeChanges
                var clearTransferScopeData = cmTransferScopeData.create($scope, {
                    id: 'registration',
                    ignoreVar: 'password',
                    scopeVar: 'formData',
                    onSet: function () {
                        this.noneScopeData = $scope.reservationSecrets;
                    },
                    onGet: function (formData, noneScopeData) {
                        if (noneScopeData != null)
                            $scope.reservationSecrets = noneScopeData
                    }
                });
            }
        }
    }
])
.directive('cmWidgetAuthentication', [

    'cmUserModel',
    'cmAuthenticationRequest',
    'cmCallbackQueue',
    'cmIdentityFactory',
    'cmContactsModel',
    '$timeout',
    '$rootScope',
    '$q',

    function(cmUserModel, cmAuthenticationRequest, cmCallbackQueue, cmIdentityFactory, cmContactsModel, $timeout, $rootScope, $q){
        return {
            restrict: 'E',
            templateUrl: 'widgets/security/wdgt-authentication.html',
            scope: {
                keyId:      '=',
                identityId: '='
            },

            controller: function ($scope, $element, $attrs) {

                var timeoutInterval,
                    timeoutPromise

                $scope.step         =   0
                $scope.waiting      =   false
                $scope.toIdentity   =   $scope.identityId 
                                        ?   cmIdentityFactory.find($scope.identityId)
                                        :   cmUserModel.data.identity

                //Without a key authetication won't work: 
                if(!cmUserModel.loadLocalKeys().length){
                    $rootScope.goTo('/settings/identity/keys', true)
                }

                //Without cameo id authentication won't work:
                if(!$scope.toIdentity.cameoId){
                    $rootScope.goTo('/settings/identity/keys', true)                  
                }


                $scope.BASE =   ($scope.identityId != cmUserModel.data.identity)
                                ?   'IDENTITY.KEYS.TRUST.'
                                :   'IDENTITY.KEYS.AUTHENTICATION.';


                $scope.getTimeout = function(){
                    return cmAuthenticationRequest.getTTL()
                }
               
                $scope.startAuthenticationRequest = function(){
                    $scope.ERROR    = undefined
                    $scope.waiting  = true;

                    cmAuthenticationRequest.generateTransactionSecret(120000)
                    $scope.transactionSecret = cmAuthenticationRequest.getTransactionSecret()
                    $scope.step = 1

                    cmCallbackQueue
                    .push(function(){
                        return cmAuthenticationRequest.send(
                            $scope.toIdentity.id,                           //The identity we ask to trust our key
                            cmAuthenticationRequest.getTransactionSecret(), //The secret will share through another channel with the person we believe is the owner of the above identity
                            $scope.keyId                                    //The key that should sign our own key; may be undefined
                        )
                    }, 100)
                    .then(function(){
                        //wait for response:
                        return  cmAuthenticationRequest.getTTL()
                             ?  cmAuthenticationRequest.when('started', 'canceled', cmAuthenticationRequest.getTTL())      
                             :  $q.reject()
                    })
                    .then(
                        function(result){
                            $scope.step = 2
                            //wait for key in response to be verified:
                            return cmAuthenticationRequest.when('verification:successful', 'verification:failed', 7000)  
                        },
                        function(result){
                            return  result == 'timeout'
                                    ?   $q.reject('TIMEOUT')
                                    :   $q.reject()
                        }
                    )
                    .then(
                        function(result){
                            var data = result.data
                            return  cmUserModel.signPublicKey(data.key, data.key.id, data.identity)      //wait for key in response to be signed
                                    //Todo: this 'then' should be elsewhere:
                                    .then(function(){    
                                        if(data.identity == cmUserModel.data.identity)      
                                        /*                              
                                        cmAuthenticationRequest.openBulkRequest({
                                            key1: cmUserModel.loadLocalKeys()[0].id,   // Todo: how to treat multiple local keys?
                                            key2: data.key.id
                                        })
                                        */
                                       
                                        cmUserModel.bulkReKeying(cmUserModel.loadLocalKeys()[0].id, data.key.id)
                                    })
                        },
                        function(result){
                            return  result && result.event &&  result.event.name == 'verification:failed'
                                    ?   $q.reject('VERIFY')
                                    :   $q.reject(result)
                        }
                    )
                    .then(
                        function(){
                            $scope.cancel()
                            $scope.step     = 3
                            $scope.waiting  = false
                        },
                        function(error){
                            if(error){
                                $scope.ERROR = error                                
                            }
                            $scope.cancel()
                        }
                    )

                }

                $scope.cancel = function(){
                    $scope.waiting  = false
                    $scope.step     = 0
                    cmAuthenticationRequest.cancel($scope.toIdentity.id)
                };

                $scope.done = function(){
                    $scope.cancel()
                    
                    if($scope.keyId){
                        $rootScope.goTo('settings/identity/key/list', true);
                        return null;
                    }

                    if($scope.identityId){
                        $rootScope.goTo('contact/edit/'+cmContactsModel.findByIdentityId($scope.identityId).id, true);
                        return null
                    }

                    $rootScope.goTo('settings/identity/key/list', true);
                    return null;
                }


                $scope.$on('$destroy', $scope.cancel)

            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyEdit
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyImport
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyImport', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-import.html',
            controller: function(){
                //console.log('cmWidgetIdentityKeyImport')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityKeyList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityKeyList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/key/wdgt-identity-key-list.html',
            controller: function($scope){
                //console.log('cmWidgetIdentityKeyList')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityCreate
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityCreate', [
    // no dependencies
    function(){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-create.html',
            controller: function(){
                //console.log('cmWidgetIdentityCreate')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityEdit
 * @description
 * List conversations.
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetIdentityEdit', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-edit.html',
            controller: function(){
                //console.log('cmWidgetIdentityEdit')
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetIdentityList
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */
.directive('cmWidgetIdentityList', [
    'cmUserModel',
    function(cmUserModel){
        return {
            restrict:       'AE',
            scope:          true,
            templateUrl:    'widgets/settings/identity/wdgt-identity-list.html',
            controller: function($scope){
                $scope.identities = cmUserModel.data.identities;
            }
        }
    }
])
.directive('cmWidgetAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
.directive('cmWidgetNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    '$rootScope',
    function(cmSettings, cmPushNotificationAdapter, cmDevice,
             $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp())
                        return false;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetSettingsAboutUs', [
    'cmConfig',
    function(cmConfig){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-about-us.html',
            controller: function ($scope) {
                $scope.version = cmConfig.version;
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetSettingsAccount
 * @description
 * account settings
 *
 * @restrict E
 * @example
 */
.directive('cmWidgetSettingsAccount', [
    // no dependencies
    function(){
        return {
            restrict:       'E',
            scope:          true,
            templateUrl:    'widgets/settings/wdgt-settings-account.html',
            controller: function(){
                //console.log('cmWidgetSettingsAccount')
            }
        }
    }
])
.directive('cmWidgetSettingsApp', [
    'cmSettings',
    function(cmSettings){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-app.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.handleBooleans = function(key) {
                    var newValue = $scope.settings[key] ? false : true;

                    if(cmSettings.set(key, newValue))
                        $scope.settings[key] = newValue;
                };
            }
        }
    }
])
.directive('cmWidgetSettingsList', [
    'cmUserModel', 'cmConfig', 'cmUtil',
    '$window', '$location',
    function(cmUserModel, cmConfig, cmUtil,
             $window, $location){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-list.html',
            controller: function ($scope) {
                $scope.overview = cmConfig.routeSettings;
                $scope.Object = Object;

                $scope.logout = function(){
                    cmUserModel.doLogout(true,'settings overview logout');
                };

                $scope.goToSettingsPage = function($event, pageUrl, isDisabled, route){

                    if('link' in route){
                        // file:///android_asset/www/index.html#/login
                        if(cmUtil.startsWith($location.$$absUrl, 'file:///')) {
                            $window.location = route.link;
                        // http://localhost:8000/app/#/settings
                        } else if($location.$$absUrl.indexOf('/#/') != -1) {
                            var arr_location = $location.$$absUrl.split('/#/');
                            location.href = arr_location[0] + '/' + route.link;
                        }

                        return false;
                    }

                    if(typeof pageUrl !== 'undefined' && isDisabled == undefined){
                        $event.stopPropagation();
                        $event.preventDefault();
                        $scope.goTo('/settings/'+pageUrl);
                    }
                }
            }
        }
    }
])

.directive('cmWidgetSettingsNotify', [
    'cmSettings', 'cmPushNotificationAdapter', 'cmDevice',
    function(cmSettings, cmPushNotificationAdapter, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/settings/wdgt-settings-notify.html',
            controller: function ($scope) {
                $scope.settings = cmSettings.properties;

                cmSettings.on('update:finished',function(){
                    $scope.settings = cmSettings.properties;
                });

                $scope.isApp = function(){
                    return cmDevice.isApp();
                };

                $scope.changePushNotifications = false;

                $scope.handlePushNotifications = function() {
                    var key = 'pushNotifications';

                    if(!$scope.isApp() || $scope.changePushNotifications)
                        return false;

                    $scope.changePushNotifications = true;

                    var newValue = $scope.settings[key] ? false : true;

                    if(!newValue){//unregister checked to unchecked
                        cmPushNotificationAdapter.deleteDevice();
                        cmPushNotificationAdapter.one('device:unregistrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    } else {
                        cmPushNotificationAdapter.registerDevice();
                        cmPushNotificationAdapter.one('device:registrated',function(){
                            $scope.changePushNotifications = false;
                        });
                    }

                    if(cmSettings.set(key, newValue)){
                        $scope.settings[key] = newValue;
                    }
                };
            }
        }
    }
])
.directive('cmWidgetKeyinfo', [
    'cmUserModel',
    'cmUtil',
    'cmSettings',
    '$rootScope',
    function(cmUserModel, cmUtil, cmSettings, $rootScope){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-keyinfo.html',
            controller: function ($scope) {

                if(cmUserModel.hasPrivateKey()){
                    $scope.goTo('/settings/identity/key/list');
                    return false;
                }


                $scope.skipKeyInfo = false;
                $scope.skipKeyInfo = cmSettings.get('skipKeyInfo') || false;

                if(cmUserModel.loadLocalKeys().length > 0){
                    $scope.skipKeyInfo = true;
                }

                $scope.toggleSkipKeyInfo = function(){
                    if(!$scope.skipKeyInfo){
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = true;
                    } else {
                        cmSettings.set('skipKeyInfo', true);
                        $scope.skipKeyInfo = false;
                    }
                };

                $scope.showKeySize = false;
                $scope.toggleKeySize = function(){
                    //console.log('toggleKeySize', $scope.showKeySize)
                    if(!$scope.showKeySize){
                        $scope.showKeySize = true;
                    } else {
                        $scope.showKeySize = false;
                    }
                };

                $scope.keySize = 2048;
                $scope.chooseKeySize = function(size){
                    if(size == '4096'){
                        $scope.keySize = 4096;
                    } else {
                        $scope.keySize = 2048;
                    }
                };

                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: $scope.keySize
                    };

                    $scope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetQuickstart', [
    '$rootScope',
    function($rootScope){
        return {
            restrict: 'E',
            scope: {
                startRoute: '=cmStartRoute'
            },
            templateUrl: 'widgets/start/wdgt-quickstart.html',
            controller: function ($scope) {
                $scope.generateKey = function(){
                    $rootScope.generateAutomatic = {
                        generate:true,
                        keySize: 2048
                    };

                    $rootScope.goTo('/settings/identity/key/create');
                }
            }
        }
    }
])
.directive('cmWidgetWelcome', [
    function(){
        return {
            restrict: 'E',
            templateUrl: 'widgets/start/wdgt-welcome.html',
            controller: function ($scope) {
            }
        }
    }
])
.directive('cmWidgetSystemcheck', [
    'cmSystemCheck',
    'cmVersion',
    'cmDevice',
    function(cmSystemCheck, cmVersion, cmDevice){
        return {
            restrict: 'E',
            templateUrl: 'widgets/systemcheck/wdgt-systemcheck.html',
            controller: function ($scope, $element) {
                $scope.localStorage = cmSystemCheck.checkLocalStorage();
                cmSystemCheck.checkClientVersion(false).then(
                    function(){
                        $scope.clientVersionCheck = true;
                    },
                    function(){
                        $scope.clientVersionCheck = false
                    }
                );

                $scope.version = cmVersion.version;

                $scope.isApp = cmDevice.isApp();
                $scope.storeLink = '';
                $scope.icon = 'gfx/pixel.png';
                if($scope.isApp){
                    if(cmDevice.isAndroid()){
                        $scope.icon = 'gfx/stores/playStore_aktiv.png';
                        $scope.storeLink = 'https://play.google.com/store/apps/details?id=de.cameonet';
                    } else if(cmDevice.isiOS()){
                        $scope.storeLink = '';
                    } else if(cmDevice.isWinPhone()){
                        // @todo storelink
                    } else if(cmDevice.isBlackBerry()){
                        // @todo storelink
                    }
                }
            }
        }
    }
])
/**
 * @ngdoc directive
 * @name cmWidgets.directive:cmWidgetConversationOverview
 * @description
 * List conversations.
 *
 * @restrict AE
 * @example
 */



.directive('cmWidgetTalks', [

    'cmUserModel',
    'cmConversationFactory',

    function(cmUserModel, cmConversationFactory){
        return {
            restrict:       'AE',
            scope:          true,   
            templateUrl:    'widgets/talks/wdgt-talks.html',

            controller: function($scope, $element, $attrs){

                /**
                 * init conversations to scope
                 */
                $scope.conversations = cmConversationFactory;
                $scope.conversations.getList();

                /**
                 * load more Conversations
                 */
                $scope.loadMoreTalks = function(){
                    if(cmUserModel.isAuth() != false){
                        $scope.conversations.getList($scope.conversations.getLimit(), $scope.conversations.length);
                    }
                }

                /**
                 * Show More Button
                 * @returns {boolean}
                 */
                $scope.moreTalksAvailable = function(){
                    if($scope.conversations.length == 0){
                        return false;
                    }

                    if($scope.conversations.length == $scope.conversations.getQuantity()){
                        return false;
                    }

                    return true;
                };

            }
        }
    }
])