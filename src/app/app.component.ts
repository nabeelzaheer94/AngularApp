import { Component } from '@angular/core';
import { AuthenticationContext, AdalConfig } from 'adal-typescript';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  // title = 'the World of Angular';
  constructor() {
    // var organizationURI = "https:// [organization name].crm.dynamics.com"; //The URL to connect to CRM (online)
  }

  readonly organizationURI = 'https://axpedu.api.crm4.dynamics.com'; // The URL to connect to CRM (online)
  readonly tenant = '51ce4423-399b-45ee-8ccb-2e5567af477a'; // The name of the Azure AD organization you use
  readonly clientId = 'b5abc1b9-8d37-4c6d-aec4-9516cb37afee'; // The ClientId you got when you registered the application
  readonly pageUrl = 'http://localhost:4200'; // The URL of this page in your development environment when debugging.

  // Configuration data for AuthenticationContext
  readonly endpoints = {
    orgUri: this.organizationURI
  };

  config = {
    tenant: this.tenant,
    clientId: this.clientId,
    postLogoutRedirectUri: this.pageUrl,
    endpoints: this.endpoints,
    cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
  };

  authContext: Object;
  errorMessage: Object;
  user: Object;

  login(): void {
    this.authContext = new AuthenticationContext(this.config);
    const label = document.getElementById('invisible');
    label.style.display = 'block';
    // Check For & Handle Redirect From AAD After Login
    const isCallback = this.authContext.isCallback(window.location.hash);
    if (isCallback) {
      this.authContext.handleWindowCallback();
    }
    const loginError = this.authContext.getLoginError();

    if (isCallback && !loginError) {
      window.location.href = this.authContext
        ._getItem(this.authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
    } else {
      this.errorMessage.textContent = loginError;
    }
    this.user = this.authContext.getCachedUser();
    this.authContext.login();
  }

  logout(): void {
    this.authContext.logout();
  }

}


