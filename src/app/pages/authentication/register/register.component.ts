import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  private password: string;
  private email: string;
  private fullName : string;
  private country : string;
  private userName : string;

  constructor( ) {
    // TODO
  }

  public ngOnInit() {
    // TODO
  }

}
