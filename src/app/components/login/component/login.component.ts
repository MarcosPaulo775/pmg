import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/authentication/auth.service';
import { User } from '../../../shared/models/user';
import { Session } from '../../../shared/models/api';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  user: User;
  loading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      usuario: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }

  /** Login do usuário */
  onSubmit() {
    this.loading = true;
    if (this.form.valid) {
      this.authService.create_session
        (this.form.get('usuario').value, this.form.get('senha').value)
        .subscribe((data: Session) => {
          if (data.error != 'invalid_username_or_password' && data.session != null) {
            localStorage.setItem('session', data.session);
            this.openSnackBar("Logou", "OK");
            this.router.navigate(['/production']);
          } else {
            this.openSnackBar("Usuário ou senha inválido", "OK");
            if (localStorage.getItem('session')) {
              localStorage.removeItem('session');
            }
            this.loading = false;
          }
        }, (data) => {
            this.openSnackBar("Erro de conexão", "OK");
            this.loading = false;
        });
    }
  }

  /** Notificação */
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
