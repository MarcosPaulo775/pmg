import { Component, OnInit } from '@angular/core';
import { ConfigComponent } from '../../config/component/config.component';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    public configComponent: ConfigComponent,
    public authService: AuthService
  ) { }

  users: User[];

  ngOnInit() {
    this.configComponent.title = 'Usuários';
    this.configComponent.user_color = '';
    this.configComponent.users_color = 'rgb(0, 90, 176)';

    this.authService.users_list_users()
      .subscribe((data: User[]) => {
        if (data[0]) {
          this.users = data;
        }
      }, (data) => {
      })
  }

}
