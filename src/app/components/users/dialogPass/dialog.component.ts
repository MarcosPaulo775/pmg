import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { AuthService } from 'src/app/core/authentication/auth.service';
import { User } from 'src/app/shared/models/user';
import { User_id } from 'src/app/shared/models/api';
import { AppService } from 'src/app/shared/Services/app.service';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogPassComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,

    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogPassComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User,

    private authService: AuthService,
    private appService: AppService

  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      new_password: [null, [Validators.required]],
      new_password2: [null, [Validators.required]],
      old_password: [null, [Validators.required]]
    });
  }

  onSave() {
    if (this.form.valid) {
      if (this.form.get('new_password').value == this.form.get('new_password2').value) {

        this.authService.users_get_user_id(this.user.username)
          .subscribe((data: User_id) => {
            if (data.error == null) {
              this.authService.users_change_password(
                data.user_id, this.form.get('old_password').value,
                this.form.get('new_password').value
              ).subscribe((data: User_id) => {

                if (data.error_code == 'Incorrect password') {
                  this.appService.openSnackBar('Senha incorreta', 'ok');
                } else if (!data.error_code) {
                  this.appService.openSnackBar('Senha alterada', 'ok');
                  this.dialogRef.close();
                } else {
                  this.appService.session(data.error_code);
                }
              }, (data) => {
                console.log(data);
              });
            }
          }, (data) => {
            console.log(data);
          })
      } else {
        this.appService.openSnackBar('Senhas não coincidem', 'ok');
      }
    } else {
      this.appService.openSnackBar('Cadastre todos os campos', 'ok');
    }
  }

  /** Fecha janela */
  onNoClick(): void {
    this.dialogRef.close();
  }

}