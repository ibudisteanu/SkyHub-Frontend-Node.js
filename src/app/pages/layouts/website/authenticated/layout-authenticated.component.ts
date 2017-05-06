import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user';
import { UserService } from '../../../../services/user.service';
import { LoggerService } from '../../../../services/logger.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from '../../../../services/translate.service';

@Component( {
    selector: 'app-layouts-auth',
    templateUrl: './layout-authenticated.component.html'
})
export class LayoutAuthenticatedComponent implements OnInit {
    private toastrConfig: ToasterConfig;
    private logger: LoggerService;
    private mylinks: Array<any> = [];

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
    }

    public ngOnInit() {

        // define here your own links menu structure
        this.mylinks = [
            {
                'title': 'Home',
                'icon': 'dashboard',
                'link': ['/']
            },
            {
                'title': 'Client',
                'icon': 'usd',
                'link': ['/client']
            },
            {
                'title': 'Sub menu',
                'icon': 'link',
                'sublinks': [
                    {
                        'title': 'Page 2',
                        'link': ['/page/2'],
                    },
                    {
                        'title': 'Page 3',
                        'link': ['/page/3'],
                    }
                ]
            },
            {
                'title': 'External Link',
                'icon': 'google',
                'link': ['http://google.com'],
                'external': true,
                'target': '_blank'
            },
            {
                'title': 'External Links',
                'icon': 'link',
                'sublinks': [
                    {
                        'title': 'Github',
                        'link': ['http://github.com'],
                        'icon': 'github',
                        'external': true,
                        'target': '_blank'
                    },
                    {
                        'title': 'Yahoo',
                        'link': ['http://yahoo.com'],
                        'icon': 'yahoo',
                        'external': true,
                        'target': '_blank'
                    }
                ]
            }
        ];

    }

}
