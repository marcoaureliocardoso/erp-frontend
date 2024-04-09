import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { AUTH_REALM, AUTH_SERVER_URL } from '../shared/auth-url';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  collapsed = true;

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  public PROFILE_URL: string = AUTH_SERVER_URL + 'realms/' + AUTH_REALM + '/account';

  constructor(private readonly keycloak: KeycloakService) {}

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      console.log(this.userProfile);
      console.log(this.keycloak.getUserRoles(false));
      console.log(this.keycloak.getToken());
    }
  }

  // public login() {
  //   this.keycloak.login();
  // }

  public logout() {
    this.keycloak.logout();
  }

  public hasRole(role: string): boolean {
    return this.keycloak.isUserInRole(role) || this.keycloak.isUserInRole('admin');
  }
}
