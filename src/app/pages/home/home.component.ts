import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Message } from '../../models/message';
import { MessagesService } from '../../services/messages.service';
import { User } from '../../models/user';
import { SocketIoService } from '../../services/rest/socket/socketio.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public date: Date = new Date();

  constructor(
    private msgServ: MessagesService,
    private breadServ: BreadcrumbService,
    private socketServ: SocketIoService
  )
  {
    // TODO
  }

  public ngOnInit() {
    // setttings the header for the home
    this.breadServ.set({
      description: 'HomePage',
      display: true,
      header: 'Dashboard',
      levels: [
        {
          icon: 'dashboard',
          link: ['/'],
          title: 'Home'
        }
      ]
    });



    // defining some test users
    let user1 = new User( {
        profilePic: 'public/assets/img/user2-160x160.jpg',
        email: 'weber.antoine.pro@gmail.com',
        firstName: 'WEBER',
        lastName: 'Antoine'
    });

    let user2 = new User( {
        profilePic: 'public/assets/img/user2-160x160.jpg',
        email: 'EMAIL',
        firstName: 'FIRSTNAME',
        lastName: 'LASTNAME'
    });

    // sending a test message
    this.msgServ.addMessage( new Message( {
        author : user2,
        content : 'le contenu d\'un message d\'une importance extreme',
        destination : user1,
        title : 'un message super important'
    }) );
  }

  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }

}
