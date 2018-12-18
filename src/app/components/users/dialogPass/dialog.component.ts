import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { User_id } from 'src/app/shared/models/api';

@Component({
  selector: 'app-dialog',
  templateUrl: 'dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogPassComponent {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogPassComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

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
                  this.openSnackBar('Senha incorreta', 'ok');
                } else if (data.error_code == null) {
                  this.openSnackBar('Senha alterada', 'ok');
                  this.dialogRef.close();
                }
              }, () => { });
            }
          }, () => { })
      } else {
        this.openSnackBar('Senhas não coincidem', 'ok');
      }
    } else {
      this.openSnackBar('Cadastre todos os campos', 'ok');
    }
  }

  /**Notificação*/
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}