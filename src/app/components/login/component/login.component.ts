import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Route, Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _login: HttpClient,
    private _key: HttpClient,
    private _router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }


  onSubmit() {

    var session = {};

    if (this.form.valid) {

      //auth.create_session
      this._key.post('http://192.168.1.225:9090/portal.cgi',
        {
          'method': 'auth.create_session',
          'user_name': this.form.get('usuario').value,
          'user_pass': this.form.get('senha').value,
        }

      ).subscribe((result: JSON) => {
        session = result;
        console.log('Sucesso');
      }, () => {
        console.log('Erro!');
      });

      this._router.navigate(['/user']);
    }

  }

}
