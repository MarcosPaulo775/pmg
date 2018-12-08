import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/core/http/api.service';
import { Result_Avatar } from 'src/app/shared/models/api';

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
  set setData(data: string) {
    this.data = data;
  }

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
    private authService: AuthService,
    private apiService: ApiService
  ) { }

  
  logout(){
    
    this.authService.logout();
    
  }

  user: User;

  ngOnInit() {
    this.data = localStorage.getItem('avatar');
    this.title = '';

    this.user = new User();

    this.authService.get_current_user()
      .subscribe((data: User) => { 
        if (data.error == null) {
          this.user = data;

          this.preview();
        }
      }, (data) => { 

      })
  }

  data: string;

  preview() {

    this.apiService.custom_objects_list('avatar', ['id', 'equal to', this.user._id], ' ')
      .subscribe(
        (data: Result_Avatar) => {

          if (data.error == null && data.results.length != 0) {

            this.data = data.results[0].data;

            localStorage.setItem('avatar', this.data);

          }else{

            this.data = 'assets/logo.svg';
            localStorage.setItem('avatar', this.data);

          }

        }, () => { }
      )

  }

}
