/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/
  // Service routes
  '/addUser': {controller: 'MbrServiceController', action: 'addUser'},
  '/authUser': {controller: 'MbrServiceController', action: 'login'},
  '/status': {controller: 'MbrServiceController', action: 'status'},
  '/verify': {controller: 'MbrServiceController', action: 'verify'},
  // '/addUser' : 'UserManagmentController.addUser',
  // '/authUser' : 'UserManagmentController.login',
  // '/status' : 'UserManagmentController.status', 
  // '/verify' : 'UserManagmentController.verify',

  // Application routes
  '/': { view: 'pages/homepage' },
  '/signup' : { view: 'pages/signup'},
  '/signin' : {view: 'pages/signin'},
  '/dashboard' : {view: 'pages/dashboard'}

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
