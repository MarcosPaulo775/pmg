import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AppService } from 'src/app/shared/Services/app.service';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { _id } from 'src/app/shared/models/api';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,

    private authService: AuthService,
    private appService: AppService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** Inicializa formulario */
  initForm() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });

    this.getUser();
  }

  /** Salva alterações nos dados do usuario */
  onSave() {
    if (this.form.valid) {
      this.getForm();
      this.authService.users_set_keys(this.user._id,
        {
          'username': this.user.username,
          'fullname': this.user.fullname,
          'email': this.user.email
        }
      ).subscribe((data: _id) => {

        if (!data.error) {
          this.appService.openSnackBar('Salvo', 'ok');
          this.dialogRef.close();
        } else {
          this.appService.session(data.error_code);
        }
      }, (data) => {
        console.log(data);
      })
    } else {
      this.appService.openSnackBar('Cadastre todos os campos', 'ok');
    }

  }

  /** Busca dados do formulario */
  getForm() {
    this.user.fullname = this.form.get('name').value;
    this.user.username = this.form.get('username').value;
    this.user.email = this.form.get('email').value;
  }

  /** Preeche o formulario */
  getUser() {
    this.form.get('name').setValue(this.user.fullname);
    this.form.get('username').setValue(this.user.username);
    this.form.get('email').setValue(this.user.email);
  }

  /** Fecha janela */
  onNoClick(): void {
    this.dialogRef.close();
  }

}