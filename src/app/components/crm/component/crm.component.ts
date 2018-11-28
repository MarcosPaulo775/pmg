import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';

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
    private authService: AuthService
  ) { }

  
  logout(){
    
    this.authService.logout();
    
  }

  ngOnInit() {
    this.title = '';
  }

}
