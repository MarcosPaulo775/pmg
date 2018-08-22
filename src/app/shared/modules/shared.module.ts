import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        HttpClientModule       
    ],
    providers: [],
})
export class SharedModule { }