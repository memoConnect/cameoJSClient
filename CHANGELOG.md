## Dev
# BS 19.12.2014
* fix CAM-1509, footer in desktop modus will not scroll

# AP 18.12.2014
* added authenticate some key button to key list

# BS 18.12.2014
* finish CAM-1501, add 4096 Bit info to key generation lang keys

# BS 17.12.2014
* add new setup routes
    * update registration, now it is possible to turn off confirmPW and show pw input
    * add setup account route
    * add setup identity route
    * update settings key generation header, if $rootScope automaticGeneration is set
    * update e2e tests
    * put keyinfo to setup routes
* add cmPristine Service and update drtv input
    * inputs handle adaptive change
    * remove old adaptive change drtv
* update API Provider
    * now it is possible to set a special apiVersion to an Ajax Call
    * update build configs, add new "defaultApiVersion": "v1"
    * update unit tests
* update identity settings
    * cameoId is an normal text container, input is removed

# WW 17.12.2014
* better detection for wrong route
    * no token
        * /talks & / goto /login
    * all routes with guests true are visible
    * with token
        * /login & / goto /talks
        * all routes with guests false are invisible
* reset password routes
    * /lost , /code & /reset
    * /lost start a password reset
    * /code handles the code from message
    * /reset handles the new password

# WW 16.12.2014
* update password reset with code input
    * after succeed identification form change to code input
    * password/reset landing page checks onload if resetId is expired
* update verification on phoneNumber and email
    * removed modal
    * added code input under not verified bubble
* new cm-loader size cm-size="small" for inside a input
* fixxed long subject in conversation
* ssl checker if offline shows offline modal instead of not trusted connection

# WW 12.12.2014
* new config.xml handling for phonegap
    * local building leads www/res/.. at path to resources
    * build.phonegap building needs res/.. at path to resources
    * new config with plugins and resoures for phonegap config/cameoConfig-phonegap.json

# WW 11.12.2014
* trusted contacts
    * in contact list, detail and recipients
    * oo = check trust
    * oo! = no key and untrusted
    * xo! = has key but untrusted
    * xx = trusted connection between two contacts
* unit test command line -specs option available
* fix icons for anrdoid devices lower then kitkat < 4.4

# BS 11.12.2014
* fix CAM-1490, add email or phone number to possible display names

# WW 09.12.2014
* search for cameoContacts with 3 letter minlength CAM-1417
* fixxed desktop identity-list and menu without word break CAM-1414
* added cm-enter on password-input to react on "Öffnen" on android keyboard CAM-1335

## RC 0.4.6 - 08.12.2014

## Hotfix 0.4.4.2
* check CAM-1496
* check CAM-1497
* fix CAM-1495
* fix CAM-1500
* fix Textarea Resize

## Dev
# WW 08.12.2014
* password reset (desktop and app)
** new routes #/password/lost & #/password/reset
** password lost starts a request send message to mail/sms
** password reset handle the new password with the requestId

# WW 06.12.2014
* account email & phoneNumber verification
** on edit email or phoneNumber automatically notfication via mail or sms
** on inputs are manually buttons for new verricationSecret and modal for confirm verification

# WW 05.12.2014
* ssl certificat checker
** plugin for ios and android
** checks on dev/stage against *.cameo.io certificate
** checks on prod against cameonet.de certificate
** if fingerprint doesn't match the cmConnectionHandler shows a modal and blocked the app

# BS 03.12.2014
* update Event Handling CAM-1422 
** add "contact:update" in FE
** add "friendRequest:rejected" in FE
** add "identity:new" in FE

# WW 02.12.2014
* internet explorer 11 & iemobile 11 solved

# AP 02.12.2014
* message signing and verify

## RC 0.4.4.
# BS 05.12.2014
* fix CAM-1398, error will now shown, if key saving failed
# BS 0..12.2014
* fix CAM-1482, set timeout for browser notifications to 5s
* fix CAM-1483, set z-index to choose element
* fix CAM-1481, only one browser notification per message
* fix CAM-1474, on MacOS Safari, in Desktop Mod, Footer will be displayed correct
# BS 03.12.2014
* fix CAM-1478, last-message:read will only send, if message is decrypted
# BS 28.11.2014
* add Authentication Route to Desktop Modus, CAM-1374

0.4.3.
# BS 27.11.2014
* fix new Talk with -1 recipients CAM-1412
* add route controller to start/keyinfo to check skipKeyInfo and redirect to talks, if skip is activated in settings
* fix CAM-1415, redirect from d/ to d/#/talks or d/#/login fixed
* add selectable class to message elements, key-edit and start routes

# BS 25.11.2014
* finish Story unread Messages CAM-1321
** add button to settings to show or not the quantity of unread messages
** if it is off, the client will not post the last message, the user reads, to the server, or show the quantity in talks view
** somme settings will now synced with server

# WW 21.11.2014
* fix menu button CAM-1384
* update back button, show modal if leaving app, fix CAM-1383

# BS 21.11.2014
* fix edit icon in contact edit view, disable if contact is cameo member
* fix edit own identity CAM-1340

# BS 20.11.2014
* add BrowserNotificationService
* fix invite service after importing a local contact
* fix pending contacts in contacts-list CAM-1378

0.4.2.
* framework major update
** angularjs 1.2.15 upgraded to 1.3.2
** removed fastclick (ngTouch handle the 300ms click delay)
* cm-reactive elements on mobile and desktop integrated (demo in icons.html)
** desktop has 3 tiers (normal, hover and active=clicked)
** mobile has 2 tiers (normal and active=touched)
* after registration in mobile browser
** everybody got a attention on our apps but it can be skipped
** store and also direct links are served
* purl addations
** new subheader for in app opener about new cameonet:// app protocol
* form validation
** phonenumbers now have on mobile numberpad
** phone and email validation now accors after 3 secs. (before 1 secs.)
* phonegap
** new exit modal for leaving app on back button
** device menubutton toggle the menu in app
* performance
** webworker for verify now cache the results
** through major framework update route changes raised up 50%
** cm-rubber-space tighten was optimized (now only once per digest and drtv)
