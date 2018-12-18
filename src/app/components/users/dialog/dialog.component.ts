import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from 'src/app/shared/models/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/authentication/auth.service';
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
    private authService: AuthService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: User) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required]]
    });

    this.getUser();
  }

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

        if (data.error == null) {
          this.openSnackBar('Salvo', 'ok');
          this.dialogRef.close();
        }
      }, (data) => {

      })
    } else {
      this.openSnackBar('Cadastre todos os campos', 'ok');
    }

  }

  getForm() {
    this.user.fullname = this.form.get('name').value;
    this.user.username = this.form.get('username').value;
    this.user.email = this.form.get('email').value;
  }

  getUser() {
    this.form.get('name').setValue(this.user.fullname);
    this.form.get('username').setValue(this.user.username);
    this.form.get('email').setValue(this.user.email);
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