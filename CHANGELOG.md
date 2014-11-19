#0.4.2
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