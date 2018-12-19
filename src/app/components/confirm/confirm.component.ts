import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class DialogConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public title: string
  ) { }

  ngOnInit() { }

  /** Fecha a janela */
  onNoClickY(): void {
    this.dialogRef.close(true);
  }

  /** Fecha a janela */
  onNoClickN(): void {
    this.dialogRef.close(false);
  }
}