import { AbstractControl } from '@angular/forms';

export function ValidateMultipleEmail(control: AbstractControl) {

  if (control && control.value) {
    try {
      let value = control.value.replace(/; /g, ';');
      let temp = value.split(';');
      for (let i = 0; i < temp.length; i++) {
        let dominio = temp[i].split('@');
        if (!temp[i].includes('@') || temp[i].includes(' ') || dominio.length != 2 || dominio[dominio.length - 1] == '') {
          return { validEmail: true };
        }
      }
    } catch (error) {
      return { validEmail: true };
    }
  }
  return null;
}