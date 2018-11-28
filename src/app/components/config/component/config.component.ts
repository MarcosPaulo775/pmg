import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  title: string;
  user_color: string;
  users_color: string;

  @Input()
  set setTitle(title: string) {
    this.title = title;
  }

  @Input()
  set setDashboard(color: string) {
    this.user_color = color;
  }

  @Input()
  set setCompany(color: string) {
    this.users_color = color;
  }

  constructor(
    private authService: AuthService
  ) { }

  
  logout(){
    
    this.authService.logout();
    
  }

  user: User;

  ngOnInit() {
    this.title = '';

    this.user = new User();

    this.authService.get_current_user()
      .subscribe((data: User) => { 
        if (data.error == null) {
          this.user = data;
        }
      }, (data) => { 

      })
  }

}
