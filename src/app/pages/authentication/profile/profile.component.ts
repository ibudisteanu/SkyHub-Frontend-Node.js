import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Message } from '../../models/message';
import { MessagesService } from '../../services/messages.service';
import { User } from '../../models/user';
import { SocketIoService } from '../../services/socket/socketio.service';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.css'],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit, OnDestroy {
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
      description: 'Profile',
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
        avatarUrl: 'public/assets/img/user2-160x160.jpg',
        email: 'weber.antoine.pro@gmail.com',
        firstName: 'WEBER',
        lastName: 'Antoine'
    });


  }

  public ngOnDestroy() {
    // removing the header
    this.breadServ.clear();
  }

}
