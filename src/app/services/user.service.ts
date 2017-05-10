import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

    public bLoggedIn : boolean = false;
    public currentUser: ReplaySubject<User> = new ReplaySubject<User>( 1 );

    constructor(
      private router: Router,
    ) {
      // TODO

    }

    public setAuthenticatedUser ( user : User){

        this.bLoggedIn = true;
        this.setCurrentUser(user);
    }

    protected setCurrentUser( user: User ) {
      this.currentUser.next( user );
    }

    public logout() {
      let user = new User();
      user.bLoggedIn = false;

      this.setCurrentUser( user );
      this.router.navigate(['login']);
    }
}
