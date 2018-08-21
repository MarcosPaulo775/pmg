import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';
import { User } from '../../../shared/models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router   
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
    this.get_current_user();
  }

  get_current_user(){
    this.authService.get_current_user().subscribe((data: User) => {
      this.user = data;
  }, (data) => {
      console.log('Erro: ' + data);
  });
  }

  onSubmit() {
    console.log(this.user);
  }
}
