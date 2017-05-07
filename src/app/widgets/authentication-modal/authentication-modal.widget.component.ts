/*
    TUTORIAL : https://www.npmjs.com/package/angular2-modal
    Source code: http://embed.plnkr.co/mbPzd8/
 */


import {Component, OnInit, OnDestroy, ViewContainerRef, } from '@angular/core';
import { Overlay, overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth/auth.service';

//import { RestService } from '../../../services/rest/http/rest.service';


import {  AuthenticationModelWindowContext, AuthenticationModelWindow } from './authentication-modal-window/authentication-modal-window.component';

//import $ from 'jquery';

@Component({
    //providers: [RestService, AuthService],
    selector: 'authentication-widget',
    templateUrl: './authentication-modal.widget.component.html',
    styleUrls: ['./authentication-modal.widget.component.css'],

})

export class AuthenticationModalWidgetComponent implements OnInit
{
    constructor(

        private  vcRef: ViewContainerRef,
        private modal : Modal,
    )
    {
        this.modal.overlay.defaultViewContainer = this.vcRef;
    }



    public ngOnInit() {
        window.dispatchEvent( new Event( 'resize' ) );


        this.showModal(false, true);
    }

    public showModal(bShowLogin, bShowRegistration) {
        return this.modal.open(AuthenticationModelWindow,  overlayConfigFactory({ bDisplayRegistration: bShowLogin, bDisplayLogin: bShowRegistration }, BSModalContext));
    }

    public showMessageModal(){
        this.modal.alert()
            .size('lg')
            .showClose(true)
            .title('A simple Alert style modal window')
            .body(`
            <h4>Alert is a classic (title/body/footer) 1 button modal window that 
            does not block.</h4>
            <b>Configuration:</b>
            <ul>
                <li>Non blocking (click anywhere outside to dismiss)</li>
                <li>Size large</li>
                <li>Dismissed with default keyboard key (ESC)</li>
                <li>Close wth button click</li>
                <li>HTML content</li>
            </ul>`)
            .open();
    }

    public showLoginModal(){
        this.showModal(false, true);
    }

    public showRegistrationModal(){
        this.showModal(true, false);
    }

}
