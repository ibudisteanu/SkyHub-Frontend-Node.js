import { Component, OnInit, OnDestroy , AfterViewInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';

import { LoginFormComponent } from './login-form/login-form.component';

@Component({
  //providers: [RestService, AuthService],
  selector: 'app-login',
  templateUrl: './login.component.html',
  entryComponents: [ LoginFormComponent ]
})
export class LoginComponent implements AfterViewInit, OnInit
{

  @ViewChild('LoginFormComponentView', {read: ViewContainerRef}) LoginFormComponentView: ViewContainerRef;

  constructor(

    private router: Router,

    private compFactoryResolver: ComponentFactoryResolver,
  )
  {
  }

  public initializeLoginTemplate(){
    let compFactory: ComponentFactory <any>;

    compFactory = this.compFactoryResolver.resolveComponentFactory(LoginFormComponent);
    this.LoginFormComponentView.createComponent(compFactory);

  }

  public ngAfterViewInit(){
    this.initializeLoginTemplate();
  }

  public ngOnInit() {
    window.dispatchEvent( new Event( 'resize' ) );


  }



}
