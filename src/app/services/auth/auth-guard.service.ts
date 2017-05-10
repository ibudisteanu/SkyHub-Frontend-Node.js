import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  private bLoggedIn: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService
  ) {

    this.userService.currentUser.subscribe((user) => {
      this.bLoggedIn = this.userService.bLoggedIn;
    });

  }

  public canActivate() {
    // test here if you user is logged
    // if ( !this.connected ) {
    //   this.router.navigate( [ 'login' ] );
    // }
    // return this.connected;

    return true;
  }
}
