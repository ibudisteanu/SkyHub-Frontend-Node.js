import { Component, OnInit, OnDestroy , ComponentFactoryResolver, ViewChild,  ViewContainerRef, ComponentFactory } from '@angular/core';

import { DialogRef, ModalComponent, CloseGuard } from 'angular2-modal';
import { BSModalContext } from 'angular2-modal/plugins/bootstrap';

import {LoginFormComponent} from './../../../pages/authentication/login/login-form/login-form.component';
import {RegisterComponent} from './../../../pages/authentication/register/register.component';

export class AuthenticationModelWindowContext extends BSModalContext {
    public num1: number;
    public num2: number;
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
        this.LoginFormComponentView.createComponent(compFactory);


        compFactory = this.compFactoryResolver.resolveComponentFactory(RegisterComponent);
        this.RegisterFormComponentView.createComponent(compFactory);
    }

    public ngOnInit(){
        this.initializeLoginRegistration();
    }

    onKeyUp(value) {
        this.wrongAnswer = value != 5;
        this.dialog.close();
    }


    beforeDismiss(): boolean {
        return true;
    }

    beforeClose(): boolean {
        return this.wrongAnswer;
    }
}
