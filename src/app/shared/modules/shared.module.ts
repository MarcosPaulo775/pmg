import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';
import { DialogConfirmComponent } from 'src/app/components/confirm/confirm.component';

@NgModule({
    declarations: [
        DialogConfirmComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        NgxMaskModule.forRoot()
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        NgxMaskModule
    ],
    providers: [],
    entryComponents: [DialogConfirmComponent],
})
export class SharedModule { }