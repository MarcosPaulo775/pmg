ng new projeto --routing --style=scss
npm install --save @angular/material @angular/cdk
npm install --save @angular/animations
npm install --save hammerjs

main.ts
import 'hammerjs';

app.module.ts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

material.ts
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';
@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule],
})
export class MaterialModule { }

index.html
<link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

style.scss
@import "~@angular/material/prebuilt-themes/indigo-pink.css";

ng serve --host 0.0.0.0 --disable-host-check
