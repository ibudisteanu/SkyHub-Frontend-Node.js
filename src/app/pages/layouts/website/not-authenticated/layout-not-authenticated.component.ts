import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { LoggerService } from '../../../../services/logger.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from '../../../../services/translate.service';

@Component( {
    selector: 'app-layouts-auth',
    templateUrl: './layout-not-authenticated.component.html'
})
export class LayoutNotAuthenticatedComponent implements OnInit {
    private toastrConfig: ToasterConfig;
    private logger: LoggerService;

    public menuSidebarItems: Array<any> = [];
    public menuHeaderItems : Array<any> = [];

    constructor(
        private userServ: UserService,
        private toastr: ToasterService,
        private translate: AdminLTETranslateService,
        private authService: AuthService,
    ) {
        this.toastrConfig = new ToasterConfig( {
            newestOnTop: true,
            showCloseButton: true,
            tapToDismiss: false
        });
        // this.translate = translate.getTranslate();
        // this.logger = new LoggerService( this.translate );


        this.initializeLayout();

    }

    protected initializeLayout(){
        // define here your own links menu structure
        this.menuSidebarItems = [ ];

        this.menuHeaderItems = [
            {
                "title" : "Login",
                "link" : {
                    "external" : false,
                    "link":"login",
                }
            },
            {
                "title" : "Register",
                "link" : {
                    "external" : false,
                    "link":"register",
                }
            },
            {
                "title" : "Forums",
                "link" : {
                    "external" : false,
                    "link" : "forums"
                }
            }
        ];


    }

    public ngOnInit() {




    }



}
