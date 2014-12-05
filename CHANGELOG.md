Dev
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

0.4.4.
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
