import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { NgxMaskModule } from 'ngx-mask';
import { DialogConfirmComponent } from 'src/app/components/confirm/confirm.component';

/** Modulo com a biblioteca dos graficos */
import { PrimeNgModule } from './prime-ng.module';

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
        NgxMaskModule.forRoot(),
        PrimeNgModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule,
        NgxMaskModule,
        PrimeNgModule
    ],
    providers: [],
    entryComponents: [DialogConfirmComponent],
})
export class SharedModule { }