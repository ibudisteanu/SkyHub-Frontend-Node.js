import { Component, OnInit, OnDestroy,  AfterViewInit, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentFactory } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterFormComponent } from './registration-form/register-form.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  entryComponents: [ RegisterFormComponent ]
})
export class RegisterComponent implements AfterViewInit, OnInit {


  @ViewChild('RegisterFormComponentView', {read: ViewContainerRef}) RegisterFormComponentView: ViewContainerRef;

  constructor(

      private compFactoryResolver: ComponentFactoryResolver,
  ) {
    // TODO
  }


  public initializeRegisterTemplate(){
    let compFactory: ComponentFactory <any>;

    compFactory = this.compFactoryResolver.resolveComponentFactory(RegisterFormComponent);
    this.RegisterFormComponentView.createComponent(compFactory);

  }

  public ngAfterViewInit(){
    this.initializeRegisterTemplate();
  }


  public ngOnInit() {
    window.dispatchEvent( new Event( 'resize' ) );


  }



}
