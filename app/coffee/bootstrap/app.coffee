"use strict";

@cameo = {restApi: "https://dev.cameo.io/api/v1/", token: null}

@app = angular.module('cameoClient', ['ngRoute','ngCookies'])

@app.config (['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->
  $routeProvider.when('/login',
    templateUrl: 'tpl/form/login.html'
    controller: 'LoginCtrl'
  );
  $routeProvider.when('/start',
    templateUrl: 'tpl/start.html'
    controller: 'StartCtrl'
  );
  $routeProvider.when('/talks',
    templateUrl: 'tpl/list/talks.html'
    controller: 'TalksCtrl'
  );
  $routeProvider.when('/conversation/:conversationId',
    templateUrl: 'tpl/conversation.html'
    controller: 'ConversationCtr'
  );
  $routeProvider.when('/mediawall',
    templateUrl: 'tpl/list/mediawall.html'
    controller: 'MediaWallCtrl'
  );
  $routeProvider.otherwise(
    redirectTo: '/login'
  );

  return
])

@app.run (['$rootScope', '$location', '$cookieStore', ($rootScope, $location, $cookieStore) ->
  goToHome = ->
    if angular.isUndefined($cookieStore.get('token'))
      $location.path('/login')
    else if $location.$$path == '/login'
      $location.path('/login')

  $rootScope.$on('$routeChangeStart', () ->
    goToHome()

    if angular.isDefined($cookieStore.get('token'))
      cameo.token = $cookieStore.get('token')

    goToHome()

    return
  )
])
