import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { ApiService } from 'src/app/core/http/api.service';
import { Result_Avatar } from 'src/app/shared/models/api';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

  title: string;
  dashboard: string;
  company: string;

  @Input()
  set setTitle(title: string) {
    this.title = title;
  }

  @Input()
  set setDashboard(color: string) {
    this.dashboard = color;
  }

  @Input()
  set setCompany(color: string) {
    this.company = color;
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

    //this.user = new User();

    this.authService.get_current_user()
      .subscribe((data: User) => { 
        if (data.error == null) {
          this.user = data;
          localStorage.setItem('userid', this.user._id);
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
