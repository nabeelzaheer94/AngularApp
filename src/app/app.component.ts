import { Component } from '@angular/core';
import {AuthenticationContext,AdalConfig} from 'adal-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
 // title = 'the World of Angular';
  constructor(){
  //var organizationURI = "https:// [organization name].crm.dynamics.com"; //The URL to connect to CRM (online)  
}
}
var organizationURI = "https://axpedu.api.crm4.dynamics.com"; //The URL to connect to CRM (online)
var tenant = "51ce4423-399b-45ee-8ccb-2e5567af477a"; //The name of the Azure AD organization you use
var clientId = "b5abc1b9-8d37-4c6d-aec4-9516cb37afee"; //The ClientId you got when you registered the application
var pageUrl = "http://localhost:4200"; //The URL of this page in your development environment when debugging.

var user, authContext, message, errorMessage, loginButton, logoutButton, getAccountsButton, accountsTable, accountsTableBody;

//Configuration data for AuthenticationContext
var endpoints = {
 orgUri: organizationURI
};
this.config= {
  tenant: tenant,
  clientId: clientId,
  postLogoutRedirectUri: pageUrl,
  endpoints: endpoints,
  cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
 };

function login():void {
  authContext = new AuthenticationContext(this.config);
var label = document.getElementById('invisible');
label.style.display = 'block';
// Check For & Handle Redirect From AAD After Login
var isCallback = authContext.isCallback(window.location.hash);
if (isCallback) {
 authContext.handleWindowCallback();
}
var loginError = authContext.getLoginError();

if (isCallback && !loginError) {
    window.location.href = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
}
else {
 errorMessage.textContent = loginError;
}
user = authContext.getCachedUser();
authContext.login();
}

function logout():void{
  authContext.logout();
}

