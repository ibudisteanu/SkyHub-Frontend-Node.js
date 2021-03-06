import { Component, OnInit, ComponentFactoryResolver,  AfterViewInit, ViewChild,  ViewContainerRef, ComponentFactory  } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { LoggerService } from '../../../services/logger.service';
import { AuthService } from '../../../services/auth/auth.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster/angular2-toaster';
import { AdminLTETranslateService } from '../../../services/translate.service';

import { LayoutAuthenticatedComponent } from './authenticated/layout-authenticated.component';
import { LayoutNotAuthenticatedComponent } from './not-authenticated/layout-not-authenticated.component';

import { LayoutWebsiteDirective} from './directive/layout-website.directive';

@Component( {
    selector: 'app-layouts-auth',
    entryComponents: [ LayoutAuthenticatedComponent, LayoutNotAuthenticatedComponent  ],
    templateUrl: './layout-website.component.html',

})
export class LayoutWebsiteComponent implements AfterViewInit, OnInit {
    private toastrConfig: ToasterConfig;
    private logger: LoggerService;

    private menuSidebarItems: Array<any> = [];
    private menuHeaderItems : Array<any> = [];

    protected bLoggedIn = false;

    constructor(
      private userServ: UserService,
      private toastr: ToasterService,
      private translate: AdminLTETranslateService,
      private authService: AuthService,

      private compFactoryResolver: ComponentFactoryResolver,
      public viewContainerRef: ViewContainerRef

    ) {
        this.toastrConfig = new ToasterConfig( {
            newestOnTop: true,
            showCloseButton: true,
            tapToDismiss: false
        });

        this.userServ.currentUser.subscribe((user) => {

            if (this.bLoggedIn != this.userServ.bLoggedIn){
                this.bLoggedIn = this.userServ.bLoggedIn;
                this.changeLayout();
            }
        });

    }

    @ViewChild('LayoutAuthenticatedComponentViewChild') LayoutAuthenticatedComponentViewChild: 'LayoutAuthenticatedComponentViewViewChild';
    @ViewChild('LayoutNotAuthenticatedComponentViewChild') LayoutNotAuthenticatedComponentViewChild: 'LayoutNotAuthenticatedComponentViewChild';

    protected  layoutAuthenticatedComponent;
    protected  layoutNotAuthenticatedComponent;

    public changeLayout(){

        console.log('Change Layout to : '+this.bLoggedIn);
        var selectedLayout = null;

        if (this.bLoggedIn){

            let componentFactory = this.compFactoryResolver.resolveComponentFactory(LayoutAuthenticatedComponent);

            this.viewContainerRef.clear();

            let componentRef = this.viewContainerRef.createComponent(componentFactory);

            this.layoutAuthenticatedComponent = (<LayoutAuthenticatedComponent>componentRef.instance);
            selectedLayout = this.layoutAuthenticatedComponent;

        } else {
            let componentFactory = this.compFactoryResolver.resolveComponentFactory(LayoutNotAuthenticatedComponent);

            this.viewContainerRef.clear();

            let componentRef = this.viewContainerRef.createComponent(componentFactory);

            this.layoutNotAuthenticatedComponent = (<LayoutNotAuthenticatedComponent>componentRef.instance);
            selectedLayout = this.layoutNotAuthenticatedComponent;
        }

        this.menuSidebarItems = selectedLayout.menuSidebarItems;
        this.menuHeaderItems = [];//selectedLayout.menuHeaderItems;

        console.log('aaa meers', selectedLayout);

    }

    public ngAfterViewInit(){
        this.changeLayout();
    }

    public ngOnInit() {
        //  sedding the resize event, for AdminLTE to place the height
        let ie = this.detectIE();
        if ( !ie ) {
            window.dispatchEvent( new Event( 'resize' ) );
        } else {
            // solution for IE from @hakonamatata
            let event = document.createEvent( 'Event' );
            event.initEvent( 'resize', false, true );
            window.dispatchEvent( event );
        }

        // define here your own links menu structure
        this.menuHeaderItems = [];
        this.menuSidebarItems = [];

    }

    protected detectIE(): any {
        let ua = window.navigator.userAgent;

        // Test values; Uncomment to check result …
        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)
        // Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        let msie = ua.indexOf( 'MSIE ' );
        if ( msie > 0 ) {
            // IE 10 or older => return version number
            return parseInt( ua.substring( msie + 5, ua.indexOf( '.', msie ) ), 10 );
        }

        let trident = ua.indexOf( 'Trident/' );
        if ( trident > 0 ) {
            // IE 11 => return version number
            let rv = ua.indexOf( 'rv:' );
            return parseInt( ua.substring( rv + 3, ua.indexOf( '.', rv ) ), 10 );
        }

        let edge = ua.indexOf( 'Edge/' );
        if ( edge > 0 ) {
            // Edge (IE 12+) => return version number
            return parseInt( ua.substring( edge + 5, ua.indexOf( '.', edge ) ), 10 );
        }

        // other browser
        return false;
    }

    protected getContentWrapperStyle(){
        if (this.bLoggedIn) return ''; //no menu
        else return '0';
    }

}
