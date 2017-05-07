import { Component, OnInit, OnDestroy , ComponentFactoryResolver, ViewChild,  ViewContainerRef, ComponentFactory } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import {LoginFormComponent} from './../../../pages/authentication/login/login-form/login-form.component';
import {RegisterFormComponent} from './../../../pages/authentication/register/registration-form/register-form.component';

export class AuthenticationModelWindowContext extends BSModalContext {
    public bDisplayRegistration = false;
    public bDisplayLogin = true;
}

/**
 * A Sample of how simple it is to create a new window, with its own injects.
 */
@Component({
    selector: 'modal-content',
    styleUrls:  ['./authentication-modal-window.component.css'],
    templateUrl: './authentication-modal-window.component.html',
    entryComponents: [ LoginFormComponent,   ]
})
export class AuthenticationModelWindow implements CloseGuard, ModalComponent<AuthenticationModelWindowContext> {


    context: AuthenticationModelWindowContext;

    public wrongAnswer: boolean;

    @ViewChild('LoginFormComponentView', {read: ViewContainerRef}) LoginFormComponentView: ViewContainerRef;
    @ViewChild('RegisterFormComponentView', {read: ViewContainerRef}) RegisterFormComponentView: ViewContainerRef;

    constructor(

        private compFactoryResolver: ComponentFactoryResolver,
        public dialog: DialogRef<AuthenticationModelWindowContext>
    ) {
        this.context = dialog.context;
        this.wrongAnswer = true;
        dialog.setCloseGuard(this);
    }

    public initializeLoginRegistration(){
        let compFactory: ComponentFactory <any>;

        compFactory = this.compFactoryResolver.resolveComponentFactory(LoginFormComponent);
        let loginFormComponent = this.LoginFormComponentView.createComponent(compFactory,0).instance;

        loginFormComponent.sPassword = "ss";
        loginFormComponent.OnLoginSuccessfully = this.loginSuccessfully;
        loginFormComponent.OnLoginUnsuccessfully = this.loginUnsuccessfully;


        compFactory = this.compFactoryResolver.resolveComponentFactory(RegisterFormComponent);
        this.RegisterFormComponentView.createComponent(compFactory);
    }

    public ngOnInit(){
        this.initializeLoginRegistration();
    }


    beforeDismiss(): boolean {
        return false;
    }

    beforeClose(): boolean {
        return false;
    }

    protected modalClose(){
        this.dialog.close();
    }

    protected showRegistrationForm(){
        this.context.bDisplayLogin = false;
        this.context.bDisplayRegistration = true;

    }

    protected showLoginForm(){
        this.context.bDisplayLogin = true;
        this.context.bDisplayRegistration = false;

    }

    public loginSuccessfully() {

    }

    public loginUnsuccessfully(){
        this.modalClose();
    }


}
