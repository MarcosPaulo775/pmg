import { NgModule } from '@angular/core';

import { ChartModule } from 'primeng/chart';
import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
    declarations: [
    ],
    imports: [
        ChartModule,
        FileUploadModule
    ],
    exports: [
        ChartModule,
        FileUploadModule
    ],
    providers: []
})
export class PrimeNgModule { }