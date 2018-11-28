import { Component, OnInit, Input  } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrls: ['./production.component.css']
})
export class ProductionComponent implements OnInit {

  title: string;
  dashboard: string;
  jobs: string;
  print: string;

  @Input()
  set setDashboard(color: string) {
    this.dashboard = color;
  }

  @Input()
  set setJobs(color: string) {
    this.jobs = color;
  }

  @Input()
  set setPrint(color: string) {
    this.print = color;
  }

  @Input()
  set setTitle(title: string) {
    this.title = title;
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
