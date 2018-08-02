import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
    private _key: HttpClient) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }


  onSubmit() {

    var session = {};

    if (this.form.valid) {
      
      this._key.post('http://192.168.1.225:9090/portal.cgi', {
        "method": "auth.create_session",
        "user_name": this.form.get('usuario').value,
        "user_pass": this.form.get('senha').value,

      }).subscribe((data) => {
        session = data;
        console.log('gravado com sucesso');
      }, () => {
        console.log('Deu merda!');
      });

      this._login.post('http://192.168.1.225:9090/portal.cgi', {
        "method": "auth.login",
        "user_name": session,
        "user_pass": this.form.get('senha').value,

      }).subscribe(() => {
        console.log('gravado com sucesso');
      }, () => {
        console.log('Deu merda!');
      });
    }
  }

}
